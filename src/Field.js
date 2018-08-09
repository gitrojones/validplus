import debug from './lib/debug'
import events from './lib/events'
import mergeDeep from './lib/mergeDeep'
import messaging from './lib/messaging'

const VPField = function (element, options, customRules, onValidate = {}) {
  this.input = null
  this.element = element
  this.listeners = {}
  this.options = Object.assign({
    showFieldErrors: false,
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

  this.getInput()
  if (this.options.watch === true && this.input instanceof Element) {

    if (['radio', 'checkbox'].includes(this.input.attributes.getNamedItem('type'))) {
      // Not guarenteed to fire w/ inputs
      this.input.addEventListener('change', () => {
        let valid = this.isValid()
        this.dispatchEvent(new Event('onValidate', {
          bubbles: false, cancelable: false }), valid)
      })
    } else {
      this.input.addEventListener('input', () => {
        let valid = this.isValid()
        this.dispatchEvent(new Event('onValidate', {
          bubbles: false, cancelable: false }), valid)
      })
    }
  }
}

VPField.prototype.getInput = function () {
  console.log('[VPField] Querying inputs')

  let input = this.element.getElementsByTagName('input')
  let select = this.element.getElementsByTagName('select')
  let textarea = this.element.getElementsByTagName('textarea')

  if (input.length > 0) console.log('[VPField] Found input', input)
  if (select.length > 0) console.log('[VPField] Found select', select)
  if (textarea.length > 0) console.log('[VPField] Found textarea', textarea)

  this.input = [].concat(
    Array.from(input),
    Array.from(select),
    Array.from(textarea)
  )[0]
}

VPField.prototype.parseInput = function () {
  if (!(this.input instanceof Element)) {
    throw new Error('[VPField] Input must be an instance of Element')
  }

  let attr = this.input.attributes

  return {
    value: this.input.value,
    checked: this.input.checked,
    type: (attr.getNamedItem('type') || {}).value,
    name: (attr.getNamedItem('name') || {}).value,
    rules: {
      min: (attr.getNamedItem('min') || {}).value,
      minLength: (attr.getNamedItem('minlength') || {}).value,
      max: (attr.getNamedItem('max') || {}).value,
      maxLength: (attr.getNamedItem('maxlength') || {}).value,
      pattern: (attr.getNamedItem('pattern') || {}).value,
      required: (attr.getNamedItem('required') || {}).specified || false
    }
  }
}

VPField.prototype.isValid = function () {
  let attributes = this.parseInput()

  const {
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
    errors.push(value.length <= +rules.minLength
               ? true
               : `${name} must be longer than ${rules.minLength} characters.`)
  }
  if (rules.maxLength) {
    errors.push(value.length >= +rules.maxLength
               ? true
               : `${name} must be shorter than ${rules.maxLength} characters.`)
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
  const isValid = errors.every(err => err === true)
  if (typeof pre === 'string') {
    this.appendMessage(pre, '-isInfo')
  }

  if (isValid) {
    if (typeof this._onValidation.isValid.cb === 'function') {
      this._onValidation.isValid.cb()
    }
    if (typeof this._onValidation.isValid.message === 'string') {
      this.appendMessage(this._onValidation.isValid.message, '-isValid')
    }
  } else {
    if (typeof this._onValidation.isInvalid.cb === 'function') {
      this._onValidation.isInvalid.cb()
    }

    if (this.options.showFieldErrors) {
      errors.filter(err => typeof err === 'string').forEach(err => {
        this.appendMessage(err, '-isError')
      })
    }

    if (typeof this._onValidation.isInvalid.message === 'string') {
      this.appendMessage(this._onValidation.isInvalid.message, '-isError')
    }
  }

  return isValid
}

// EventTarget
VPField.prototype.listeners = null
VPField.prototype.addEventListener = events.addEventListener
VPField.prototype.removeEventListener = events.removeEventListener
VPField.prototype.dispatchEvent = events.dispatchEvent

// DOM Messaging
VPField.prototype.clearMessages = messaging.clearMessages
VPField.prototype.removeMessage = messaging.removeMessage
VPField.prototype.appendMessage = messaging.appendMessage('VPMessage')

export default VPField
