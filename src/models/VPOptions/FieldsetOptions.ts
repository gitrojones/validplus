import { VPFieldsetOptions } from '@/interfaces/VPOptions'
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy'

import { ValidatableOptions } from './ValidatableOptions'

export class FieldsetOptions extends ValidatableOptions implements VPFieldsetOptions {
  // ControlFlow
  ValidateVisible: boolean = true;
  // ValidationOptions
  FieldClass: string = 'VPField';
  ValidationStrategy: (ValidationStrategy | null) = null;

  constructor(options: VPFieldsetOptions, element: (HTMLElement | null) = null) {
    super(options, element);

    Object.assign(this, {
      Watch: false
    }, options);
  }
};
