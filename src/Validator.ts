import {hasAsync} from 'src/util/hasAsync'

import {VPValidatorOptions, VPFieldsetOptions} from 'src/interfaces/VPOptions'

import {Validatable} from 'src/Validatable'
import {VPFieldset} from 'src/Fieldset'
import {VPField} from 'src/Field'

import {ValidatorOptions} from 'src/models/VPOptions/ValidatorOptions'
import IEVersion from 'src/util/IEVersion'

/**
 * VPValidator Instance
 * @description
 * Validator instances are responsible for managing fieldsets. Validator instances
 * are capable of dispatching validation on all fieldsets (and fields), allowing for a single "isValid" check.
 * @example
 * <form id="sample_form">
 *   ...
 * </form>
 *
 * const Validator = new VP.Validator(
 *  document.getElementById('sample_form'), <options>);
 * @augments Validatable
 */
export class VPValidator extends Validatable<ValidatorOptions> {
  static Options = ValidatorOptions;
  $fieldsets: VPFieldset[]
  $observer: MutationObserver | undefined

  private get $visibleFieldsets (): VPFieldset[] {
    return this.$fieldsets.filter((fieldset: VPFieldset) => {
      return this.isElementVisible(fieldset.$element)
    })
  }

  constructor (element: HTMLElement, options: VPValidatorOptions|ValidatorOptions = {} as VPValidatorOptions) {
    if (!(element instanceof HTMLElement)) throw new Error('[VPValidator] Expected element');
    super(element, new VPValidator.Options(options,element))
    this.$fieldsets = []

    // Disable HTML Validation in favor of ValidPlus validation
    if (element instanceof HTMLFormElement) {
      element.setAttribute('novalidate', 'true');
    }

    if (this.$options.FindFieldsets && this.$options.FieldsetClass) {
      this.findFieldsets();
    }

    if (IEVersion === false || IEVersion >= 11) {
      this.$observer = new MutationObserver(this.$observe.bind(this));
      this.$observer.observe(element, {
        childList: true
      });
    }
  }

  /**
   * If running a modern browser, VP will automatically
   * handle removing tracked nodes which are removed from the DOM.
   * If supporting sub IE11, you must do this yourself using the removeFieldset
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

          for (let i = 0, l = this.$fieldsets.length; i < l; i += 1) {
            const fieldset = this.$fieldsets[i];
            if (fieldset.$element === node) {
              this.removeFieldset(fieldset);
              break;
            }
          }
          if (node.hasChildNodes()) nodes.push(...Array.from(node.childNodes));
        }
      }
    }
  }

  /**
   * Validate internal state
   * @description
   * IsValid is a standard method for validating the internal state
   * of a validator and all it's associated fieldsets (and fields). This method supports dynamic
   * checks for determining if validation should be performed async or sync.
   *
   * If any custom validation rules resolve async, validation will be performed async. Otherwise,
   * all validation is performed synchronously. Optionally, You may enforce async validation through
   * a validation option. This will enforce all validation is returned as a promise.
   *
   * Further, this validation library is capable of short-circuit validation. Lazy validation will
   * stop validation on the first instance of an error.
   *
   * @see {@link ValidatorOptions}
   */
  isValid (): (Promise<boolean> | boolean) {
    this.clearMessages()
    const fieldsets = this.$options.ValidateVisible ? this.$visibleFieldsets : this.$fieldsets
    // Bad practice to mutate outwards, but exception for now
    let isValid: (boolean | Promise<boolean>) = true
    let isInvalidIndex = 0;
    const resolvedIsValid: (boolean | Promise<boolean>)[] = fieldsets
      .reduce((resolved: (boolean|Promise<boolean>)[], fieldset, index) => {
        if (isValid === false && this.$options.ValidateLazy) return resolved

        // Toggle ScrollTo so we only go to the first error
        const ScrollTo = fieldset.$options.ScrollTo;
        if (index !== isInvalidIndex) fieldset.$options.ScrollTo = false;
        isValid = fieldset.isValid();
        if (index !== isInvalidIndex) fieldset.$options.ScrollTo = ScrollTo;
        if (isValid) isInvalidIndex += 1;

        resolved.push(isValid)
        return resolved
      }, [])

    if (hasAsync(resolvedIsValid)) {
      let asyncIsValid: Promise<boolean[]>;
      const promises: Promise<boolean>[] = resolvedIsValid.map((result) => Promise.resolve(result));

      if (this.$options.ValidateLazy) {
        // Return early if we're already invalid and lazy
        if (!isValid) {
          this.$isValid = isValid
          return isValid
        }

        // Resolve one at a time, unless we abort, then finish
        let abort = false;
        asyncIsValid = promises.reduce((results: Promise<boolean[]>, promise) => {
          if (abort) return results;
          return results.then((res: boolean[]) =>
            promise.then((isValid) => {
              if (!isValid) {
                abort = true;
                return res;
              }

              return res.concat([isValid]);
            }));
        }, Promise.resolve([]));
      }
      else {
        // We resolve all at once (Will throw on failure)
        asyncIsValid = Promise.all(promises);
      }

      // Resolve for final isValid
      return asyncIsValid
        .then((results) => {
          this.$isValid = results.every((valid) => valid)
          return this.$isValid;
        })
        .catch((err) => {
          console.debug('[VPValidator] Async Validation failed: ' + err.message, err)
          this.$isValid = false
          return this.$isValid;
        })
    } else {
      // Only if we're not already false
      if (isValid) {
        isValid = resolvedIsValid.every((valid) => valid === true)
      }

      // Otherwise business as usual
      this.$isValid = isValid
      return isValid
    }
  }

  /**
   * Add a fieldset instance to be tracked
   * @param {VPFieldset} fieldset - Fieldset to track
   * @param {number} [index] - Indicate the fieldset order to track by
   */
  addFieldset (fieldset: VPFieldset, index: number = this.$fieldsets.length): void {
    this.$fieldsets.splice(index, 0, fieldset);
  }

  /**
   * Remove a tracked fieldset from this validator
   * @param {VPFieldset} fieldset - Fieldset instance to remove
   */
  removeFieldset (fieldset: VPFieldset) : (VPFieldset | undefined) {
    const index = this.$fieldsets.indexOf(fieldset)
    if (index !== -1) {
      const fieldset = this.$fieldsets.splice(index, 1).pop()
      if (fieldset) {
        fieldset.clearMessages()
        fieldset.removeMessageNode()
      }

      return fieldset
    }

    return undefined
  }

  /**
   * Helper method for creating a new Fieldset to automatically track
   * @param {HTMLElement} el - Fieldset element
   * @param {VPFieldsetOptions} options - Options to apply to the fieldset instance
   * @param {VPField[]} [fields] - Fields to append to the fieldset
   */
  createFieldset (el: HTMLElement, options: VPFieldsetOptions, fields: VPField[] = []) : VPFieldset {
    const fieldset = new VPFieldset(el, options);
    fields.forEach((field) => fieldset.addField(field));

    this.addFieldset(fieldset)
    return fieldset
  }

  /**
   * Helper for automatically parsing child elements for Fieldsets
   * @param {VPFieldsetOptions|VPFieldsetOptions[]} [fieldsetOptions] - Options to apply to the found fieldsets. If array, options will apply based on index
   */
  findFieldsets (fieldsetOptions: (VPFieldsetOptions | VPFieldsetOptions[]) = {} as VPFieldsetOptions) : void {
    const fields = Array.from(this.$element.getElementsByClassName(this.$options.FieldsetClass))
    if (fields.length === 0) {
      console.debug('[VPValidator] Failed to find child fieldsets')
      return;
    }

    fields
      .forEach((field: Element, index: number) => {
        if (!this.$fieldsets.every((fs) => fs.$element !== field)) return;
        const options: VPFieldsetOptions = Array.isArray(fieldsetOptions) ? fieldsetOptions[index] : fieldsetOptions
        const _fieldset = new VPFieldset(field as HTMLElement, options);

        // Maintain Order for rebinds
        this.addFieldset(_fieldset, index);
    });
  }
}
