import { VPOptions, VPValidatorOptions } from '@/interfaces/VPOptions'
import { ValidatableOptions } from './ValidatableOptions'

export class ValidatorOptions extends ValidatableOptions implements VPValidatorOptions {
  // ControlFlow
  ValidateLazy: boolean = true
  ValidateVisible: boolean = true

  constructor (options: (VPValidatorOptions | object), element: (HTMLElement | null) = null) {
    super(options as VPOptions, element)
    Object.assign(this, options)
  }
}
