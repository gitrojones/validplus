import { debug } from '@/util/debug'
import { mergeDeep } from '@/util/mergeDeep'
import { hasAsync } from '@/util/hasAsync'
import { isAsync } from '@/util/isAsync'

import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy'
import { VPValidatorOptions, VPFieldsetOptions } from '@/interfaces/VPOptions'

import { Validatable } from '@/Validatable'
import { VPFieldset } from '@/Fieldset'
import { VPField } from '@/Field'

/**
 * ValidPlus Validator instance, the container
 * responsible for firing off the validation cycle
 *
 * @name VPValidator
 */
export class VPValidator extends Validatable {
  $options: VPValidatorOptions = this.$options
  $emitFieldsets: VPFieldset[]
  $fieldsets: VPFieldset[]

  private get $visibleFieldsets (): VPFieldset[] {
    return this.$fieldsets.filter((fieldset: VPFieldset) => {
      return this.isElementVisible(fieldset.$element)
    })
  }

  /**
   * @param options - Configuration for the Validator
   * @param element - Validator Anchor Element (Typically a form)
   */
  constructor (options: VPValidatorOptions, element: HTMLElement) {
    super(options, element)

    this.$emitFieldsets = []
    this.$fieldsets = []
    mergeDeep(this.$options, {
      ValidateLazy: true,
      ValidateVisible: true,
      ValidationInputs: ['input', 'select', 'textarea']
    }, options)
    this.setLifecycle(this.$options.Lifecycle)
  }

  isValid () {
    this.clearMessages()
    let fieldsets = this.$options.ValidateVisible ? this.$visibleFieldsets : this.$fieldsets
    // Bad practice to mutate outwards, but exception for now
    let isValid: (boolean | Promise<boolean[]>) = true
    let resolvedIsValid: (boolean | Promise<boolean>)[] = fieldsets
      .reduce((resolved: any[], fieldset, index) => {
        if (isValid === false && this.$options.ValidateLazy) return resolved

        let valid: (boolean | Promise<boolean>)
        if (this.$emitFieldsets.indexOf(fieldset) !== -1 && typeof fieldset.$valid === 'boolean') {
          debug('[VPValidator] Cached Valid', index)
          valid = fieldset.$valid
        } else {
          let originalWatchValue = fieldset.$options.Watch
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

        if (this.$options.ValidateLazy && valid === false) {
          isValid = valid
        }

        resolved.push(valid)
        return resolved
      }, [])

    if (hasAsync(resolvedIsValid)) {
      let promises: Promise<boolean>[]
      let asyncIsValid: Promise<boolean>[] = resolvedIsValid
        .filter(isAsync) as Promise<boolean>[]

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
          this.$isValid = isValid.every((valid) => valid === true)
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
    if (!(fieldset instanceof VPFieldset)) {
      throw new Error('[Validator] Fieldset must be an instanceof VPFieldset')
    }

    this.$fieldsets.push(fieldset)
    this.watchFieldset(fieldset)
  }

  // TODO: method to remove watchers
  watchFieldset (fieldset: VPFieldset) {
    if (!(fieldset instanceof VPFieldset)) return

    // TODO: Optimize by tracking state and only revalidating
    // if internal state changes. Currently wasteful
    fieldset.addEventListener('onValidate', (_e: Event, trigger: VPFieldset) => {
      this.$emitFieldsets.push(trigger)
      this.isValid()
    })
  }

  removeFieldset (fieldset: VPFieldset) {
    const index = this.$fieldsets.indexOf(fieldset)
    if (index !== -1) {
      this.$fieldsets.splice(index, 1)
      // TODO: Remove MutationObserver
    }
  }

  // TODO: Append Predefined Fields w/ CB logic
  // TODO: Validate onValidate structure
  // TODO: Add MutationObserver on children
  createFieldset (fs: HTMLElement,
    strategy: ValidationStrategy,
    options: VPFieldsetOptions,
    fields: VPField[],
    onValidate: ValidationLifecycle) {

    const fieldset = new VPFieldset(fs, strategy, options, onValidate)

    fields.forEach(field => {
      fieldset.addField(field)
    })

    this.$fieldsets.push(fieldset)
    this.watchFieldset(fieldset)

    return fieldset
  }
}
