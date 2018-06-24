import debug from './debug'
import generateError from './genError'

const VPField = function (element, showsErrors) {
  this.element = element
  this.showsErrors = showsErrors

  this.errors = {
    _fields: [],
    _messages: [],
    remove (index) {
      if (index < this._fields.length && index < this._messages.length) {
        this._fields.splice(index, 1)
        this._messages.splice(index, 1)
      }
    },
    valid () {
      console.log(this)
      return this._messages.length === 0 && this._fields.length === 0
    },
    message (index) {
      if (index < this._messages.length) return this._messages[index]
      return null
    },
    field (index) {
      if (index < this._fields.length) return this._fields[index]
      return null
    },
    push (msg) {
      if (typeof msg === 'string' && msg.length > 0) {
        this._messages.push(msg)
        this._fields.push(generateError(msg))
      }
    }
  }

  this.input = null
  this.getInput()
}

VPField.prototype.getInput = function () {
  console.log('[VPField] Querying inputs')

  let input = this.element.getElementsByTagName('input')
  let select = this.element.getElementsByTagName('select')
  let textarea = this.element.getElementsByTagName('textarea')

  if (input.length > 0) console.log('[VPField] Found', input)
  if (select.length > 0) console.log('[VPField] Found', select)
  if (textarea.length > 0) console.log('[VPField] Found', textarea)

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
    message: (attr.getNamedItem('data-error-message') || {}).value,
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

VPField.prototype.validate = function () {
  let {
    value,
    checked,
    message,
    type,
    name,
    rules
  } = this.parseInput()

  if (rules.min) {
    this.errors.push(+value >= +rules.min
               ? true
               : `${name} must be more than ${rules.min}.`)
  }
  if (rules.max) {
    this.errors.push(+value <= +rules.max
               ? true
               : `${name} must be less than ${rules.max}.`)
  }
  if (rules.minLength) {
    this.errors.push(value.length <= +rules.minLength
               ? true
               : `${name} must be longer than ${rules.minLength} characters.`)
  }
  if (rules.maxLength) {
    this.errors.push(value.length >= +rules.maxLength
               ? true
               : `${name} must be shorter than ${rules.maxLength} characters.`)
  }
  if (rules.pattern) {
    this.errors.push(new RegExp(rules.pattern).test(value)
               ? true
               : `${name} is incorrectly formatted.`)
  }

  switch (type) {
  case 'checkbox':
    if (rules.required) {
      this.errors.push(checked ? true : `${name} is required.`)
    }
    break
  case 'radio':
    // One should always be selected
    this.errors.push(checked)
    break
  default:
    if (rules.required) {
      this.errors.push(value.length > 0 ? true : `${name} is required.`)
    }
  }

  let status = this.errors.valid()
  if (status !== true) {
    // If message is defined, it overrides child messages, unless flagged to do otherwise
    // TODO: Implement flag
    if (typeof message === 'string' && message.length > 0) {
    }

    if (this.showsErrors) this.appendError(this.status)
  }

  return status
}

VPField.prototype.appendError = function (valid) {
  if (valid) {
  }
}

export default VPField
