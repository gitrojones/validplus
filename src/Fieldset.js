import VPField from './Field'
import debug from './debug'
import generateError from './genError'

// Options include
// ---------------
// showMessage: <false> - Fieldset level error shown
// noChildren: <false> - No children errors (field level)
// fieldClass: 'field' - Child 'Field' className
//

const VPFieldset = function (element, strategy, options, message = null) {
  if (!(element instanceof Element)) {
    throw new Error(`[Fieldset] Valid Element is required.`)
  }
  if (typeof strategy !== 'function') {
    throw new Error('[Fieldset] Validation strategy passed is invalid.')
  }

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
    status.push(field.validate())
    return status
  }, [])

  // Strategy is expected to return true or false
  this._isValid = this.strategy(fieldSetStatus)
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
  const vm = this
  let fields = Array.from(this.element.getElementsByClassName(this.options.fieldClass))
  this.fields = fields.map(field => new VPField(field, vm.options.showChildren))
  console.log(fields, this.fields)
}

export default VPFieldset
