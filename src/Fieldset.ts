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
   * @param mutations
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
          this.$isValid = this.$strategy(statuses)
          return this.$isValid;
        })
        .catch((err) => {
          console.debug('[VPFieldset] Failed to resolve deferred FieldSet Status', err)
          this.$isValid = false
          return this.$isValid
        });
    } else {
      this.$isValid = this.$strategy(fieldsetStatus as boolean[])
      return this.$isValid
    }
  }

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

  addField (field: VPField, index = this.$fields.length): void {
    console.debug('[VPFieldset] Adding field', field)
    this.$fields.splice(index, 0, field);

    field.addEventListener('VPValidate', this.$fieldWatch.bind(this))
    field.addEventListener('VPRemove', this.$fieldRemove.bind(this));
  }

  createField (el: HTMLElement, options: VPFieldOptions): VPField {
    if (!(el instanceof Element)) {
      throw new Error('[VPFieldset] Field Element must be a valid DOMElement.')
    }

    const field = new VPField(el, options)
    this.addField(field)
    return field
  }

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
