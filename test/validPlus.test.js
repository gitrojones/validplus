const fs = require('fs')
const path = require('path')

const _ = require('lodash')
const expect = require('chai').expect
const sinon = require('sinon')
const { JSDOM, VirtualConsole } = require('jsdom')
const jsdom = new JSDOM('', {
  includeNodeLocations: true,
  runScripts: 'dangerously'
})

const _ValidPlus = fs.readFileSync(path.resolve(__dirname, '../dist/ValidPlus.js'), 'utf-8')

describe('ValidPlus', function () {
  let DOM
  let virtualConsole
  let ValidPlus

  beforeEach(done => {
    virtualConsole = new VirtualConsole()
    virtualConsole.sendTo(console)

    DOM = new JSDOM('', { runScripts: 'outside-only', virtualConsole })
    DOM.window.eval(_ValidPlus)
    ValidPlus = DOM.window.ValidPlus.default

    done()
  })

  it('Should export "Validator"', function () {
    expect(ValidPlus).to.have.property('Validator')
  })

  describe('ValidPlus.Validator', function () {
    let testForm

    beforeEach(done => {
      testForm = DOM.window.document.createElement('form')
      testForm.className = 'form'

      done()
    })

    describe('Validator Properties', function () {
      it('Validator instance should have properties', function () {
        let validator = new ValidPlus.Validator({})
        expect(validator).to.have.property('addFieldset')
        expect(validator).to.have.property('removeFieldset')
        expect(validator).to.have.property('createFieldset')
        expect(validator).to.have.property('clearMessages')
        expect(validator).to.have.property('removeMessage')
        expect(validator).to.have.property('addMessage')
        expect(validator).to.have.property('isValid')
      })
    })

    it('Validator should mount in passive mode without form Element supplied', function () {
      let validator = new ValidPlus.Validator({})
      expect(validator._strict).to.be.false
    })

    it('Validator should mount in active mode with a form Element supplied', function () {
      let validator = new ValidPlus.Validator({}, testForm)
      expect(validator._strict).to.be.true
    })

    it('Validator should track new fieldsets', function () {
      let validator = new ValidPlus.Validator({}, testForm)
      let testFieldset = DOM.window.document.createElement('div')
      testFieldset.className = 'fieldset'

      let success = validator.createFieldset(testFieldset, 'one', {}, [])

      expect(success).to.not.be.false
      expect(validator._fieldsets.length).to.equal(1)
      expect(validator._fieldsets[0]).to.be.instanceof(ValidPlus.Fieldset)
    })

    it('Validator should allowing adding fieldsets and their fields', function () {
      let validator = new ValidPlus.Validator({}, testForm)
      let testFieldset = DOM.window.document.createElement('div')
      testFieldset.className = 'fieldset'

      let testField = DOM.window.document.createElement('div')
      testField.className = 'VPField'

      testFieldset.append(testField)

      const fieldset = validator.createFieldset(testFieldset, 'all', {}, [
        new ValidPlus.Field(testField, {}, [], {})
      ])

      expect(fieldset._fields.length).to.equal(1)
    })
  })

  describe('ValidPlus.Fieldset', function () {
    let testFieldset

    beforeEach(done => {
      testFieldset = DOM.window.document.createElement('div')
      testFieldset.className = 'fieldset'

      done()
    })

    it('Fieldset should throw an error if missing an element', function () {
      expect(() => new ValidPlus.Fieldset(null, () => null, {})).to.throw()
    })
    it('Fieldset should throw an error if missing a strategy', function () {
      expect(() => new ValidPlus.Fieldset(testFieldset, null, {})).to.throw()
    })
    it('Fieldset should add children fields', function () {
      let testField = DOM.window.document.createElement('div')
      testField.className = 'field'
      testFieldset.append(testField)

      let fieldset = new ValidPlus.Fieldset(testFieldset, () => null, { fieldClass: 'field' })
      fieldset.createField(testField, [], {})

      expect(fieldset._fields.length).to.equal(1)
      expect(fieldset._fields[0]).to.be.instanceof(ValidPlus.Field)
    })

    it('Fieldset should validate', function () {
      let testInput = DOM.window.document.createElement('input')
      testInput.className = 'input'
      let testField = DOM.window.document.createElement('div')
      testField.className = 'VPField'

      testField.append(testInput)
      testFieldset.append(testField)

      let fieldset = new ValidPlus.Fieldset(testFieldset, (a) => a.every(v => v === true), {})
      fieldset.createField(testField, [], {})

      expect(fieldset._fields.length).to.equal(1)
      expect(fieldset.isValid()).to.be.true
    })

    it('Fieldset should validate fields', function () {
      let testField = DOM.window.document.createElement('div')
      testField.className = 'VPField'

      let testInput = DOM.window.document.createElement('input')
      testInput.value = 10
      testInput.setAttribute('type', 'number')
      testInput.setAttribute('min', 1)
      testInput.setAttribute('max', 15)

      testField.append(testInput)
      testFieldset.append(testField)

      let fieldset = new ValidPlus.Fieldset(testFieldset, (a) => a.every(v => v === true), {})
      fieldset.addField(new ValidPlus.Field(testField, {}))

      expect(fieldset._fields.length).to.equal(1)
      expect(fieldset.isValid()).to.be.true
    })

    it('Fieldset should append onValid Message and message should be correct', function () {
      let testField = DOM.window.document.createElement('div')
      testField.className = 'VPField'

      let testInput = DOM.window.document.createElement('input')
      testInput.value = 10
      testInput.setAttribute('type', 'number')
      testInput.setAttribute('min', 1)
      testInput.setAttribute('max', 15)

      testField.append(testInput)
      testFieldset.append(testField)

      let fieldset = new ValidPlus.Fieldset(testFieldset, (a) => a.every(v => v === true), {}, {
        isValid: {
          message: 'Hello, World'
        }
      })
      fieldset.addField(new ValidPlus.Field(testField, {}))

      expect(fieldset.isValid()).to.be.true
      expect(testFieldset.children.length).to.equal(2)
      expect((testFieldset.children)[1].className).to.equal('VPMessages')
      expect((testFieldset.children)[1].children.length).to.equal(1)
      expect(((testFieldset.children)[1].children)[0].className).to.equal('VPMessage -isValid')
      expect(((testFieldset.children)[1].children)[0].innerHTML).to.equal('Hello, World')
    })
  })

  describe('ValidPlus.Field', function () {
    let validator
    let testFieldset
    let testField
    let testInput

    beforeEach(done => {
      testFieldset = DOM.window.document.createElement('div')
      testField = DOM.window.document.createElement('div')
      testField.className = 'field'
      testFieldset.append(testField)

      testInput = DOM.window.document.createElement('input')
      testInput.className = 'input'
      testInput.value = 'Hello, World'
      testField.append(testInput)

      done()
    })

    describe('Fields Properties', function () {
    })

    it('Should listen for changes on input/change by default', function () {
      const spyIsValid = sinon.spy(ValidPlus.Field.prototype, 'isValid')
      let field = new ValidPlus.Field(testField, {}, [], {
        isInvalid: {
          message: 'Hello, World'
        }
      })
      let inputEvent = DOM.window.document.createEvent('Event')
      inputEvent.initEvent('input', false, false)

      testInput.value = 'Foo, Bar'
      testInput.dispatchEvent(inputEvent)

      expect(spyIsValid.calledOnce).to.be.true
    })

    it('Should only validate onBlur w/ dirtyOnBlur', function () {
      const spyIsValid = sinon.spy(ValidPlus.Field.prototype, 'isValid')
      let field = new ValidPlus.Field(testField, {
        dirtyOnBlur: true
      }, [], {
        isInvalid: {
          message: 'Hello, World'
        }
      })

      let inputEvent = DOM.window.document.createEvent('Event')
      let blurEvent = DOM.window.document.createEvent('Event')
      inputEvent.initEvent('input', false, false)
      blurEvent.initEvent('blur', false, false)

      const string = 'FooBar'
      for(let i = 0, l = string.length; i < l; i++) {
        testInput.value = testInput.value + string[i]
        testInput.dispatchEvent(inputEvent)
      }
      expect(field._dirty).to.be.false
      expect(spyIsValid.calledOnce).to.be.false

      testInput.dispatchEvent(blurEvent)
      expect(spyIsValid.calledOnce).to.be.true
      expect(field._dirty).to.be.true
    })
  })
})
