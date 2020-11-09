import { VPValidatorOptions } from 'src/interfaces/VPOptions'
import { ValidatableOptions } from './ValidatableOptions'

export class ValidatorOptions extends ValidatableOptions<ValidatorOptions> implements VPValidatorOptions {
  // Setup
  FindFieldsets = false;
  FieldsetClass = 'VPFieldset';

  // ControlFlow
  ValidateLazy = true;
  ValidateVisible = true;

  constructor(options: VPValidatorOptions, element: (HTMLElement | null) = null) {
    super(options, element);
    Object.assign(this, options);
  }
}
