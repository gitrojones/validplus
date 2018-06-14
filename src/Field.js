const VPField = function (element, showsErrors) {
  this.element = element
  this.showsErrors = showsErrors
  this.errors = []
  this.input = null

  this.getInput()
}

VPField.prototype.getInput = function () {
  let input = this.element.getElementsByTagName('input')
  let select = this.element.getElementsByTagName('select')
  let textarea = this.element.getElementsByTagName('textarea')

  this.input = [].concat(
    Array.from(input),
    Array.from(select),
    Array.from(textarea)
  )[0]
}

VPField.prototype.parseInput = function () {
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

  let status = this.errors.every(v => v === true)
  if (this.showErrors) this.appendErrors(status, message)

  return status
}

VPField.prototype.appendErrors = function (valid, optionalMessage) {
}

export default VPField
