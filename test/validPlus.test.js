const fs = require('fs')
const path = require('path')

const expect = require('chai').expect
const _ = require('lodash')
const { JSDOM, VirtualConsole } = require('jsdom')
const jsdom = new JSDOM()

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
      it('Validator instance should contain "addFieldset"', function () {
        let validator = new ValidPlus.Validator()
        expect(validator).to.have.property('addFieldset')
      })
    })

    it('Validator should mount in passive mode without form Element supplied', function () {
      let validator = new ValidPlus.Validator()
      expect(validator._strict).to.be.false
    })

    it('Validator should mount in active mode with a form Element supplied', function () {
      let validator = new ValidPlus.Validator(testForm)
      expect(validator._strict).to.be.true
    })

    it('Validator should track new fieldsets', function () {
      let validator = new ValidPlus.Validator(testForm)
      let testFieldset = DOM.window.document.createElement('div')
      testFieldset.className = 'fieldset'

      let success = validator.addFieldset(testFieldset, { strategy: 'one' })

      expect(success).to.not.be.false
      expect(validator._fieldsets.length).to.equal(1)
      expect(validator._fieldsets[0]).to.be.instanceof(ValidPlus.Fieldset)
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
    it('Fieldset should find children fields', function () {
      let testField = DOM.window.document.createElement('div')
      testField.className = 'field'
      testFieldset.append(testField)

      let fieldset = new ValidPlus.Fieldset(testFieldset, () => null, {})
      expect(fieldset.fields.length).to.equal(1)
      expect(fieldset.fields[0]).to.be.instanceof(ValidPlus.Field)
    })

    it('Fieldset should validate', function () {
      let testField = DOM.window.document.createElement('div')
      testField.className = 'field'
      testFieldset.append(testField)

      let testInput = DOM.window.document.createElement('input')
      testInput.className = 'input'
      testField.append(testInput)

      let fieldset = new ValidPlus.Fieldset(testFieldset, (a) => a.every(v => v === true), {})
      expect(fieldset.isValid()).to.be.true
    })

    it('Fieldset should validate fields', function () {
      let testField = DOM.window.document.createElement('div')
      testFieldset.append(testField)
      testFieldset.append(testField)

      let testInput = DOM.window.document.createElement('input')
      testInput.className = 'input'
      testField.append(testInput)
      testField.append(testInput)

      let fieldset = new ValidPlus.Fieldset(testFieldset, (a) => a.every(v => v === true), {})
      expect(fieldset.fields.length).to.equal(2)
      expect(fieldset.isValid()).to.be.true
    })
  })

  describe('ValidPlus.Field', function () {
    let validator
    let testField
    let testInput

    beforeEach(done => {
      validator = new ValidPlus.Validator(testForm)

      testField = DOM.window.document.createElement('div')
      testField.className = 'field'
      testFieldset.append(testField)

      testInput = DOM.window.document.createElement('input')
      testInput.className = 'input'
      testField.append(testInput)

      done()
    })

    describe('Fields Properties', function () {
      it('Field errors returns methods', function () {
      })
    })

  })
})
