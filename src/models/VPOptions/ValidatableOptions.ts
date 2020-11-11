import merge from 'lodash/merge'
import {VPOptions} from 'src/interfaces/VPOptions'

import {ValidationLifecycle} from 'src/interfaces/validation/ValidationLifecycle'
import {VerticalPosition} from 'src/enums/Positions'
import {getAttributeIfSet} from 'src/util/getAttributeIfSet'
import {toBoolean} from 'src/util/casts/toBoolean'

/**
 * Validatable Options generic for VPOptions
 * @category Options
 * @description
 * Base generic ValidatableOption class all VPOption instances extend from. Implements the generic
 * VPOptions interface and applies standard defaults sourced from the DOM bindings or statically defined.
 *
 * __NOTE:__ See property descriptions for DOM binding attribute names, if implemented
 * @prop {string} [Lifecycle.Valid.Message=''] - vp-valid
 * @prop {string} [Lifecycle.Invalid.Message=''] - vp-invalid
 * @prop {string} [ErrorClassName='-isError'] - vp-error-class
 * @prop {string} [ValidClassName='-isValid'] - vp-valid-class
 * @prop {string} [MessageClassName='VPMessage'] - vp-msg-class
 * @prop {string} [MessageContainerClassName='VPMessages'] - vp-msgs-class
 * @prop {string} [MessagePos=VerticalPosition.bottom] - vp-msg-top || vp-msg-bottom
 * @prop {boolean} [ScrollTo=false] - vp-scroll
 * @prop {HTMLElement|null} [MessageAnchor]
 * @prop {HTMLElement|null} [ScrollAnchor]
 * @prop {ValidationLifecycle} [Lifecycle]
 * @prop {ScrollIntoViewOptions|boolean} [ScrollOptions]
 *
 * @see {@link VPOptions} For more information on properties defined
 */
export class ValidatableOptions<T extends ValidatableOptions<T>> implements VPOptions<T> {
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
  ErrorClassName = '-isError';
  ValidClassName = '-isValid';
  MessageClassName = 'VPMessage';
  MessageContainerClassName = 'VPMessages';
  MessageAnchor: (HTMLElement | null) = null;
  MessagePOS: VerticalPosition = VerticalPosition.bottom;
  ScrollTo = false;
  ScrollAnchor: (HTMLElement | null) = null;
  ScrollOptions: (ScrollIntoViewOptions|boolean) = {
    behavior: 'smooth'
  };

  constructor(options: VPOptions<T>, element: HTMLElement) {
    if (!(options.MessageAnchor instanceof HTMLElement)) {
      options.MessageAnchor = element;
    }
    if (!(options.ScrollAnchor instanceof HTMLElement)) {
      options.ScrollAnchor = element;
    }

    const _options = {
      Lifecycle: {
        Valid: {
          Message: getAttributeIfSet(element, 'vp-valid', this.Lifecycle.Valid.Message)
        },
        Invalid: {
          Message: getAttributeIfSet(element, 'vp-invalid', this.Lifecycle.Invalid.Message)
        }
      },
      ErrorClassName: getAttributeIfSet(element, 'vp-error-class', this.ErrorClassName),
      ValidClassName: getAttributeIfSet(element, 'vp-valid-class', this.ValidClassName),
      MessageClassName: getAttributeIfSet(element, 'vp-msg-class', this.MessageClassName),
      MessageContainerClassName: getAttributeIfSet(element, 'vp-msgs-class', this.MessageContainerClassName),
      MessagePOS: getAttributeIfSet(element, 'vp-msg-bottom',
        getAttributeIfSet(element, 'vp-msg-top', this.MessagePOS)),
      ScrollTo: toBoolean(getAttributeIfSet(element, 'vp-scroll', this.ScrollTo))
    }

    merge(this, _options, options);
  }
}
