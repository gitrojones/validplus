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
  let Fieldset
  let testForm
  let testFieldset

  beforeEach(done => {
    virtualConsole = new VirtualConsole()
    virtualConsole.sendTo(console)

    DOM = new JSDOM('', { runScripts: 'outside-only', virtualConsole })
    DOM.window.eval(_ValidPlus)
    ValidPlus = DOM.window.ValidPlus.default

    testForm = DOM.window.document.createElement('form')
    testForm.className = 'form'

    testFieldset = DOM.window.document.createElement('div')
    testFieldset.className = 'fieldset'

    done()
  })

  it('Should export "Validator"', function () {
    expect(ValidPlus).to.have.property('Validator')
  })

  describe('ValidPlus.Validator', function () {
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
      let success = validator.addFieldset(testFieldset, { strategy: 'one' })

      expect(success).to.not.be.false
      expect(validator._fieldsets.length).to.equal(1)
      expect(validator._fieldsets[0]).to.be.instanceof(ValidPlus.Fieldset)
    })

    it('Validator Fieldset should find children fields', function () {
      let validator = new ValidPlus.Validator(testForm)
      let testField = DOM.window.document.createElement('div')
      testField.className = 'field'
      testFieldset.append(testField)

      validator.addFieldset(testFieldset, { strategy: 'one' })
      expect(validator._fieldsets[0].fields.length).to.equal(1)
      expect(validator._fieldsets[0].fields[0]).to.be.instanceof(ValidPlus.Field)
    })

    it('Validator should validate fieldsets', function () {
      let validator = new ValidPlus.Validator(testForm)
      validator.addFieldset(testFieldset, { strategy: 'one' })

      expect(validator.isValid()).to.be.true
    })
  })
})
