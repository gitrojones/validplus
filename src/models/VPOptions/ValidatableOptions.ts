import { VPOptions } from '@/interfaces/VPOptions'

import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'
import { ValidInput } from '@/types/ValidInput'
import { VerticalPosition } from '@/enums/Positions'

export class ValidatableOptions implements VPOptions {
  // ControlFlow
  Watch: boolean = true;
  Lifecycle: ValidationLifecycle = {
    Valid: {
      CB: [],
      Message: ''
    },
    Invalid: {
      CB: [],
      Message: ''
    }
  };

  // ClassNames
  ErrorClassName: string = '-isError';
  ValidClassName: string = '-isValid';

  // Input Controller
  PrimaryInput: (null | ValidInput) = null;
  PrimaryInputIndex: number = 0;
  PrimaryInputType: (null | string) = null;
  InputTypes: ('select' | 'input' | 'textarea')[] = ['select', 'input', 'textarea'];

  // Messaging
  MessageClassName: string = 'VPMessage';
  MessageContainerClassName: string = 'VPMessages';
  MessageAnchor: (HTMLElement | null) = null;
  MessagePOS: VerticalPosition = VerticalPosition.bottom;
  ScrollTo: boolean = true;
  ScrollAnchor: (HTMLElement | null) = null;

  constructor(options: VPOptions, element: (HTMLElement | null) = null) {
    if (!(options.MessageAnchor instanceof HTMLElement)) {
      options.MessageAnchor = element;
    }
    if (!(options.ScrollAnchor instanceof HTMLElement)) {
      options.ScrollAnchor = element;
    }

    Object.assign(this, options);
  }
};
