import { Component, Prop, Watch, Emit, Mixins } from 'vue-property-decorator'

import { VPFieldOptions } from '@/interfaces/VPOptions'
import { VPField } from '@/Field'
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule'
import { Validatable } from './Validatable'
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'

@Component
export class Field extends Mixins<Validatable>(Validatable) {
  @Prop(Object) readonly VPOptions!: VPFieldOptions
  @Prop(Array) readonly VPRules!: CustomValidationRule[]
  @Prop(Object) readonly VPValid!: ValidationLifecycle

  @Emit('isValid')
  @Watch('VPField.$valid')
  onValidChange (isValid: boolean) {
    if (isValid) {
      this.$emit('isValid', this)
    } else {
      this.$emit('isInvalid', this)
    }
  }

  @Emit('VPAddField')
  mounted () {
    this.VPField = this.VPCreateField(
      this.$el,
      this.VPOptions$,
      this.VPRules$,
      this.VPValid$
    )

    this.$nextTick(() => {
      this.$emit('VPAddField', this.VPField)
    })
  }

  VPField: (VPField | null) = null
  VPFields: VPField[] = this.VPFields || []
  VPOptions$: VPFieldOptions = this.VPOptions || {}
  VPRules$: CustomValidationRule[] = this.VPRules || []
  VPValid$: ValidationLifecycle = this.VPValid || {}

  VPChangeAnchor (el: HTMLElement) {
    (this.VPField as VPField).generateMessageNode(el)
  }

  VPAddRule (rule: CustomValidationRule) {
    if (typeof rule === 'function') {
      (this.VPField as VPField).$options.CustomRules.push(rule)
    } else {
      console.error('[VPField] Rule must be a function that resolves to a promise')
    }
  }

  // TODO: No clue which type to import for internal properties
  VPGatherFields () {
    const self = this
    Object.keys(this.$slots).forEach((slot) => {
      const data = this.$slots[slot]

      data.forEach((field: any) => {
        if (field._isVue) {
          field.$once('AddField', function (field: any) {
            self.VPFields.push(field)
          })
        }
      })
    })

    this.$children.forEach((field: any) => {
      if (field._isVue) {
        field.$once('AddField', function (field: any) {
          self.VPFields.push(field)
        })
      }
    })
  }
}

export default Field
