import { VPValidatorOptions } from 'src/interfaces/VPOptions'
import { ValidatableOptions } from './ValidatableOptions'

export class ValidatorOptions extends ValidatableOptions implements VPValidatorOptions {
  // ControlFlow
  ValidateLazy = true;
  ValidateVisible = true;

  constructor(options: VPValidatorOptions, element: (HTMLElement | null) = null) {
    super(options, element);
    Object.assign(this, options);
  }
}
