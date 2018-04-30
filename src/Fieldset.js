import VPField from './Field'

const debug = require('./debug')
const generateError = require('./genError')

// Options include
// ---------------
// showMessage: <false> - Fieldset level error shown
// noChildren: <false> - No children errors (field level)
// fieldClass: 'field' - Child 'Field' className
//

const VPFieldset = function (element, strategy, options, message = null) {
  if (!(element instanceof Element)) {
    debug(`[Fieldset] Valid Element is required.`)
    return null
  }

  if (typeof strategy !== 'function') debug('[Fieldset] Validation strategy passed is invalid.')
  this.strategy = strategy
  this.element = element
  this.message = message
  this.fields = []

  this.error = null
  this._isValid = true

  this.options = Object.assign({
    showMessage: false,
    showChildren: false,
    fieldClass: 'field'
  }, options, {
    showMessage: options.showMessage === true
      ? typeof message === 'string' ? true : false : false,
  })

  this.findFields()
}

VPFieldset.prototype.isValid = function () {
  this.validate()
  return this._isValid
}

VPFieldset.prototype.validate = function () {
  let fieldSetStatus = this.fields.reduce((status, field) => {
    let fieldStatus = field.validate()
    status.push(fieldStatus)

    return status
  }, [])

  // Strategy is expected to return true or false
  this._isValid = this.options.strategy(fieldSetStatus)
  if (this.options.showMessage) this.appendError(this._isValid)
}

VPFieldset.prototype.appendError = function (valid) {
  if (valid) {
    if (this.error === null) return

    this.element.removeChild(this.error)
  } else {
    let errors = generateError('', 'errors')
    errors.appendChild(generateError(this.message))

    this.element.appendChild(errors)
    this.error = errors
  }
}

VPFieldset.prototype.findFields = function () {
  this.fields = Array.from(this.element.getElementsByClassName(this.options.fieldClass))
    .map(field => {
      return new VPField(field, this.options.showChildren)
    })
}
