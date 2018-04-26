const debug = function () {
  let env = ((process || {}).env || {}).NODE_ENV || 'production'
  return env === 'development'
    ? (...msg) => console.log('[Debug]', ...msg)
    : () => null
}

const Validator = function (form = null) {
  if (form === null) {
    debug('[Validator] Non-strict fieldset matching. Provide a form Element or ID to enable strict matching.')
    this._form = null
    this._strict = false
  } else {
    this._form = this.ElementOrID(form)
    this._strict = true
  }

  this._rules = {
    'all': fields => fields.every(field => field === true),
    'some': fields => fields.some(field => field === true),
    'one': fields => fields.filter(field => field === true).length === 1
  }

  this._activeErrors = {
    //
    // Errors instanceof FieldsetError
    //
  }
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


// For determining if all fields are valid
Validator.prototype.isValid = function () {
  return this._activeErrors.every(fieldset => fieldset.isValid())
}

// Parse a single field
Validator.prototype.parseField = function (field) {
  if (!(field instanceof Element)) {
    debug('[Validator] Requires a valid HTMLElement.')
  }

  let input
  input = field.getElementsByTagName('input')
  if (!(input instanceof HTMLCollection) || input.length === 0) {
    input = field.getElementsByTagName('select')

    if (!(input instanceof HTMLCollection) || input.length === 0) {
      debug('[Validator] Failed to find a valid field input.', input)
    }
  }

  input = input[0]

  let valid = []
  let attr = input.attributes
  let value = input.value
  let checked = input.checked
  let message = attr.getNamedItem('data-error-message')
  let type = attr.getNamedItem('type')

  let name = attr.getNamedItem('data-name')
  name = name ? name.value
    : attr.getNamedItem('name') ? attr.getNamedItem('name').value
    : input.id

  let rules = {
    min: attr.getNamedItem('min'),
    minLength: attr.getNamedItem('minlength'),
    max: attr.getNamedItem('max'),
    maxLength: attr.getNamedItem('maxlength'),

    pattern: attr.getNamedItem('pattern'),
    required: attr.getNamedItem('required') ? attr.getNamedItem('required').specified : false
  }

  if (rules.min) {
    valid.push(+value >= +rules.min.value
               ? true
               : `${name} must be more than ${rules.min.value}.`)
  }
  if (rules.max) {
    valid.push(+value <= +rules.max.value
               ? true
               : `${name} must be less than ${rules.max.value}.`)
  }
  if (rules.minLength) {
    valid.push(value.length <= +rules.minLength.value
               ? true
               : `${name} must be longer than ${rules.minLength.value} characters.`)
  }
  if (rules.maxLength) {
    valid.push(value.length >= +rules.maxLength.value
               ? true
               : `${name} must be shorter than ${rules.maxLength.value} characters.`)
  }
  if (rules.pattern) {
    valid.push(new RegExp(rules.pattern.value).test(value)
               ? true
               : `${name} is incorrectly formatted.`)
  }

  switch (type) {
  case 'checkbox':
    if (rules.required) {
      valid.push(checked ? true : `${name} is required.`)
    }
    break
  case 'radio':
    // One should always be selected
    valid.push(checked)
    break
  default:
    if (rules.required) {
      valid.push(value.length > 0 ? true : `${name} is required.`)
    }
  }

  let status = valid.every(v => v === true)
    ? true // Return true if all are valid
    : valid.filter(v => v !== true) // Return an array of errors

  if (message && message.length > 0) {
    status = [message]
  }

  return status
}

Validator.prototype.parseFieldset = function (fs, strategy, children = 'field') {
  if (!(fs instanceof Element)) {
    debug('[Validator] Requires a valid HTMLElement.')
  }

  let fields = Array.from(fs.getElementsByClassName(children))
  let status = fields.reduce((status, field) => {
    let v = this.parseField(field)
    if (typeof v === 'boolean') {
      status.push(v)
    } else if (v instanceof Array) {
      status.push(v.map(err => {
        return {
          field,
          message: err
        }
      }))
    }

    return status
  }, [])

  let _strategy = this._rules[strategy] || null
  if (typeof _strategy === 'function') {
    if (_strategy(status)) {
      this.parseErrors(fs, [])
    } else {
      this.parseErrors(fs, status.filter(v => v instanceof Array))
    }
  } else {
    debug('[Validator] Invalid parsing strategy for fieldset.')
  }
}

Validator.prototype.parseErrors = function (fs, newErrors) {
  let _activeErrors = this._activeErrors
  if (!(_activeErrors[fs.id] instanceof Array)) {
    _activeErrors[fs.id] = []
  }

  // Remove all errors from active
  _activeErrors[fs.id].forEach(field => {
    if (!(field instanceof Array)) return

    field.forEach(err => {
      let errors = err.field.getElementsByClassName('errors')
      if (errors.length > 0) {
        err.field.removeChild(errors[0])
      }
    })
  })

  // Reassign Active
  _activeErrors[fs.id] = newErrors

  // Recreate all errors from active
  let keys = ['field', 'message']
  _activeErrors[fs.id].forEach(field => {
    if (!(field instanceof Array)) return

    field.forEach(err => {
      let _keys = Object.keys(err)
      if (_keys.every(k => keys.includes(k))) {
        appendError(err.field, err.message)
      }
    })
  })
}

const generateError = (msg, className = 'error') => {
  let error = document.createElement('div')
  error.className = className
  error.innerHTML = msg

  return error
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
