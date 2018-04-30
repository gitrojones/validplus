import VPFieldset from './Fieldset'

const debug = require('./debug')

const Validator = function (form = null) {
  if (form === null) {
    debug('[Validator] Non-strict fieldset matching.',
          'Provide a form Element or ID to enable strict matching.')
    this._form = null
    this._strict = false
  } else {
    this._form = this.ElementOrID(form)
    this._strict = true
  }

  this._strategies = {
    'all': fields => fields.every(field => field === true),
    'some': fields => fields.some(field => field === true),
    'one': fields => fields.filter(field => field === true).length === 1
  }

  // Fieldsets being tracked by Validator
  this._fieldsets = []
}

Validator.prototype.ElementOrID = function (ElorID) {
  if (ElorID instanceof Element) return ElorID
  if (ElorID typeof 'string') {
    let f
    if (this._form === null) {
      f = document.getElementById(ElorID)
    } else {
      f = this._form.getElementById(ElorID)
    }

    if (f instanceof Element) return f
  }

  return null
}

Validator.prototype.isValid = function () {
  return this._fieldsets.every(fieldset => fieldset.isValid())
}

// TODO: Append Predefined Fields w/ CB logic
Validator.prototype.addFieldset = function (fs, options, message = null) {
  let fieldset = this.ElementOrID(fs)
  if (fieldset === null) {
    debug('[Validator] Requires a valid fieldset HTMLElement.')
    return false
  }

  let strategy = this._strategies[options.strategy] || () => debug('[Validator] Invalid Validation Strategy')
  this._fieldsets.push(new VPFieldset(fieldset, strategy, options, message))
}

const removeError = (el, errorMsg) => {
  if (!(el instanceof Element)) {
    debug('[Validator] Element must be an HTMLElement.')
    return
  }

  let errors = Array.from(el.getElementsByClassName('error'))
  errors.forEach(err => {
    if (err.innerHTML === errorMsg) {
      el.removeChild(err)
    }
  })
}

const appendError = (el, msg) => {
  if (!(el instanceof Element)) {
    debug('[Validator] Element must be an HTMLElement.')
    return
  }

  let error = generateError(msg)
  let errors = el.getElementsByClassName('errors')

  if (errors.length === 0) {
    let _errors = generateError('', 'errors')
    _errors.appendChild(error)
    el.appendChild(_errors)
  } else {
    if(Array.from(errors[0].children)
       .every(err => err.innerHTML !== error.innerHTML)) {
      errors[0].appendChild(error)
    }
  }
}

export default Validator
