// import { debug } from '@/util/debug'
import { mergeDeep } from '@/util/mergeDeep'

import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy'
import { VPValidatorOptions, VPFieldsetOptions } from '@/interfaces/VPOptions'
import { EventCallback } from '@/interfaces/events/EventCallback'

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

  private $fieldsets: VPFieldset[]
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

    this.$fieldsets = []
    mergeDeep(this.$options, {
      ValidateLazy: true,
      ValidateVisible: true,
      ValidationInputs: ['input', 'select', 'textarea']
    }, options)
    this.setLifecycle(this.$options.Lifecycle)
  }

  isValid () {
    let fieldsets = this.$options.ValidateVisible ? this.$visibleFieldsets : this.$fieldsets
    let isValid

    // TODO: ValidateLazy
    if (this.$options.ValidateLazy) {
      isValid = fieldsets.every((fieldset: VPFieldset) => {
        const isValid = fieldset.isValid()
        return isValid || false
      })
    } else {
      isValid = fieldsets.reduce((isValid, fieldset) => {
        if (!fieldset.isValid()) {
          isValid = false
        }

        return isValid
      }, true)
    }

    this.$isValid = isValid
    return isValid
  }

  // TODO: Child state checks
  // TODO: Add MutationObserver on children
  addFieldset (fieldset: VPFieldset) {
    if (!(fieldset instanceof VPFieldset)) {
      throw new Error('[Validator] Fieldset must be an instanceof VPFieldset')
    }

    this.$fieldsets.push(fieldset)
    if (this.$options.Watch === true) {
      this.watchFieldset(fieldset)
    }
  }

  // TODO: method to remove watchers
  watchFieldset (fieldset: VPFieldset) {
    if (!(fieldset instanceof VPFieldset)) return

    const CB: EventCallback = () => {
      this.isValid()
    }

    // TODO: Optimize by tracking state and only revalidating
    // if internal state changes. Currently wasteful
    fieldset.addEventListener('onValidate', CB)
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
    if (this.$options.Watch === true) {
      this.watchFieldset(fieldset)
    }

    return fieldset
  }
}
