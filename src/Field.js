import debug from './debug'
import generateElement from './generateElement'

const VPField = function (element, options, onValidate = {
  isValid: {
    message: null,
    cb: null
  },
  isInvalid: {
    message: null,
    cb: null
  }
}) {
  this.input = null
  this.element = element
  this.options = Object.assign({
    showFieldErrors: false
  }, options)
  this._onValidation = onValidate

  this.messageNode = null
  this.messages = []

  this.getInput()
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
    message: (attr.getNamedItem('data-error-message') || {}).value,
    action: (attr.getNamedItem('data-callback') || {}).value,
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
  const {
    value,
    checked,
    message,
    action,
    type,
    name,
    rules
  } = this.parseInput()

  let errors = []
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

  const isValid = errors.every(err => err === true)
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

VPField.prototype.clearMessages = () => {
  this.element.removeChild(this._messageNode)
}

VPField.prototype.removeMessage = (message) => {
  if (!(this._messageNode instanceof Element)) {
    console.log('[VPField] MessageNode isn\'t set')
    return
  }

  Array.from(this._messageNode.children).forEach(child => {
    if (child.innerHTML === message) {
      this._messageNode.removeChild(child)
    }
  })
}

VPField.prototype.appendMessage = (message, status) => {
  let msg = generateElement(message, 'VPMessage ' + status)
  let messages = this._messageNode

  if (messages === null) {
    let _messages = generateElement('', 'VPMessages')
    _messages.appendChild(msg)

    this.element.appendChild(_messages)
    this._messageNode = _messages
  } else {
    if (Array.from(this._messageNode.children)
      .every(m => m.innerHTML !== msg.innerHTML)) {
      this._messageNode.appendChild(msg)
    }
  }
}

export default VPField
