import VPFieldset from './Fieldset'

import debug from './lib/debug'
import events from './lib/events'
import messaging from './lib/messaging'
import mergeDeep from './lib/mergeDeep'

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

  this.listeners = {}
  this.options = mergeDeep({
    watch: false
  }, options)
  this.validationInputs = [
    'input', 'messagebox', 'select'
  ]
  if (Array.isArray(options.validationInputs)) {
    this._options.validationInputs = this._options.validationInputs.concat(options.valiationInputs)
  }

  // TODO: Validate options
  // TODO: Allow toggling options on whether to show messages or fire callbacks
  this._onValidation = mergeDeep({
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
  if (!(fieldset instanceof VPFieldset)) {
    throw new Error('[Validator] Fieldset must be an instanceof VPFieldset')
  }

  this._fieldsets.push(fieldset)
  if (this.options.watch === true) {
    this.watchFieldset(_fieldset)
  }

}

// TODO: method to remove watchers
Validator.prototype.watchFieldset = function (fieldset) {
  if (!(fieldset instanceof VPFieldset)) return

  // TODO: Optimize by tracking state and only revalidating
  // if internal state changes. Currently wasteful
  fieldset.addEventListener('onValidation', (e, isValid) => {
    this.isValid()
  })
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
Validator.prototype.createFieldset = function (fs, strategy, options, fields, onValidate = null) {
  const fieldset = ElementOrID(fs, this._form)

  if (fieldset === null) {
    debug('[Validator] Requires a valid fieldset HTMLElement.')
    return false
  }

  const _strategy = this._strategies[strategy] || function () {
    throw new Error('[Validator] Invalid Validation Strategy')
  }
  const _fieldset = new VPFieldset(fieldset, _strategy, options, onValidate)
  fields.forEach(field => {
    _fieldset.addField(field)
  })

  this._fieldsets.push(_fieldset)
  if (this.options.watch === true) {
    this.watchFieldset(_fieldset)
  }

  return _fieldset
}

// EventTarget
Validator.prototype.listeners = null
Validator.prototype.addEventListener = events.addEventListener
Validator.prototype.removeEventListener = events.removeEventListener
Validator.prototype.dispatchEvent = events.dispatchEvent

// DOM Messaging
Validator.prototype.clearMessages = messaging.clearMessages
Validator.prototype.removeMessage = messaging.removeMessage
Validator.prototype.appendMessage = messaging.appendMessage('VPMessage')

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
