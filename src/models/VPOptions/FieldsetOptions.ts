import {VPFieldsetOptions} from 'src/interfaces/VPOptions'
import {ValidationOption} from 'src/interfaces/validation/ValidationStrategy'

import {ValidatableOptions} from './ValidatableOptions'

export class FieldsetOptions extends ValidatableOptions<FieldsetOptions> implements VPFieldsetOptions {
  // Setup
  FindFields = false;
  FieldClass = 'VPField';
  // ControlFlow
  ValidateVisible = true;
  // ValidationOptions
  ValidationStrategy: ValidationOption = 'all';

  constructor(options: VPFieldsetOptions, element: (HTMLElement | null) = null) {
    super(options, element);
    if (!(options.ScrollAnchor instanceof HTMLElement)) {
      options.ScrollAnchor = element;
    }

    Object.assign(this, {
      Watch: false
    }, options);
  }
}
