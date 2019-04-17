import { Component, Vue, Prop, Provide, Inject } from 'vue-property-decorator'

import { VPValidatorOptions, VPFieldsetOptions, VPFieldOptions } from '@/interfaces/VPOptions'
import { VPValidator as _VPValidator } from '@/Validator'
import { VPFieldset } from '@/Fieldset'
import { VPField } from '@/Field'
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule'
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy'

const VPValidator = Symbol('Validator')
@Component({
  provide () {
    const self: any = this
    const validator = self.validator
    return {
      [VPValidator]: validator
    }
  }
})
export class Validatable extends Vue {
  @Prop(Object) readonly VPOptions!: (VPValidatorOptions | VPFieldsetOptions | VPFieldOptions)
  @Prop({
    default () {
      const self: any = this
      return self.Validator
    }
  }) readonly validator!: _VPValidator

  @Inject({ from: VPValidator, default () {
    console.log('[VPVue] Validator not provided, injecting new validator.')
    const VP = require('validplus').ValidPlus
    return new VP.Validator({
      DeferredMessageAnchor: true
    })
  }}) readonly Validator!: _VPValidator

  // Tracking for destroy
  VPFieldsets: VPFieldset[] = []
  // Can be either a field or a fieldset
  VPField: (VPField | null) = null
  VPFieldset: (VPFieldset | null) = null
  VP: any = null

  // Events
  beforeMount () {
    // Pull in library externally
    this.VP = require('validplus').ValidPlus
  }
  mounted () {
    // Fulfill anchor requirements deferred
    // when elements are available
    let el = this.$el as HTMLElement
    this.validator.$element = el
    this.validator.generateMessageNode(el)
  }
  beforeDestroy () {
    this.VPFieldsets.forEach((fs: VPFieldset) => {
      console.log('[VPVue] Cleaning up fieldsets', fs)
      this.validator.removeFieldset(fs)
    })
  }

  VPCreateField (
    el: HTMLElement,
    options: VPFieldOptions,
    rules: CustomValidationRule[],
    onValidation: ValidationLifecycle) {
    const field = new this.VP.Field(el, options, rules, onValidation)

    return field
  }

  VPCreateFieldset (
    el: HTMLElement,
    strategy: (ValidationStrategy | string),
    options: VPFieldsetOptions,
    fields: VPField[],
    onValidation: ValidationLifecycle) {
    const fieldset = this.validator.createFieldset(el, strategy, options, fields, onValidation)
    this.VPFieldsets.push(fieldset)

    return fieldset
  }

  VPChangeAnchor (el: HTMLElement) {
    this.validator.generateMessageNode(el)
  }

  VPisValid () {
    let isValid: (boolean | Promise<boolean>)
    if (this.VPField) {
      isValid = this.VPField.isValid()
    } else if (this.VPFieldset) {
      isValid = this.VPFieldset.isValid()
    } else {
      isValid = this.validator.isValid()
    }

    const dispatchValidationStatus = (isValid: boolean) => {
      this.$nextTick(() => {
        if (isValid) {
          this.$emit('isValid')
        } else {
          this.$emit('isInvalid')
        }
      })
    }

    if (typeof isValid === 'boolean') {
      dispatchValidationStatus(isValid)
      return isValid
    } else if (typeof isValid.then === 'function') {
      return isValid.then((isValid: boolean) => {
        dispatchValidationStatus(isValid)
        return isValid
      })
    } else {
      throw new Error('Unknown validation format returned')
    }
  }
}

export default Validatable
