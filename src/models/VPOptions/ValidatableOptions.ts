import {VPOptions} from 'src/interfaces/VPOptions'

import {ValidationLifecycle} from 'src/interfaces/validation/ValidationLifecycle'
import {ValidInput} from 'src/types/ValidInput'
import {VerticalPosition} from 'src/enums/Positions'

export class ValidatableOptions<T extends ValidatableOptions<T>> implements VPOptions<T> {
  // ControlFlow
  Watch = true;
  Lifecycle: ValidationLifecycle<T> = {
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
  ErrorClassName = '-isError';
  ValidClassName = '-isValid';

  // Input Controller
  PrimaryInput: (null | ValidInput) = null;
  PrimaryInputIndex = 0;
  PrimaryInputType: (null | string) = null;
  InputTypes: ('select' | 'input' | 'textarea')[] = ['select', 'input', 'textarea'];

  // Messaging
  MessageClassName = 'VPMessage';
  MessageContainerClassName = 'VPMessages';
  MessageAnchor: (HTMLElement | null) = null;
  MessagePOS: VerticalPosition = VerticalPosition.bottom;
  ScrollTo = true;
  ScrollAnchor: (HTMLElement | null) = null;

  constructor(options: VPOptions<T>, element: (HTMLElement | null) = null) {
    if (!(options.MessageAnchor instanceof HTMLElement)) {
      options.MessageAnchor = element;
    }
    if (!(options.ScrollAnchor instanceof HTMLElement)) {
      options.ScrollAnchor = element;
    }

    Object.assign(this, options);
  }
}
