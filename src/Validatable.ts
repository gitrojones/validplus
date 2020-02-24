import { debug } from '@/util/debug'
import { isSet } from '@/util/isSet'
import { toBoolean } from '@/util/casts/toBoolean'

import { VPOptions } from '@/interfaces/VPOptions'
import { ValidationStrategies } from '@/interfaces/validation/ValidationStrategy'
import { ValidationLifecycle, ValidationCB } from '@/interfaces/validation/ValidationLifecycle'

import { DOMMessaging } from '@/lib/DOMMessaging'
import { EventEmitter } from '@/mixins/EventEmitter'

import { ValidatableOptions } from '@/models/VPOptions/ValidatableOptions'
import { VPField } from '@/Field'
import { isAsync } from '@/util/isAsync'
import { VPFieldset } from '@/Fieldset'

export const Validatable = EventEmitter(class extends DOMMessaging {
  [index: string]: any // Allow for child properties to be accessible
  static Options = ValidatableOptions

  dispatchEvent: any // Defined by EventEmitter
  createEvent: any // Defined by EventEmitter
  $options: VPOptions
  $element: HTMLElement
  $strategies: ValidationStrategies
  $valid: boolean | null

  constructor (options: VPOptions, element: HTMLElement) {
    super()

    this.$element = element
    this.$valid = null

    // Set some logical defaults
    if (!(options instanceof ValidatableOptions)) {
      this.$options = new Validatable.Options(options, element)
    } else {
      this.$options = options
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
    this.$MessageNodePOS = this.$options.MessagePOS

    // Allow for manually calling the messageNodeBuilder if it cannot be accomplished right away
    // Used in Vue Bindings
    if (this.$options.MessageAnchor instanceof HTMLElement) {
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

      if (this.$Input instanceof HTMLElement) {
        this.$Input.classList.add(this.$options.ValidClassName)
        this.$Input.classList.remove(this.$options.ErrorClassName)
      }

      if (Array.isArray(this.$options.Lifecycle.Valid.CB)) {
        this.$options.Lifecycle.Valid.CB
          .forEach((CB: ValidationCB) => (CB as Function).call(null, this))
      }

      let ValidMessage: (string | undefined) = this.$options.Lifecycle.Valid.Message
      if (typeof ValidMessage === 'string' && ValidMessage.length > 0) {
        this.addMessage(
          this.$options.Lifecycle.Valid.Message as string,
          this.$options.ValidClassName
        )
      }
    } else {
      this.$element.classList.remove(this.$options.ValidClassName)
      this.$element.classList.add(this.$options.ErrorClassName)

      if (this.$Input instanceof HTMLElement) {
        this.$Input.classList.remove(this.$options.ValidClassName)
        this.$Input.classList.add(this.$options.ErrorClassName)
      }

      if (Array.isArray(this.$options.Lifecycle.Invalid.CB)) {
        this.$options.Lifecycle.Invalid.CB
          .forEach((CB: ValidationCB) => (CB as Function).call(null, this))
      }

      let InvalidMessage: (string | undefined) = this.$options.Lifecycle.Invalid.Message
      if (typeof InvalidMessage === 'string' && InvalidMessage.length > 0) {
        this.addMessage(
          this.$options.Lifecycle.Invalid.Message as string,
          this.$options.ErrorClassName
        )
      }

      if (this.$options.ScrollTo) {
        // While always true, we check due to limitations with JSDOM
        // tslint:disable-next-line: strict-type-predicates
        if (this.$options.ScrollAnchor && typeof this.$options.ScrollAnchor.scrollIntoView === 'function') {
          this.$options.ScrollAnchor.scrollIntoView({ behavior: 'smooth' })
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

  assertValidNoWatch (obj: (VPField | VPFieldset)): Promise<boolean> | boolean {
    let originalWatchValue = obj.$options.Watch
    obj.$options.Watch = false
    let valid = obj.isValid()
    if (isAsync(valid)) {
      valid = new Promise((resolve, reject) => {
        return (valid as Promise<boolean>).then((isValid) => {
          obj.$options.Watch = originalWatchValue
          resolve(isValid)
        }).catch((err) => {
          obj.$options.Watch = originalWatchValue
          reject(err)
        })
      })
    } else {
      obj.$options.Watch = originalWatchValue
    }

    return valid
  }

  setLifecycle (lifecycle: ValidationLifecycle): void {
    const isValidationLifecycle = function (lifecycle: any): lifecycle is ValidationLifecycle {
      return isSet(lifecycle) &&
        ('Valid' in lifecycle || 'Invalid' in lifecycle)
    }

    let valid = this.$options.Lifecycle.Valid || {}
    let invalid = this.$options.Lifecycle.Invalid || {}
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

          this.$options.Lifecycle.Valid.CB.push(lifecycle.Valid.CB as ValidationCB)
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

          this.$options.Lifecycle.Invalid.CB.push(lifecycle.Invalid.CB as ValidationCB)
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

Validatable.prototype.Options = ValidatableOptions
