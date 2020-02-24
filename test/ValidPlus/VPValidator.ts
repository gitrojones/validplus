const ValidPlus = require('validplus').default
const { describe, it, beforeEach } = require('mocha')
const { expect } = require('chai')

export const VPValidator = function () {
  let testForm: HTMLFormElement

  beforeEach(async () => {
    testForm = window.document.createElement('form')
  })

  describe('Validator Properties', function () {
    it('Validator instance should have properties', function () {
      const required = [
        'addFieldset',
        'removeFieldset',
        'clearMessages',
        'removeMessage',
        'addMessage',
        'isValid'
      ]

      let validator = new ValidPlus.Validator({}, testForm)
      required.forEach((property) => expect(validator).to.have.property(property))
    })
  })

  it('Validator should track new fieldsets', function () {
    let validator = new ValidPlus.Validator({}, testForm)
    let testFieldset = window.document.createElement('div')
    testFieldset.className = 'fieldset'

    let success = new ValidPlus.Fieldset(testFieldset, 'one', {})
    validator.addFieldset(success)

    // tslint:disable-next-line:no-unused-expression
    expect(success).to.not.be.false
    expect(validator.$fieldsets.length).to.equal(1)
    expect(validator.$fieldsets[0]).to.be.instanceof(ValidPlus.Fieldset)
  })

  it('Validator should allow adding fieldsets and their fields', function () {
    let validator = new ValidPlus.Validator({}, testForm)
    let testFieldset = window.document.createElement('div')
    testFieldset.className = 'fieldset'

    let testField = window.document.createElement('div')
    let testFieldInput = window.document.createElement('input')
    testField.appendChild(testFieldInput)
    testField.className = 'VPField'

    testFieldset.append(testField)

    const fieldset = new ValidPlus.Fieldset(testFieldset, 'all', {})
    const field = new ValidPlus.Field(testField, {}, [])
    fieldset.addField(field)

    validator.addFieldset(fieldset)
    expect(fieldset.$fields.length).to.equal(1)
  })

  it('Validator should lazy evaluate fieldset validness byDefault', function () {
    let validator = new ValidPlus.Validator({
      ValidateVisible: false,
      ScrollTo: false
    }, testForm)

    let testFieldset = window.document.createElement('div')
    let testFieldsetTwo = window.document.createElement('div')
    testFieldset.className = 'fieldset'
    testFieldsetTwo.className = 'fieldsetTwo'

    let testField = window.document.createElement('div')
    let testFieldTwo = window.document.createElement('div')
    testField.className = 'VPField'
    testFieldTwo.className = 'VPField'

    let testInput = window.document.createElement('input')
    let testInputTwo = window.document.createElement('input')
    testInput.setAttribute('required', 'true')
    testInputTwo.setAttribute('required', 'true')

    testField.append(testInput)
    testFieldTwo.append(testInputTwo)

    testFieldset.append(testField)
    testFieldsetTwo.append(testFieldTwo)

    const field = new ValidPlus.Field(testField, {}, [])
    const fieldset = validator.createFieldset(testFieldset, 'all', {
      ValidateVisible: false,
      ScrollTo: false
    }, [field])

    const fieldTwo = new ValidPlus.Field(testFieldTwo, {}, [])
    const fieldsetTwo = validator.createFieldset(testFieldsetTwo, 'all', {
      ValidateVisible: false,
      ScrollTo: false
    }, [fieldTwo])

    expect(validator.isValid()).to.be.false
    expect(fieldset.$isValid).to.be.false
    expect(fieldsetTwo.$isValid).to.equal(null)
  })

  it('Validator should async evaluate w/ lazy if basic true', function (done: (err?: any) => void) {
    let validator = new ValidPlus.Validator({
      ValidateVisible: false,
      ScrollTo: false
    }, testForm)

    let testFieldset = window.document.createElement('div')
    testFieldset.className = 'fieldset'

    let testField = window.document.createElement('div')
    testField.className = 'VPField'

    let testInput = window.document.createElement('input')
    testInput.setAttribute('required', 'true')
    testInput.value = 'test'
    testField.append(testInput)
    testFieldset.append(testField)

    const field = new ValidPlus.Field(testField, {}, [
      () => new Promise((resolve) => resolve(false))
    ])
    const fieldset = validator.createFieldset(testFieldset, 'all', {
      ValidateVisible: false,
      ScrollTo: false
    }, [ field ])

    expect(validator.isValid()).to.eventually.be.false.notify(done)
    expect(fieldset.isValid()).to.eventually.be.false
  })

  it('Validator should sync evaluate w/ lazy if basic false', function () {
    let validator = new ValidPlus.Validator({
      ValidateVisible: false,
      ScrollTo: false
    }, testForm)

    let testFieldset = window.document.createElement('div')
    testFieldset.className = 'fieldset'

    let testField = window.document.createElement('div')
    testField.className = 'VPField'

    let testInput = window.document.createElement('input')
    testInput.setAttribute('required', 'true')
    testField.append(testInput)
    testFieldset.append(testField)

    const field = new ValidPlus.Field(testField, {} , [
      async () => false
    ])
    const fieldset = validator.createFieldset(testFieldset, 'all', {
      ValidateVisible: false,
      ScrollTo: false
    }, [ field ])

    expect(validator.isValid()).to.be.false
    expect(fieldset.isValid()).to.be.false
  })

  it('Validator should evaluate all fieldsets with lazy off', function () {
    let validator = new ValidPlus.Validator({
      ValidateLazy: false,
      ValidateVisible: false
    }, testForm)

    let testFieldset = window.document.createElement('div')
    let testFieldsetTwo = window.document.createElement('div')
    testFieldset.className = 'fieldset'
    testFieldsetTwo.className = 'fieldsetTwo'

    let testField = window.document.createElement('div')
    let testFieldTwo = window.document.createElement('div')
    testField.className = 'VPField'
    testFieldTwo.className = 'VPField'

    let testInput = window.document.createElement('input')
    let testInputTwo = window.document.createElement('input')
    testInput.setAttribute('required', 'true')
    testInputTwo.setAttribute('required', 'true')

    testField.append(testInput)
    testFieldTwo.append(testInputTwo)

    testFieldset.append(testField)
    testFieldsetTwo.append(testFieldTwo)

    const field = new ValidPlus.Field(testField, {}, [])
    const fieldset = validator.createFieldset(testFieldset, 'all', {
      ValidateVisible: false
    }, [ field ])

    const fieldTwo = new ValidPlus.Field(testFieldTwo, {}, [])
    const fieldsetTwo = validator.createFieldset(testFieldsetTwo, 'all', {
      ValidateVisible: false
    }, [ fieldTwo ])

    expect(validator.isValid()).to.be.false
    expect(fieldset.$isValid).to.be.false
    expect(fieldsetTwo.$isValid).to.be.false
  })

  // TODO: Implement Cypress E2E testing for visual
  it('Validator should ignore hidden fieldsets by default');

  describe('Validator Error Handling', function () {
    it('Should append the errorClass on invalid', function () {
      const MockFieldset = { isValid: () => false, element: {}, $options: { Watch: true } }
      const validator = new ValidPlus.Validator({
        ScrollTo: false,
        ValidateVisible: false
      }, testForm)
      validator.$fieldsets.push(MockFieldset)

      expect(validator.isValid()).to.be.false
      expect(testForm.classList.contains('-isError')).to.be.true
    })

    it('Should append the validClass on valid', function () {
      const validator = new ValidPlus.Validator({}, testForm)
      expect(validator.isValid()).to.be.true
      expect(testForm.classList.contains('-isValid')).to.be.true
    })

    it('Should append a custom options.errorClass on invalid', function () {
      const errorClass = '-helloWorld'
      const MockFieldset = { isValid: () => false, element: {}, $options: { Watch: true } }
      const validator = new ValidPlus.Validator({
        ErrorClassName: errorClass,
        ScrollTo: false, // ScrollTo expects a element, which we don't have (mocked)
        ValidateVisible: false
      }, testForm)
      validator.$fieldsets.push(MockFieldset)

      expect(validator.isValid()).to.be.false
      expect(testForm.classList.contains(errorClass)).to.be.true
    })

    it('Should append a custom options.validClass on valid', function () {
      const validClass = '-fooBar'
      const validator = new ValidPlus.Validator({
        ValidClassName: validClass
      }, testForm)

      expect(validator.isValid()).to.be.true
      expect(testForm.classList.contains(validClass)).to.be.true
    })
  })
}
