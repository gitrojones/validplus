import mergeDeep from './util/mergeDeep'
import debug from './util/debug'

import DOMMessaging from './mixins/DOMMessaging'
import EventEmitter from './mixins/EventEmitter'
import { VPOptions } from './interfaces/VPOptions'
import { ValidationStrategies } from './interfaces/ValidationStrategy'

const Validatable = DOMMessaging(EventEmitter(class Validatable {
  $options: VPOptions
  $element: HTMLElement
  $strategies: ValidationStrategies
  private $_isValid: boolean | null

  constructor(options: VPOptions, element: HTMLElement) {
    this.$element = element
    this.$_isValid = null;

    // Set some logical defaults
    this.$options = mergeDeep({
      ErrorClassName: '-isError',
      ValidClassName: '-isValid',
      MessageClassName: 'VPMessage',
      MessageAnchor: element,
      MessagePOS: 'bottom',
      ScrollTo: true,
      ScrollAnchor: element,
      Watch: false
    }, options) as VPOptions
    this.setLifecycle(this.$options.Lifecycle)

    this.$strategies = {
      all: (fieldstatus: boolean[]) => fieldstatus.every((f: boolean) => f),
      some: (fieldstatus: boolean[]) => fieldstatus.some((f: boolean) => f),
      none: (fieldstatus: boolean[]) => fieldstatus.every((f: boolean) => !f),
      one: (fieldstatus: boolean[]) => fieldstatus.filter((f: boolean) => f).length === 1
    }

    // DOMMessaging
    this.$MessageClassName = this.$options.MessageClassName;
    this.$MessageAnchor = this.$options.MessageAnchor;
    this.$MessageNodePOS = this.$options.MessagePOS;
    // END DOMMessaging
  }

  get $isValid(): boolean {
    return this.$_isValid
  }

  set $isValid(isValid: boolean) {
    this.$_isValid = isValid
    this.clearMessages()

    if (isValid) {
      this.$element.classList.remove(this.$options.ErrorClassName);
      this.$element.classList.add(this.$options.ValidClassName);

      this.$options.Lifecycle.Valid.CB.forEach(CB => CB.call(this))
      this.addMessage(
        this.$options.Lifecycle.Valid.Message,
        this.$options.ValidClassName
      )
    } else {
      this.$element.classList.remove(this.$options.ValidClassName);
      this.$element.classList.add(this.$options.ErrorClassName);

      this.$options.Lifecycle.Invalid.CB.forEach(CB => CB.call(this))
      this.addMessage(
        this.$options.Lifecycle.Invalid.Message,
        this.$options.ErrorClassName
      )

      if (this.$options.ScrollTo === true) {
        if (typeof this.$options.ScrollAnchor.scrollIntoView === 'function') {
          this.$options.ScrollAnchor.scrollIntoView({ behavior: 'smooth' });
        } else {
          debug('[VP] Element Scrolling failed.');
        }
      }
    }
  }

  setLifecycle(lifecycle: ValidationLifecycle): void {
    this.$options.Lifecycle = {
      Valid: {
        Message: '',
        CB: []
      },
      Invalid: {
        Message: 'Input is invalid',
        CB: []
      }
    }

    if (typeof lifecycle !== 'object' || lifecycle === null) {
      debug('[VP] Lifecycle expected to follow ValidationLifecycle Interface.')
      return
    }

    if (lifecycle.Valid) {
      if (typeof lifecycle.Valid.Message === 'string') {
        this.$options.Lifecycle.Valid.Message = lifecycle.Valid.Message
      }
      if (Array.isArray(lifecycle.Valid.CB)) {
        this.$options.Lifecycle.Valid.CB = lifecycle.Valid.CB
      }
    } else if (lifecycle.Invalid) {
      if (typeof lifecycle.Invalid.Message === 'string') {
        this.$options.Lifecycle.Invalid.Message = lifecycle.Invalid.Message
      }
      if (Array.isArray(lifecycle.Invalid.CB)) {
        this.$options.Lifecycle.Invalid.CB = lifecycle.Invalid.CB
      }
    }
  }

  isElementVisible(element: HTMLElement): boolean {
    if (element instanceof HTMLElement) {
      return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)
    } else {
      return null
    }
  }
}));

export default Validatable