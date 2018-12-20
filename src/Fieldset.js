import VPField from './Field'

import debug from './util/debug'
import mergeDeep from './util/mergeDeep'
import isElemVisible from './util/isElemVisible'
import createEvent from './util/createEvent'

import events from './lib/events'
import messaging from './lib/messaging'

// Options include
// ---------------
// showMessage: <false> - Fieldset level error shown
// noChildren: <false> - No children errors (field level)
// fieldClass: 'field' - Child 'Field' className
//

const VPFieldset = function (element, strategy, options, onValidate = {}) {
  if (!(element instanceof Element)) {
    throw new Error('[VPFieldset] Valid Element is required.')
  }

  if (typeof strategy !== 'function') {
    throw new Error('[VPFieldset] Validation strategy passed is invalid.')
  }

  this.strategy = strategy
  this.element = element
  this.listeners = {}
  this.options = Object.assign({
    validateVisible: true,
    fieldClass: 'VPField',
    errorClass: '-isError',
    validClass: '-isValid',
    messageAnchor: null,
    messagePOS: 'bottom',
    scrollAnchor: null,
    scrollTo: true,
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
  this._fields = []
  this._isValid = null

  this._messageNode = null
  this._messages = []
}

VPFieldset.prototype.isValid = function () {
  const fieldSetStatus = this._fields.reduce((status, field, index) => {
    debug('[VPFieldset] Validating field', index)
    if (this.options.validateVisible) {
      if (isElemVisible(field.element)) {
        debug('[VPFieldset] Field is visible, continuing')
        status.push(field.isValid())
      } else {
        debug('[VPFieldset] Skipping hidden field', field)
      }
    } else {
      status.push(field.isValid())
    }

    return status
  }, [])

  this.clearMessages()
  this._isValid = this.strategy(fieldSetStatus)
  if (this._isValid) {
    this.element.classList.remove(this.options.errorClass)
    this.element.classList.add(this.options.validClass)

    if (typeof this._onValidation.isValid.cb === 'function') {
      this._onValidation.isValid.cb()
    }
    if (typeof this._onValidation.isValid.message === 'string') {
      this.addMessage(this._onValidation.isValid.message, this.options.validClass)
    }
  } else {
    this.element.classList.remove(this.options.validClass)
    this.element.classList.add(this.options.errorClass)
    if (this.options.scrollTo === true) {
      if (this.options.scrollAnchor instanceof Element) {
        this.options.scrollAnchor.scrollIntoView()
      } else {
        // Scroll to the first error
        const firstElement = this._fields.filter(f => f._isValid === false).shift() || {}
        if (firstElement.element instanceof Element &&
          typeof firstElement.element.scrollIntoView === 'function') {
          firstElement.element.scrollIntoView()
        }
      }
    }

    if (typeof this._onValidation.isInvalid.cb === 'function') {
      this._onValidation.isInvalid.cb()
    }
    if (typeof this._onValidation.isInvalid.message === 'string') {
      this.addMessage(this._onValidation.isInvalid.message, this.options.errorClass)
    }
  }

  return this._isValid
}

VPFieldset.prototype.removeField = function (field) {
  if (!(field instanceof VPField)) {
    throw new Error('[VPFieldset] Field must be an instanceof VPField')
  }

  const index = this._fields.indexOf(field)
  if (index !== -1) {
    this._fields = this._fields.splice(index, 1)
  }
}

VPFieldset.prototype.watchField = function (field) {
  if (!(field instanceof VPField)) {
    throw new Error('Field must be an instance of VPField')
  }

  // TODO: Optimize by tracking state and only revalidating
  // if internal state changes. Currently wasteful
  field.addEventListener('onValidate', (e, isValid) => {
    const valid = this.isValid()
    const emit = this._isValid !== null

    if (emit) {
      this.dispatchEvent(createEvent('onValidate'), valid)
    }
  })
}

VPFieldset.prototype.addField = function (field) {
  if (!(field instanceof VPField)) {
    throw new Error('[VPFieldset] Field must be an instanceof VPField')
  }
  debug('[VPFieldset] Adding field')

  this._fields.push(field)
  if (this.options.watch === true) {
    this.watchField(field)
  }
}

// TODO: Enforce onValidate structure
VPFieldset.prototype.createField = function (el, options, customRules, onValidate) {
  if (!(el instanceof Element)) {
    throw new Error('[VPFieldset] Field Element must be a valid DOMElement.')
  }

  const field = new VPField(el, options, customRules, onValidate)
  this._fields.push(field)
  if (this.options.watch === true) {
    this.watchField(field)
  }

  return field
}

VPFieldset.prototype.findFields = function () {
  const vm = this
  let fields = Array.from(this.element.getElementsByClassName(this.options.fieldClass))

  // TODO: Attribute parsing to fill in the gaps
  this._fields = fields.map(field => {
    const _field = new VPField(field, {})
    if (this.options.watch === true) {
      this.watchField(_field)
    }

    return _field
  })
}


// EventTarget
VPFieldset.prototype.listeners = null
VPFieldset.prototype.addEventListener = events.addEventListener
VPFieldset.prototype.removeEventListener = events.removeEventListener
VPFieldset.prototype.dispatchEvent = events.dispatchEvent

// DOM Messaging
VPFieldset.prototype.clearMessages = messaging.clearMessages
VPFieldset.prototype.removeMessage = messaging.removeMessage
VPFieldset.prototype.addMessage = messaging.addMessage('VPMessage')

export default VPFieldset
