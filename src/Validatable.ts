import { mergeDeep } from '@/util/mergeDeep'
import { debug } from '@/util/debug'
import { isSet } from '@/util/isSet'

import { VPOptions } from '@/interfaces/VPOptions'
import { ValidationStrategies } from '@/interfaces/validation/ValidationStrategy'
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'

import { DOMMessaging } from '@/lib/DOMMessaging'

import { EventEmitter } from '@/mixins/EventEmitter'

export const Validatable = EventEmitter(class extends DOMMessaging {
  $options: VPOptions
  $element: HTMLElement
  $strategies: ValidationStrategies
  $valid: boolean | null

  constructor (options: VPOptions, element: HTMLElement) {
    super()

    this.$element = element
    this.$valid = null

    // Set some logical defaults
    this.$options = mergeDeep({
      ErrorClassName: '-isError',
      ValidClassName: '-isValid',
      MessageClassName: 'VPMessage',
      MessageContainerClassName: 'VPMessages',
      DeferredMessageAnchor: false,
      MessageAnchor: element,
      MessagePOS: 'BOTTOM', // VerticalPosition.bottom
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
    this.$MessageClassName = this.$options.MessageClassName
    this.$MessageContainerClassName = this.$options.MessageContainerClassName
    this.$MessageNodePOS = this.$options.MessagePOS

    // Allow for manually calling the messageNodeBuilder if it cannot be accomplished right away
    // Used in Vue Bindings
    if (!this.$options.DeferredMessageAnchor) {
      this.generateMessageNode(this.$options.MessageAnchor)
    }
    // END DOMMessaging
  }

  get $isValid (): boolean | null {
    return this.$valid
  }

  set $isValid (isValid: boolean | null) {
    this.$valid = isValid

    if (isValid) {
      this.$element.classList.add(this.$options.ValidClassName)
      this.$element.classList.remove(this.$options.ErrorClassName)

      if (Array.isArray(this.$options.Lifecycle.Valid.CB)) {
        this.$options.Lifecycle.Valid.CB
          .forEach((CB: () => null) => (CB as Function).call([ this ]))
      } else if (typeof this.$options.Lifecycle.Valid.CB === 'function') {
        (this.$options.Lifecycle.Valid.CB as Function).call([ this ])
      }

      if (typeof this.$options.Lifecycle.Valid.Message === 'string') {
        this.addMessage(
          this.$options.Lifecycle.Valid.Message,
          this.$options.ValidClassName
        )
      }
    } else {
      this.$element.classList.remove(this.$options.ValidClassName)
      this.$element.classList.add(this.$options.ErrorClassName)

      if (Array.isArray(this.$options.Lifecycle.Invalid.CB)) {
        this.$options.Lifecycle.Invalid.CB
          .forEach((CB: () => null) => (CB as Function).call([ this ]))
      } else if (typeof this.$options.Lifecycle.Invalid.CB === 'function') {
        (this.$options.Lifecycle.Invalid.CB as Function).call([ this ])
      }

      if (typeof this.$options.Lifecycle.Invalid.Message === 'string') {
        this.addMessage(
          this.$options.Lifecycle.Invalid.Message,
          this.$options.ErrorClassName
        )
      }

      if (this.$options.ScrollTo === true) {
        // While always true, we check due to limitations with JSDOM
        // tslint:disable-next-line: strict-type-predicates
        if (typeof this.$options.ScrollAnchor.scrollIntoView === 'function') {
          this.$options.ScrollAnchor.scrollIntoView({ behavior: 'smooth' })
        } else {
          debug('[VP] Element Scrolling failed.')
        }
      }
    }
  }

  setLifecycle (lifecycle: ValidationLifecycle): void {
    const isValidationLifecycle = function (lifecycle: any): lifecycle is ValidationLifecycle {
      return isSet(lifecycle) &&
        ('Valid' in lifecycle || 'Invalid' in lifecycle)
    }

    this.$options.Lifecycle = {
      Valid: { },
      Invalid: { }
    }

    if (isValidationLifecycle(lifecycle)) {
      if (lifecycle.Valid) {
        if (typeof lifecycle.Valid.Message === 'string') {
          this.$options.Lifecycle.Valid.Message = lifecycle.Valid.Message
        }
        if (Array.isArray(lifecycle.Valid.CB)) {
          this.$options.Lifecycle.Valid.CB = lifecycle.Valid.CB
        }
      }
      if (lifecycle.Invalid) {
        if (typeof lifecycle.Invalid.Message === 'string') {
          this.$options.Lifecycle.Invalid.Message = lifecycle.Invalid.Message
        }
        if (Array.isArray(lifecycle.Invalid.CB)) {
          this.$options.Lifecycle.Invalid.CB = lifecycle.Invalid.CB
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
})
