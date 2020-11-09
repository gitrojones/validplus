import {VPOptions} from 'src/interfaces/VPOptions'

import {ValidationLifecycle} from 'src/interfaces/validation/ValidationLifecycle'
import {VerticalPosition} from 'src/enums/Positions'

export class ValidatableOptions<T extends ValidatableOptions<T>> implements VPOptions<T> {
  // ControlFlow
  Watch = true;
  Validator: (Element|null) = null;
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

  // Messaging
  MessageClassName = 'VPMessage';
  MessageContainerClassName = 'VPMessages';
  MessageAnchor: (HTMLElement | null) = null;
  MessagePOS: VerticalPosition = VerticalPosition.bottom;
  ScrollTo = true;
  ScrollAnchor: (HTMLElement | null) = null;
  ScrollOptions: (ScrollIntoViewOptions|boolean) = {
    behavior: 'smooth'
  };

  constructor(options: VPOptions<T>, element: (HTMLElement | null) = null) {
    if (!(options.MessageAnchor instanceof HTMLElement)) {
      options.MessageAnchor = element;
    }

    Object.assign(this, options);
  }
}
