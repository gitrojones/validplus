import debug from './util/debug'
import mergeDeep from './util/mergeDeep'

import events from './lib/events'
import messaging from './lib/messaging'

const VPField = function (element, options, customRules, onValidate = {}) {
  this.input = null
  this.element = element
  this.listeners = {}
  this.canValidate = true
  this.options = Object.assign({
    formatter: {
      pre: null,
      post: null
    },
    errorClass: '-isError',
    messageAnchor: null,
    messagePOS: 'bottom',
    showFieldErrors: false,
    dirtyOnBlur: false,
    watch: true
  }, options)

  this._onValidation = mergeDeep({
    isValid: {
      message: null,
      cb: null
    },
    isInvalid: {
      message: null,
      cb: null
    }
  }, onValidate)
  this._customRules = customRules

  this._messageNode = null
  this._messages = []
  this._isValid = null
  this._dirty = false

  this.getInput()
  if (this.options.watch === true && this.input instanceof Element) {

    if (['radio', 'checkbox'].includes(this.input.attributes.getNamedItem('type'))) {
      this.input.addEventListener('change', () => {
        if (this.options.dirtyOnBlur === false) {
          this._dirty = true
        }

        if (this.canValidate === true && this._dirty === true) {
          const emit = this._isValid !== null

          let valid = this.isValid()
          if (emit) {
            this.dispatchEvent(new Event('onValidate', {
              bubbles: false, cancelable: false }), valid)
          }
        }
      })
    } else {
      this.input.addEventListener('input', () => {
        if (this.options.dirtyOnBlur === false) {
          this._dirty = true
        }

        if (this.canValidate === true && this._dirty === true) {
          const emit = this._isValid !== null

          let valid = this.isValid()
          if (emit) {
            this.dispatchEvent(new Event('onValidate', {
              bubbles: false, cancelable: false }), valid)
          }
        }
      })
    }

    if (this.options.dirtyOnBlur === true) {
      // Once
      const toggleDirty = () => {
        this._dirty = true
        let valid = this.isValid()
        this.dispatchEvent(new Event('onValidate', {
          bubbles: false, cancelable: false }), valid)

        this.input.removeEventListener('blur', toggleDirty)
      }

      this.input.addEventListener('blur', toggleDirty)
    }
  }
}

VPField.prototype.parseInput = function () {
  if (!(this.input instanceof Element)) {
    throw new Error('[VPField] Input must be an instance of Element')
  }

  let attr = this.input.attributes

  return {
    value: this.input.value,
    checked: this.input.checked,
    type: this.input.getAttribute('type'),
    name: this.input.getAttribute('data-name') || this.input.getAttribute('name'),
    rules: {
      min: this.input.getAttribute('min'),
      minLength: this.input.getAttribute('minlength'),
      max: this.input.getAttribute('max'),
      maxLength: this.input.getAttribute('maxlength'),
      pattern: this.input.getAttribute('pattern'),
      required: this.input.getAttribute('required') || false
    }
  }
}

VPField.prototype.getInput = function () {
  debug('[VPField] Querying inputs')

  let input = this.element.getElementsByTagName('input')
  let select = this.element.getElementsByTagName('select')
  let textarea = this.element.getElementsByTagName('textarea')

  if (input.length > 0) debug('[VPField] Found input', input)
  if (select.length > 0) debug('[VPField] Found select', select)
  if (textarea.length > 0) debug('[VPField] Found textarea', textarea)

  this.input = [].concat(
    Array.from(input),
    Array.from(select),
    Array.from(textarea)
  )[0]

  // if (this.input instanceof Element) {
    // TODO: Clobber w/ VueJS, figure out how to support
    // this.input.setAttribute('__value', this.input.value)

    // Object.defineProperty(this.input, 'value', {
    //   configurable: true,
    //   enumerable: true,
    //   get: function () {
    //     return this.getAttribute('__value')
    //   },
    //   set: function (val) {
    //     this.setAttribute('__value', val)

    //     if (this.tagName.toLowerCase() === 'input' && ['radio', 'checkbox'].includes(this.getAttribute('type'))) {
    //       this.dispatchEvent(new Event('change'))
    //     } else {
    //       this.dispatchEvent(new Event('input'))
    //     }
    //   }
    // })
  // }
}

VPField.prototype.isValid = function () {
  this.canValidate = false
  if (typeof this.options.formatter.pre === 'function') {
    this.options.formatter.pre(this.input)
  }

  let attributes = this.parseInput()
  let {
    value,
    checked,
    message,
    action,
    type,
    name,
    rules
  } = attributes

  let errors = []
  if (typeof this._customRules === 'function') {
    errors.push(this._customRules(attributes, this.element, this.input))
  } else if (Array.isArray(this._customRules)) {
    errors = errors.concat(this._customRules.map(rule => {
      if (typeof rule === 'function') {
        return rule(attributes, this.element, this.input)
      }

      return true
    }))
  }

  if (rules.min) {
    errors.push(+value >= +rules.min
               ? true
               : `${name} must be more than ${rules.min}.`)
  }
  if (rules.max) {
    errors.push(+value <= +rules.max
               ? true
               : `${name} must be less than ${rules.max}.`)
  }
  if (rules.minLength) {
    errors.push(value.length >= +rules.minLength
               ? true
               : `${name} must be ${rules.minLength} characters or more.`)
  }
  if (rules.maxLength) {
    errors.push(value.length <= +rules.maxLength
               ? true
               : `${name} must be ${rules.maxLength} characters or less.`)
  }
  if (rules.pattern) {
    errors.push(new RegExp(rules.pattern).test(value)
               ? true
               : `${name} is incorrectly formatted.`)
  }

  switch (type) {
  case 'checkbox':
    if (rules.required) {
      errors.push(checked ? true : `${name} is required.`)
    }
    break
  case 'radio':
    // One should always be selected
    errors.push(checked)
    break
  default:
    if (rules.required) {
      errors.push(value.length > 0 ? true : `${name} is required.`)
    }
  }

  this.clearMessages()
  this._isValid = errors.every(err => err === true)
  if (typeof pre === 'string') {
    this.addMessage(pre, '-isInfo')
  }

  if (this._isValid) {
    this.element.classList.remove(this.options.errorClass)

    if (typeof this._onValidation.isValid.cb === 'function') {
      this._onValidation.isValid.cb()
    }
    if (typeof this._onValidation.isValid.message === 'string') {
      this.addMessage(this._onValidation.isValid.message, '-isValid')
    }
  } else {
    this.element.classList.add(this.options.errorClass)

    if (typeof this._onValidation.isInvalid.cb === 'function') {
      this._onValidation.isInvalid.cb()
    }

    if (this.options.showFieldErrors) {
      errors.filter(err => typeof err === 'string').forEach(err => {
        this.addMessage(err, '-isError')
      })
    }

    if (typeof this._onValidation.isInvalid.message === 'string') {
      this.addMessage(this._onValidation.isInvalid.message, '-isError')
    }
  }

  if (typeof this.options.formatter.post === 'function') {
    this.options.formatter.post(this.input, value)
  }

  this.canValidate = true
  return this._isValid
}

// EventTarget
VPField.prototype.listeners = null
VPField.prototype.addEventListener = events.addEventListener
VPField.prototype.removeEventListener = events.removeEventListener
VPField.prototype.dispatchEvent = events.dispatchEvent

// DOM Messaging
VPField.prototype.clearMessages = messaging.clearMessages
VPField.prototype.removeMessage = messaging.removeMessage
VPField.prototype.addMessage = messaging.addMessage('VPMessage')

export default VPField
