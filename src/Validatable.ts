import merge from 'lodash/merge'

import {debug} from 'src/util/debug'
import {isSet} from 'src/util/isSet'
import {toBoolean} from 'src/util/casts/toBoolean'

import {VPOptions} from 'src/interfaces/VPOptions'
import {ValidationStrategies} from 'src/interfaces/validation/ValidationStrategy'
import {ValidationLifecycle, ValidationCB} from 'src/interfaces/validation/ValidationLifecycle'

import {DOMMessaging} from 'src/lib/DOMMessaging'
import {EventEmitter} from 'src/mixins/EventEmitter'

import {ValidatableOptions} from 'src/models/VPOptions/ValidatableOptions'
import {getAttributeIfSet} from 'src/util/getAttributeIfSet'

const EEMessaging = EventEmitter(DOMMessaging);
export class Validatable<T extends ValidatableOptions<T>> extends EEMessaging {
  $options: T
  $element: HTMLElement
  $lifecycleElements: HTMLElement[]
  $strategies: ValidationStrategies
  $valid: boolean | null

  constructor (element: HTMLElement, options: (VPOptions<T> | ValidatableOptions<T>)) {
    super()

    this.$lifecycleElements = [];
    this.$element = element
    this.$lifecycleElements.push(element);
    this.$valid = null

    // This is a generic. If options aren't derived from ValidatableOptions, we throw
    if (!(options instanceof ValidatableOptions)) throw new Error('Options were unset');
    else {
      this.$options = merge(options, {
        ErrorClassName: getAttributeIfSet(element, 'vp-error-class', '-isError'),
        ValidClassName: getAttributeIfSet(element, 'vp-valid-class', '-isValid')
      }) as T;
    }

    if (element && element instanceof HTMLElement) {
      this.$options.Watch = toBoolean(element.getAttribute('vp-watch'), true) as boolean
    }

    this.setLifecycle(this.$options.Lifecycle)

    this.$strategies = {
      all: (fieldstatus: boolean[]) => fieldstatus.every((f: boolean) => f),
      some: (fieldstatus: boolean[]) => fieldstatus.some((f: boolean) => f),
      none: (fieldstatus: boolean[]) => fieldstatus.every((f: boolean) => !f),
      one: (fieldstatus: boolean[]) => fieldstatus.filter((f: boolean) => f).length === 1
    }

    // DOMMessaging
    this.$MessageClassName = this.$options.MessageClassName
    this.$MessageContainerClassName = this.$options.MessageContainerClassName

    // Allow for manually calling the messageNodeBuilder if it cannot be accomplished right away
    // Used in Vue Bindings
    if (this.$options.MessageAnchor instanceof HTMLElement) {
      this.generateMessageNode(this.$options.MessageAnchor, this.$options.MessagePOS)
    }
    // END DOMMessaging
  }

  get $isValid (): boolean | null {
    return this.$valid
  }

  set $isValid (isValid: boolean | null) {
    this.$valid = isValid

    if (isValid) {
      this.$lifecycleElements.forEach((element) => {
        element.classList.remove(this.$options.ErrorClassName)
        element.classList.add(this.$options.ValidClassName)
      })

      if (Array.isArray(this.$options.Lifecycle.Valid.CB)) {
        this.$options.Lifecycle.Valid.CB
          .forEach((CB: ValidationCB<T>) => CB(this))
      }

      const ValidMessage: (string | undefined) = this.$options.Lifecycle.Valid.Message
      if (typeof ValidMessage === 'string' && ValidMessage.length > 0) {
        this.addMessage(
          this.$options.Lifecycle.Valid.Message as string,
          this.$options.ValidClassName
        )
      }
    } else {
      this.$lifecycleElements.forEach((element) => {
        element.classList.remove(this.$options.ValidClassName)
        element.classList.add(this.$options.ErrorClassName)
      })

      if (Array.isArray(this.$options.Lifecycle.Invalid.CB)) {
        this.$options.Lifecycle.Invalid.CB
          .forEach((CB: ValidationCB<T>) => CB(this));
      }

      const InvalidMessage: (string | undefined) = this.$options.Lifecycle.Invalid.Message
      if (typeof InvalidMessage === 'string' && InvalidMessage.length > 0) {
        this.addMessage(
          this.$options.Lifecycle.Invalid.Message as string,
          this.$options.ErrorClassName
        )
      }

      if (this.$options.ScrollTo && this.$options.ScrollAnchor instanceof Element) {
        // While always true, we check due to limitations with JSDOM
        if (typeof this.$options.ScrollAnchor.scrollIntoView === 'function') {
          this.$options.ScrollAnchor.scrollIntoView(this.$options.ScrollOptions);
        } else {
          debug('[VP] Element Scrolling failed.')
        }
      }
    }

    if (this.$options.Watch) {
      debug('[Validatable] Emit watch')
      this.dispatchEvent(this.createEvent('onValidate'), this)
    }
  }

  setLifecycle (lifecycle: ValidationLifecycle<T>): void {
    const isValidationLifecycle = function (lifecycle: ValidationLifecycle<T>) {
      return isSet(lifecycle) &&
        ('Valid' in lifecycle || 'Invalid' in lifecycle)
    }

    const valid = this.$options.Lifecycle.Valid || {}
    const invalid = this.$options.Lifecycle.Invalid || {}
    this.$options.Lifecycle = {
      Valid: {
        Message: valid.Message,
        CB: valid.CB
      },
      Invalid: {
        Message: invalid.Message,
        CB: invalid.CB
      }
    }

    if (isValidationLifecycle(lifecycle)) {
      if (lifecycle.Valid) {
        if (typeof lifecycle.Valid.Message === 'string') {
          this.$options.Lifecycle.Valid.Message = lifecycle.Valid.Message
        }

        if (Array.isArray(lifecycle.Valid.CB)) {
          this.$options.Lifecycle.Valid.CB = lifecycle.Valid.CB
        } else if (typeof lifecycle.Valid.CB === 'function') {
          if (!Array.isArray(this.$options.Lifecycle.Valid.CB)) {
            this.$options.Lifecycle.Valid.CB = []
          }

          this.$options.Lifecycle.Valid.CB.push(lifecycle.Valid.CB)
        }
      }
      if (lifecycle.Invalid) {
        if (typeof lifecycle.Invalid.Message === 'string') {
          this.$options.Lifecycle.Invalid.Message = lifecycle.Invalid.Message
        }
        if (Array.isArray(lifecycle.Invalid.CB)) {
          this.$options.Lifecycle.Invalid.CB = lifecycle.Invalid.CB
        } else if (typeof lifecycle.Invalid.CB === 'function') {
          if (!Array.isArray(this.$options.Lifecycle.Invalid.CB)) {
            this.$options.Lifecycle.Invalid.CB = []
          }

          this.$options.Lifecycle.Invalid.CB.push(lifecycle.Invalid.CB)
        }
      }
    }
  }

  isElementVisible (element: HTMLElement): boolean {
    if (element instanceof HTMLElement) {
      return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)
    }

    return false
  }
}
