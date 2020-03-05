import { Component, Prop, Watch, Emit, Mixins } from 'vue-property-decorator'

import { Validatable } from './Validatable'
import { VPFieldsetOptions } from '@/interfaces/VPOptions'
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy'
import { VPField } from '@/Field'
import { VPFieldset } from '@/Fieldset'

@Component
export class Fieldset extends Mixins<Validatable>(Validatable) {
  @Prop(Object) readonly VPOptions!: VPFieldsetOptions
  @Prop(Object) readonly VPValid!: ValidationLifecycle
  @Prop([Function, String]) readonly VPStrategy!: (ValidationStrategy | string)
  @Prop(Array) readonly VPFields!: VPField[]

  @Emit('isValid')
  @Emit('isInvalid')
  @Watch('VPFieldset._isValid')
  handleFieldsetIsValid (isValid: boolean) {
    if (isValid) {
      this.$emit('isValid', this)
    } else {
      this.$emit('isInvalid', this)
    }
  }

  mounted () {
    this.VPFieldset = this.VPCreateFieldset(
      this.$el as HTMLElement,
      this.VPStrategy$,
      this.VPOptions$,
      this.VPFields$
    )

    this.VPGatherFields()
  }

  VPFieldset: (VPFieldset | null) = null
  VPStrategy$: (ValidationStrategy | string) = this.VPStrategy || 'all'
  VPFields$: VPField[] = this.VPFields || []
  VPOptions$: VPFieldsetOptions = this.VPOptions || {}

  VPChangeAnchor (el: HTMLElement) {
    (this.VPFieldset as VPFieldset).generateMessageNode(el)
  }

  VPGatherFields () {
    Object.keys(this.$slots).forEach((slot) => {
      const data = this.$slots[slot]

      if (data) {
        data.forEach((field: any) => {
          if (field._isVue) {
            field.$once('VPAddField', (VPField: VPField) => {
              (this.VPFieldset as VPFieldset).addField(VPField)
            })
          }
        })
      }
    })

    this.$children.forEach((field: any) => {
      if (field._isVue) {
        field.$once('VPAddField', (VPField: VPField) => {
          (this.VPFieldset as VPFieldset).addField(VPField)
        })
      }
    })
  }
}

export default Fieldset
