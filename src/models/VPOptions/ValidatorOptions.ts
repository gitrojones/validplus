import { VPOptions, VPValidatorOptions } from '@/interfaces/VPOptions'
import { ValidatableOptions } from './ValidatableOptions'
import { cloneDeep } from 'lodash'

export class ValidatorOptions extends ValidatableOptions implements VPValidatorOptions {
  $options: VPOptions

  // ControlFlow
  ValidateLazy: boolean = true
  ValidateVisible: boolean = true

  constructor (options: (VPValidatorOptions | object), element: (HTMLElement | null) = null) {
    super(cloneDeep(options) as VPOptions, element)
    this.$options = options as VPValidatorOptions
    Object.assign(this, options)
  }
}
