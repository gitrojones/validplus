import VPField from './Field'

import debug from './lib/debug'
import mergeDeep from './lib/mergeDeep'
import generateElement from './lib/generateElement'

// Options include
// ---------------
// showMessage: <false> - Fieldset level error shown
// noChildren: <false> - No children errors (field level)
// fieldClass: 'field' - Child 'Field' className
//

const VPFieldset = function (element, strategy, options, onValidate = {}) {
  if (!(element instanceof Element)) {
    throw new Error(`[VPFieldset] Valid Element is required.`)
  }
  if (typeof strategy !== 'function') {
    throw new Error('[VPFieldset] Validation strategy passed is invalid.')
  }

  this.strategy = strategy
  this.element = element
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

  this._messageNode = null
  this._messages = []

  this.options = Object.assign({
    showMessage: false,
    showChildren: false,
    fieldClass: 'VPField'
  }, options)

  // this.findFields()
}

VPFieldset.prototype.isValid = function () {
  const fieldSetStatus = this._fields.reduce((status, field, index) => {
    console.log('[VPFieldset] Validating field', index)
    status.push(field.isValid())
    return status
  }, [])

  const isValid = this.strategy(fieldSetStatus)
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
      this.appendMessage(this._onValidation.isInvalid.message, '-isError')
    }
  }

  return isValid
}

VPFieldset.prototype.clearMessages = function () {
  this.element.removeChild(this._messageNode)
}

VPFieldset.prototype.removeMessage = function (message) {
  if (!(this._messageNode instanceof Element)) {
    console.log('[VPFieldset] MessageNode isn\'t set')
    return
  }

  Array.from(this._messageNode.children).forEach(child => {
    if (child.innerHTML === message) {
      this._messageNode.removeChild(child)
    }
  })
}

VPFieldset.prototype.appendMessage = function (message, status) {
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

VPFieldset.prototype.removeField = function (field) {
  if (!(field instanceof VPField)) {
    throw new Error('[VPFieldset] Field must be an instanceof VPField')
  }

  const index = this._fields.indexOf(field)
  if (index !== -1) {
    this._fields = this._fields.splice(index, 1)
  }
}

VPFieldset.prototype.addField = function (field) {
  if (!(field instanceof VPField)) {
    throw new Error('[VPFieldset] Field must be an instanceof VPField')
  }
  console.log('[VPFieldset] Adding field')
  this._fields.push(field)
}

// TODO: Enforce onValidate structure
VPFieldset.prototype.createField = function (el, options, onValidate) {
  if (!(el instanceof Element)) {
    throw new Error('[VPFieldset] Field Element must be a valid DOMElement.')
  }

  this._fields.push(new VPField(el, options, onValidate))
}
VPFieldset.prototype.findFields = function () {
  const vm = this
  let fields = Array.from(this.element.getElementsByClassName(this.options.fieldClass))
  // TODO: Attribute parsing to fill in the gaps
  this._fields = fields.map(field => new VPField(field, {}))
}

export default VPFieldset
