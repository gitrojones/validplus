import { VPFieldsetOptions } from 'src/interfaces/VPOptions'
import { ValidationStrategyNames } from 'src/interfaces/validation/ValidationStrategy'

import { ValidatableOptions } from './ValidatableOptions'

export class FieldsetOptions extends ValidatableOptions<FieldsetOptions> implements VPFieldsetOptions {
  // ControlFlow
  ValidateVisible = true;
  // ValidationOptions
  FieldClass = 'VPField';
  ValidationStrategy: ValidationStrategyNames = 'all';

  constructor(options: VPFieldsetOptions, element: (HTMLElement | null) = null) {
    super(options, element);

    Object.assign(this, {
      Watch: false
    }, options);
  }
}
