import { debug } from 'src/util/debug'
import { hasAsync } from 'src/util/hasAsync'
import { isAsync } from 'src/util/isAsync'

import { VPValidatorOptions, VPFieldsetOptions } from 'src/interfaces/VPOptions'

import { Validatable } from 'src/Validatable'
import { VPFieldset } from 'src/Fieldset'
import { VPField } from 'src/Field'

import { ValidatorOptions } from 'src/models/VPOptions/ValidatorOptions'

/**
 * ValidPlus Validator instance, the container
 * responsible for firing off the validation cycle
 *
 * @name VPValidator
 */
export class VPValidator extends Validatable {
  static Options = ValidatorOptions;

  $emitFieldsets: VPFieldset[]
  $fieldsets: VPFieldset[]

  private get $visibleFieldsets (): VPFieldset[] {
    return this.$fieldsets.filter((fieldset: VPFieldset) => {
      return this.isElementVisible(fieldset.$element)
    })
  }

  constructor (element: HTMLElement, options: VPValidatorOptions = {} as VPValidatorOptions) {
    super(element, new VPValidator.Options(options, element))

    this.$emitFieldsets = []
    this.$fieldsets = []
  }

  /**
   * Standard fieldset change watcher
   * @todo Optimize to track internal state and only revalidate if internal state has changed.
   */
  $fieldsetWatch (_e: Event, trigger: VPFieldset): void {
    _e.stopPropagation()

    this.$emitFieldsets.push(trigger)
    this.isValid()
  }

  /**
   * Validate internal state
   * @description
   * IsValid is a standard method for validating the internal state
   * of a validator and all it's associated children. This method supports dynamic
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
    const resolvedIsValid: (boolean | Promise<boolean>)[] = fieldsets
      .reduce((resolved: (boolean|Promise<boolean>)[], fieldset, index) => {
        if (isValid === false && this.$options.ValidateLazy) return resolved

        let valid: (boolean | Promise<boolean>)
        if (this.$emitFieldsets.indexOf(fieldset) !== -1 && typeof fieldset.$valid === 'boolean') {
          debug('[VPValidator] Cached Valid', index)
          valid = fieldset.$valid
        } else {
          const originalWatchValue = fieldset.$options.Watch
          // Concat to the emitFieldsets watch to prevent
          // further loops of validation as they trigger
          this.$emitFieldsets.push(fieldset)
          fieldset.$options.Watch = false
          valid = fieldset.isValid()
          if (isAsync(valid)) {
            valid = new Promise((resolve, reject) => {
              return (valid as Promise<boolean>).then((isValid) => {
                fieldset.$options.Watch = originalWatchValue
                resolve(isValid)
              }).catch((err) => {
                fieldset.$options.Watch = originalWatchValue
                reject(err)
              })
            })
          } else {
            fieldset.$options.Watch = originalWatchValue
          }
        }

        isValid = valid
        resolved.push(valid)
        return resolved
      }, [])

    if (hasAsync(resolvedIsValid)) {
      let promises: Promise<boolean>[]
      const asyncIsValid: Promise<boolean>[] = resolvedIsValid.map((result) => {
        if (isAsync(result)) return result as Promise<boolean>
        else return Promise.resolve(result)
      })

      if (this.$options.ValidateLazy) {
        // Return early if we're already invalid and lazy
        if (!isValid) {
          this.$isValid = isValid
          return isValid
        }

        promises = asyncIsValid
          .map((promise: Promise<boolean>) => {
            return new Promise((resolve, reject) => {
              promise.then((isValid: boolean) => {
                // We reject since we want execution to stop at first error
                if (isValid) resolve(true)
                else reject(false)
              }).catch((err: Error) => {
                debug('[VPValidator] Caught Fieldset Exception')
                reject(err)
              })
            })
          })
      } else {
        promises = asyncIsValid
      }

      // Return the promise for async
      return new Promise((resolve) => {
        Promise.all(promises).then((isValid: boolean[]) => {
          this.$isValid = isValid.every((valid) => valid)
          this.$emitFieldsets = []
          return resolve(this.$isValid)
        }).catch((err) => {
          debug('[VPValidator] Async Validation failed: ' + err.message, err)
          this.$isValid = false
          this.$emitFieldsets = []
          return resolve(this.$isValid)
        })
      })
    } else {
      // Only if we're not already false
      if (isValid) {
        isValid = resolvedIsValid.every((valid) => valid === true)
      }

      // Otherwise business as usual
      this.$isValid = isValid
      this.$emitFieldsets = []
      return isValid
    }
  }

  // TODO: Child state checks
  // TODO: Add MutationObserver on children
  addFieldset (fieldset: VPFieldset): void {
    this.$fieldsets.push(fieldset)
    this.watchFieldset(fieldset)
  }

  // TODO: method to remove watchers
  watchFieldset (fieldset: VPFieldset): void {
    fieldset.addEventListener('onValidate', this.$fieldsetWatch)
  }

  unwatchFieldset(fieldset: VPFieldset): void {
    fieldset.removeEventListener('onValidate', this.$fieldsetWatch);
  }

  removeFieldset (fieldset: VPFieldset) : (VPFieldset | undefined) {
    const index = this.$fieldsets.indexOf(fieldset)
    if (index !== -1) {
      // TODO: Remove MutationObserver
      const fieldset = this.$fieldsets.splice(index, 1).pop()
      if (fieldset) {
        fieldset.clearMessages()
        fieldset.removeMessageNode()
        fieldset.removeEventListener('onValidate', this.$fieldsetWatch)
      }

      return fieldset
    }

    return undefined
  }

  // TODO: Append Predefined Fields w/ CB logic
  // TODO: Validate onValidate structure
  // TODO: Add MutationObserver on children
  createFieldset (fs: HTMLElement, options: VPFieldsetOptions, fields: VPField[]) : VPFieldset {
    const fieldset = new VPFieldset(fs, options);
    fields.forEach((field) => fieldset.addField(field));

    this.addFieldset(fieldset)
    return fieldset
  }
}
