import { VPValidatorOptions } from '@/interfaces/VPOptions'
import { ValidatableOptions } from './ValidatableOptions'

export class ValidatorOptions extends ValidatableOptions implements VPValidatorOptions {
  // ControlFlow
  ValidateLazy: boolean = true;
  ValidateVisible: boolean = true;

  constructor(options: VPValidatorOptions, element: (HTMLElement | null) = null) {
    super(options, element);
    Object.assign(this, options);
  }
}
