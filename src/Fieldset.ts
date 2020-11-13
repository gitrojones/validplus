import merge from 'lodash/merge'
import {hasAsync} from 'src/util/hasAsync'

import {VPFieldsetOptions, VPFieldOptions} from 'src/interfaces/VPOptions'
import {ValidationStrategy} from 'src/interfaces/validation/ValidationStrategy'

import {VPField} from 'src/Field'
import {Validatable} from 'src/Validatable'

import {FieldsetOptions} from 'src/models/VPOptions/FieldsetOptions'
import {toBoolean} from 'src/util/casts/toBoolean'
import {getAttributeIfSet} from 'src/util/getAttributeIfSet'
import IEVersion from 'src/util/IEVersion'

/**
 * VPFieldset Instance
 * @description
 * Fieldset instances are responsible for managing the relationship between fields. Fieldset instances
 * are capable of validating fields based upon a relationship, such as checkbox/radio fields being interdependent.
 * @example
 * // DOM Bindings, All Fields must validate true
 * <div id="sample_fieldset" class="VPFieldset" vp-find>
 *   <div class="VPField" vp-notify="false">
 *     <input id="first-name" aria-label="First Name" name="first-name" type="text" required="required" />
 *   </div>
 *
 *   <div class="VPField" vp-notify="false">
 *     <input id="last-name" aria-label="Last Name" name="last-name" type="text" required="required" />
 *   </div>
 * </div>
 *
 * @example
 * // DOM Bindings, One field must be true
 * <div id="sample_fieldset" class="VPFieldset" vp-strategy="one" vp-find>
 *  <div class="VPField">
 *    <label for="option_one">
 *      <input id="option_one" name="option-one" type="radio" value="one" required="required" />
 *      Option #1
 *    </label>
 *  </div>
 *
 *  <div class="VPField">
 *    <label for="option_two">
 *      <input id="option_two" name="option-two" type="radio" value="two" required="required" />
 *      Option #2
 *    </label>
 *  </div>
 *
 *  <div class="VPField">
 *    <label for="option_three">
 *      <input id="option_three" name="option-three" type="radio" value="three" required="required" />
 *      Option #3
 *    </label>
 *  </div>
 * </div>
 * @example
 * // Programmic bindings
 * const fieldset = new VP.Fieldset(document.getElementById('sample_fieldset'), {
 *    ValidationStrategy: "one"
 * });
 * const option_one_field = new VP.Field(document.getElementsById('field_one'))
 * const option_two_field = new VP.Field(document.getElementsById('field_two'))
 * const option_three_field = new VP.Field(document.getElementsById('field_three'))
 * fieldset.addField(option_one_field);
 * fieldset.addField(option_two_field);
 * fieldset.addField(option_three_field);
 * @augments Validatable
 */
export class VPFieldset extends Validatable<FieldsetOptions> {
  static Options = FieldsetOptions;

  $strategy: ValidationStrategy
  $fields: VPField[]
  $cached: VPField[]
  $canValidate: boolean
  $observer: MutationObserver | undefined

  get $visibleFields (): VPField[] {
    return this.$fields.filter((field: VPField) => {
      return this.isElementVisible(field.$element)
    })
  }

  constructor (element: HTMLElement, options: VPFieldsetOptions = {} as VPFieldsetOptions) {
    if (!(element instanceof HTMLElement)) throw new Error('[VPFieldset] Expected element');
    super(element, new VPFieldset.Options(merge({
      ValidationStrategy: getAttributeIfSet(element, 'vp-strategy', 'all'),
      FieldClass: getAttributeIfSet(element, 'vp-field-class', 'VPField'),
      FindFields: toBoolean(getAttributeIfSet(element, 'vp-find', false)),
    }, options) as VPFieldsetOptions, element));

    let validationStrategy = this.$options.ValidationStrategy;
    if (typeof validationStrategy === 'string') {
      validationStrategy = this.$strategies[validationStrategy];
    }
    if (typeof validationStrategy !== 'function') {
      throw new Error('[VPFieldset] Expected ValidationStrategy to be a function.')
    }
    this.$strategy = validationStrategy as ValidationStrategy;
    this.$fields = []
    this.$cached = []
    this.$canValidate = true;

    if (this.$options.FindFields) {
      this.findFields();
    }

    if (IEVersion === false || IEVersion >= 11) {
      this.$observer = new MutationObserver(this.$observe.bind(this));
      this.$observer.observe(element, {
        childList: true
      });
    }
  }

  get $isValid (): boolean | null { return super.$isValid; }
  set $isValid (isValid: boolean | null) {
    super.$isValid = isValid;
    if (!isValid && this.$options.ScrollTo) this.scrollTo();

    this.$cached = [];
    this.$canValidate = true;
  }

  /**
   * If running a modern browser, VP will automatically
   * handle removing tracked nodes which are removed from the DOM.
   * If supporting sub IE11, you must do this yourself using the removeField
   * helpers defined on this instance.
   * @private
   */
  $observe (mutations: MutationRecord[]): void {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const nodes = Array.from(mutation.removedNodes);
        while (nodes.length > 0) {
          const node = nodes.pop();
          if (!node) break;

          for (let i = 0, l = this.$fields.length; i < l; i += 1) {
            const field = this.$fields[i];
            if (field.$element === node) {
              this.removeField(field);
              break;
            }
          }
          if (node.hasChildNodes()) nodes.push(...Array.from(node.childNodes));
        }
      }
    }
  }

  $fieldWatch (_e: Event, trigger: VPField): void {
    _e.stopPropagation()
    this.$cached.push(trigger)
    if (this.$canValidate) this.isValid()
  }

  $fieldRemove (_e: Event, field: VPField): void {
    _e.stopPropagation()
    this.removeField(field);
  }

  /**
   * Validation Cycle
   * @description
   * Standard Validation cycle for the Fieldset instance.
   *
   * + Validation will validate all tracked Fields
   * + Validation will return as either synchronous validation or asynchronous based on field responses.
   * + If Lazy, validation will stop at the first error
   * @returns (boolean|Promise.<boolean>)
   */
  isValid (): (boolean | Promise<boolean>) {
    this.$canValidate = false;
    this.clearMessages()
    const fields = this.$options.ValidateVisible ? this.$visibleFields : this.$fields;
    const fieldsetStatus: (boolean | Promise<boolean>)[] = fields
      .map((field: VPField, index: number) => {
        console.debug('[VPFieldset] Validating field', field)

        // We already validated this, just take the value
        let valid: (boolean | Promise<boolean>)
        if (this.$cached.indexOf(field) !== -1 && typeof field.$valid === 'boolean') {
          console.debug('[VPFieldset] Cached Valid', index)
          valid = field.$valid
        }
        else {
          valid = field.isValid()
        }

        return valid
      })

    if (hasAsync(fieldsetStatus)) {
      const deferredFieldsetStatus = fieldsetStatus.map((status) =>
        Promise.resolve(status));

      return Promise.all(deferredFieldsetStatus)
        .then((statuses) => {
          console.debug('[VPFieldset] Resolved deferred', statuses)
          this.$isValid = this.$strategy(statuses, fields)
          return this.$isValid;
        })
        .catch((err) => {
          console.debug('[VPFieldset] Failed to resolve deferred FieldSet Status', err)
          this.$isValid = false
          return this.$isValid
        });
    } else {
      this.$isValid = this.$strategy(fieldsetStatus as boolean[], fields)
      return this.$isValid
    }
  }

  /**
   * Remove a tracked field from this fieldset
   * @param {VPField} field - Field instance to remove
   */
  removeField (field: VPField): (VPField | undefined) {
    console.debug('[VPFieldset] Removing field', field)

    const index = this.$fields.indexOf(field)
    if (index !== -1) {
      const field = this.$fields.splice(index, 1).pop()
      if (field) {
        field.clearMessages()
        field.removeMessageNode()
        field.removeEventListener('VPValidate', this.$fieldWatch.bind(this))
        field.removeEventListener('VPRemove', this.$fieldRemove.bind(this))
      }

      return field;
    }

    return;
  }

  /**
   * Add a field instance to be tracked
   * @param {VPField} field - Field to track
   * @param {number} [index] - Indicate the field order to track by
   */
  addField (field: VPField, index = this.$fields.length): void {
    console.debug('[VPFieldset] Adding field', field)
    this.$fields.splice(index, 0, field);

    field.addEventListener('VPValidate', this.$fieldWatch.bind(this))
    field.addEventListener('VPRemove', this.$fieldRemove.bind(this));
  }

  /**
   * Helper method for creating a new Field to automatically track
   * @param {HTMLElement} el - Field Element
   * @param {VPFieldOptions} options - Options to apply to the field instance
   */
  createField (el: HTMLElement, options: VPFieldOptions): VPField {
    if (!(el instanceof Element)) {
      throw new Error('[VPFieldset] Field Element must be a valid DOMElement.')
    }

    const field = new VPField(el, options)
    this.addField(field)
    return field
  }

  /**
   * Helper for automatically parsing child elements for Fields
   * @param {VPFieldOptions|VPFieldOptions[]} [fieldOptions] - Options to apply to the found fields. If array, options will apply based on index
   */
  findFields (fieldOptions: (VPFieldOptions | VPFieldOptions[]) = {} as VPFieldOptions) : void {
    const fields = Array.from(this.$element.getElementsByClassName(this.$options.FieldClass))
    if (fields.length === 0) {
      console.debug('[VPFieldset] Failed to find child fields')
      return;
    }

    fields
      .forEach((field: Element, index: number) => {
      if (!this.$fields.every((f) => f.$element !== field)) return;
      const options: VPFieldOptions = Array.isArray(fieldOptions) ? fieldOptions[index] : fieldOptions
      const _field = new VPField(field as HTMLElement, options);

      // Maintain Order for rebinds
      this.addField(_field, index);
    });
  }
}
