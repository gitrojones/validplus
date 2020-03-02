import { debug } from '@/util/debug'
import { hasAsync } from '@/util/hasAsync'
import { isAsync } from '@/util/isAsync'

import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy'
import { VPValidatorOptions, VPFieldsetOptions } from '@/interfaces/VPOptions'

import { Validatable } from '@/Validatable'
import { VPFieldset } from '@/Fieldset'
import { VPField } from '@/Field'

import { ValidatorOptions } from '@/models/VPOptions/ValidatorOptions'

/**
 * ValidPlus Validator instance, the container
 * responsible for firing off the validation cycle
 *
 * @name VPValidator
 */
export class VPValidator extends Validatable {
  static Options = ValidatorOptions

  // noinspection ES6ClassMemberInitializationOrder
  $options: VPValidatorOptions = this.$options
  $emitFieldsets: VPFieldset[]
  $fieldsets: VPFieldset[]
  $fieldsetWatch = (_e: Event, trigger: VPFieldset) => {
    _e.stopPropagation()

    this.$emitFieldsets.push(trigger)
    this.isValid()
  }

  private get $visibleFieldsets (): VPFieldset[] {
    return this.$fieldsets.filter((fieldset: VPFieldset) => {
      return this.isElementVisible(fieldset.$element)
    })
  }

  /**
   * @param options - Configuration for the Validator
   * @param element - Validator Anchor Element (Typically a form)
   */
  constructor (options: (VPValidatorOptions | object), element: HTMLElement) {
    super(new VPValidator.Options(options, element), element)

    this.$emitFieldsets = []
    this.$fieldsets = []
  }

  isValid (): (Promise<boolean> | boolean) {
    this.clearMessages()
    let fieldsets = this.$options.ValidateVisible ? this.$visibleFieldsets : this.$fieldsets
    // Bad practice to mutate outwards, but exception for now
    let isValid: (boolean | Promise<boolean>) = true
    let resolvedIsValid: (boolean | Promise<boolean>)[] = fieldsets
      .reduce((resolved: any[], fieldset, index) => {
        if (isValid === false && this.$options.ValidateLazy) return resolved

        let valid: (boolean | Promise<boolean>)
        if (this.$emitFieldsets.indexOf(fieldset) !== -1 && typeof fieldset.$valid === 'boolean') {
          debug('[VPValidator] Cached Valid', index)
          valid = fieldset.$valid
        } else {
          // Concat to the emitFieldsets watch to prevent
          // further loops of validation as they trigger
          this.$emitFieldsets.push(fieldset)
          valid = this.assertValidNoWatch(fieldset)
        }

        isValid = valid
        resolved.push(valid)
        return resolved
      }, [])

    if (hasAsync(resolvedIsValid)) {
      let promises: Promise<boolean>[]
      let asyncIsValid: Promise<boolean>[] = resolvedIsValid.map((result) => {
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
  addFieldset (fieldset: VPFieldset) {
    // noinspection SuspiciousTypeOfGuard
    if (!(fieldset instanceof VPFieldset)) {
      throw new Error('[Validator] Fieldset must be an instanceof VPFieldset')
    }

    this.$fieldsets.push(fieldset)
    this.watchFieldset(fieldset)
  }

  // TODO: method to remove watchers
  watchFieldset (fieldset: VPFieldset) {
    // noinspection SuspiciousTypeOfGuard
    if (!(fieldset instanceof VPFieldset)) {
      throw new Error('[VPFieldset] Field must be an instanceof VPField')
    } // tslint:disable-line

    // TODO: Optimize by tracking state and only revalidating
    // if internal state changes. Currently wasteful
    fieldset.addEventListener('onValidate', this.$fieldsetWatch)
  }

  removeFieldset (fieldset: VPFieldset) {
    // noinspection SuspiciousTypeOfGuard
    if (!(fieldset instanceof VPFieldset)) { // tslint:disable-line
      throw new Error('[VPFieldset] Field must be an instanceof VPField')
    }

    const index = this.$fieldsets.indexOf(fieldset)
    if (index !== -1) {
      // TODO: Remove MutationObserver
      let fieldset = this.$fieldsets.splice(index, 1).pop()
      if (fieldset) {
        fieldset.clearMessages()
        fieldset.removeMessageNode()
        fieldset.removeEventListener('onValidate', this.$fieldsetWatch)
      }

      return fieldset
    }

    return null
  }

  // TODO: Append Predefined Fields w/ CB logic
  // TODO: Validate onValidate structure
  // TODO: Add MutationObserver on children
  createFieldset (fs: HTMLElement,
    strategy: (ValidationStrategy | string),
    options: (VPFieldsetOptions | object),
    fields: VPField[] = []) {
    const fieldset = new VPFieldset(fs, strategy, options)

    fields.forEach(field => {
      fieldset.addField(field)
    })

    this.addFieldset(fieldset)
    return fieldset
  }
}
