import VPFieldset from './Fieldset'
import generateElement from './generateElement'
import debug from './debug'

const Validator = function (options, form = null) {
  if (form === null) {
    debug('[Validator] Non-strict fieldset matching.',
          'Provide a form Element or ID to enable strict matching.')
    this._form = null
    this._strict = false

    // Fieldsets being tracked by Validator
    this._fieldsets = []
  } else {
    this._form = ElementOrID(form)

    // TODO: Add strict support (can only add elements contained within the field)
    this._strict = true

    // TODO: Add child detection
    this._fieldsets = [] // GetChildFieldsets
  }

  this.validationInputs = [
    'input', 'messagebox', 'select'
  ]
  if (Array.isArray(options.validationInputs)) {
    this._options.validationInputs = this._options.validationInputs.concat(options.valiationInputs)
  }

  // TODO: Validate options
  // TODO: Allow toggling options on whether to show messages or fire callbacks
  this._onValidation = Object.assign({
    isValid: {
      cb: null,
      message: null
    },
    isInvalid: {
      cb: null,
      message: null
    }
  }, options.onValidation)

  this._messageNode = null
  this._messages = []

  this._strategies = {
    'all': fields => fields.every(field => field === true),
    'some': fields => fields.some(field => field === true),
    'one': fields => fields.filter(field => field === true).length === 1
  }
}

Validator.prototype.isValid = function () {
  const isValid = this._fieldsets.every(fieldset => fieldset.isValid())

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
    if (typeof this._onValidation.isInvalid.message === 'string') {
      this.appendMessage(this._onValidation.isInvalid.message, '-isValid')
    }
  }

  return isValid
}

// TODO: Child state checks
// TODO: Add MutationObserver on children
Validator.prototype.addFieldset = function (fieldset) {
  if (fieldset instanceof VPFieldset) {
    this._fieldsets.push(fieldset)
  } else {
    throw new Error('[Validator] Fieldset must be an instanceof VPFieldset')
  }
}

// TODO: Remove MutationObserver on children
Validator.prototype.removeFieldset = function (fieldset) {
  const index = this._fieldsets.indexOf(fieldset)
  if (index !== -1) {
    this._fieldsets = this._fieldsets.splice(index, 1)
  }
}

// TODO: Append Predefined Fields w/ CB logic
// TODO: Validate onValidate structure
// TODO: Add MutationObserver on children
Validator.prototype.createFieldset = function (fs, options, onValidate = {
  isValid: {
    cb: null,
    message: null
  },
  isInvalid: {
    cb: null,
    message: null
  }
}) {
  let fieldset = ElementOrID(fs, this._form)

  if (fieldset === null) {
    debug('[Validator] Requires a valid fieldset HTMLElement.')
    return false
  }

  let strategy = this._strategies[options.strategy] || function () {
    throw new Error('[Validator] Invalid Validation Strategy')
  }

  this._fieldsets.push(new VPFieldset(fieldset, strategy, options, onValidate))
}

Validator.prototype.clearMessages = () => {
  this._form.removeChild(this._messageNode)
}

Validator.prototype.removeMessage = (message) => {
  if (!(this._messageNode instanceof Element)) {
    console.log('[Validator] MessageNode isn\'t set')
    return
  }

  Array.from(this._messageNode.children).forEach(child => {
    if (child.innerHTML === message) {
      this._messageNode.removeChild(child)
    }
  })
}

Validator.prototype.appendMessage = (message, status) => {
  let msg = generateElement(message, 'VPMessage ' + status)
  let messages = this._messageNode

  if (messages === null) {
    let _messages = generateElement('', 'VPMessages')
    _messages.appendChild(msg)

    this._form.appendChild(_messages)
    this._messageNode = _messages
  } else {
    if (Array.from(this._messageNode.children)
      .every(m => m.innerHTML !== msg.innerHTML)) {
      this._messageNode.appendChild(msg)
    }
  }
}

// TODO: Strict enforcement
const ElementOrID = function (ElorID, form = null) {
  if (ElorID instanceof Element) return ElorID
  if (typeof ElorID === 'string') {
    let f = (form !== null && form instanceof Element)
      ? form.getElemenyById(ElorID)
      : document.getElementById(ElorID)

    if (f instanceof Element) return f
  }

  return null
}

export default Validator
