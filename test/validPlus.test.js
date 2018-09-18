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


    it('Validator should lazy evaluate fieldset validness byDefault', function () {
      let validator = new ValidPlus.Validator({
        validateVisible: false
      }, testForm)
      let testFieldset = DOM.window.document.createElement('div')
      let testFieldsetTwo = DOM.window.document.createElement('div')
      testFieldset.className = 'fieldset'
      testFieldsetTwo.className = 'fieldsetTwo'

      let testField = DOM.window.document.createElement('div')
      let testFieldTwo = DOM.window.document.createElement('div')
      testField.className = 'VPField'
      testFieldTwo.className = 'VPField'

      let testInput = DOM.window.document.createElement('input')
      let testInputTwo = DOM.window.document.createElement('input')
      testInput.setAttribute('required', true)
      testInputTwo.setAttribute('required', true)

      testField.append(testInput)
      testFieldTwo.append(testInputTwo)

      testFieldset.append(testField)
      testFieldsetTwo.append(testFieldTwo)

      const fieldset = validator.createFieldset(testFieldset, 'all', {
        validateVisible: false
      }, [
        new ValidPlus.Field(testField, { }, [], {}),
      ])
      const fieldsetTwo = validator.createFieldset(testFieldsetTwo, 'all', {
        validateVisible: false
      }, [
        new ValidPlus.Field(testFieldTwo, { }, [], {}),
      ])

      expect(validator.isValid()).to.be.false
      expect(fieldset._isValid).to.be.false
      expect(fieldsetTwo._isValid).to.equal(null)
    })

    it('Validator should evaluate all fieldsets with lazy off', function () {
      let validator = new ValidPlus.Validator({
        lazy: false,
        validateVisible: false
      }, testForm)
      let testFieldset = DOM.window.document.createElement('div')
      let testFieldsetTwo = DOM.window.document.createElement('div')
      testFieldset.className = 'fieldset'
      testFieldsetTwo.className = 'fieldsetTwo'

      let testField = DOM.window.document.createElement('div')
      let testFieldTwo = DOM.window.document.createElement('div')
      testField.className = 'VPField'
      testFieldTwo.className = 'VPField'

      let testInput = DOM.window.document.createElement('input')
      let testInputTwo = DOM.window.document.createElement('input')
      testInput.setAttribute('required', true)
      testInputTwo.setAttribute('required', true)

      testField.append(testInput)
      testFieldTwo.append(testInputTwo)

      testFieldset.append(testField)
      testFieldsetTwo.append(testFieldTwo)

      const fieldset = validator.createFieldset(testFieldset, 'all', {
        validateVisible: false
      }, [
        new ValidPlus.Field(testField, { }, [], {}),
      ])
      const fieldsetTwo = validator.createFieldset(testFieldsetTwo, 'all', {
        validateVisible: false
      }, [
        new ValidPlus.Field(testFieldTwo, { }, [], {}),
      ])

      expect(validator.isValid()).to.be.false
      expect(fieldset._isValid).to.be.false
      expect(fieldsetTwo._isValid).to.be.false
    })

    // TODO: Implement Cypress E2E testing for visual
    it('Validator should ignore hidden fieldsets by default')
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

    describe('Fields Default Validation Types', function () {
      it('Should validate required (standard)', function () {
        testInput.setAttribute('required', true)
        testInput.value = null
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Hello, World'
          }
        })

        expect(field.isValid()).to.be.false
        testInput.value = 'hello'
        expect(field.isValid()).to.be.true
      })

      it ('Should validate required (radio)', function () {
        testFieldsetTwo = DOM.window.document.createElement('div')
        testFieldTwo = DOM.window.document.createElement('div')
        testFieldTwo.className = 'field'
        testFieldsetTwo.append(testField)

        testInputTwo = DOM.window.document.createElement('input')
        testInputTwo.className = 'input'
        testInputTwo.value = 'Hello, World'
        testInputTwo.setAttribute('type', 'radio')
        testFieldTwo.append(testInputTwo)

        testInput.setAttribute('type', 'radio')
        testInput.setAttribute('required', true)
        testInput.checked = false
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Foo'
          }
        })

        let fieldTwo = new ValidPlus.Field(testFieldTwo, {}, [], {
          isInvalid: {
            message: 'Bar'
          }
        })

        expect(fieldTwo.isValid()).to.be.true
        expect(field.isValid()).to.be.false

        testInputTwo.checked = false
        testInput.checked = true

        // Radio is always valid if not required
        // Else it is checked/!checked as usual
        expect(fieldTwo.isValid()).to.be.true
        expect(field.isValid()).to.be.true
      })

      it('Should validate min', function () {
        testInput.setAttribute('min', 5)
        testInput.value = 3
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Hello, World'
          }
        })

        expect(field.isValid()).to.be.false
        testInput.value = 6
        expect(field.isValid()).to.be.true
      })
      it('Should validate max', function () {
        testInput.setAttribute('max', 5)
        testInput.value = 3
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Hello, World'
          }
        })

        expect(field.isValid()).to.be.true
        testInput.value = 6
        expect(field.isValid()).to.be.false
      })
      it('Should validate maxLength', function () {
        testInput.setAttribute('maxlength', 5)
        testInput.value = 'hello'
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Hello, World'
          }
        })

        expect(field.isValid()).to.be.true
        testInput.value = ''
        expect(field.isValid()).to.be.true
        testInput.value = 'hello world'
        expect(field.isValid()).to.be.false
      })
      it('Should validate minLength', function () {
        testInput.setAttribute('minlength', 5)
        testInput.value = 'hello'
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Hello, World'
          }
        })

        expect(field.isValid()).to.be.true
        testInput.value = ''
        expect(field.isValid()).to.be.false
        testInput.value = 'hello world'
        expect(field.isValid()).to.be.true
      })
      it('Should validate pattern', function () {
        testInput.setAttribute('pattern', '[0-9]{5}')
        testInput.value = 'hello'
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Hello, World'
          }
        })

        expect(field.isValid()).to.be.false
        testInput.value = 1245
        expect(field.isValid()).to.be.false
        testInput.value = '12345'
        expect(field.isValid()).to.be.true
      })
    })

    describe('Validate programmically', function () {
      it('Should validate required', function () {
        testInput.value = null
        let field = new ValidPlus.Field(testField, {
          rules: {
            required: true
          },
        }, [], {
          isInvalid: {
            message: 'Hello, World'
          }
        })

        expect(field.isValid()).to.be.false
        testInput.value = 'hello'
        expect(field.isValid()).to.be.true
      })

      it('Should validate min', function () {
        testInput.value = 3
        let field = new ValidPlus.Field(testField, {
          rules: {
            min: 5
          },
        }, [], {
          isInvalid: {
            message: 'Hello, World'
          }
        })

        expect(field.isValid()).to.be.false
        testInput.value = 6
        expect(field.isValid()).to.be.true
      })
      it('Should validate max', function () {
        testInput.value = 3
        let field = new ValidPlus.Field(testField, {
          rules: {
            max: 5
          }
        }, [], {
          isInvalid: {
            message: 'Hello, World'
          }
        })

        expect(field.isValid()).to.be.true
        testInput.value = 6
        expect(field.isValid()).to.be.false
      })
      it('Should validate maxLength', function () {
        testInput.value = 'hello'
        let field = new ValidPlus.Field(testField, {
          rules: {
            maxLength: 5
          }
        }, [], {
          isInvalid: {
            message: 'Hello, World'
          }
        })

        expect(field.isValid()).to.be.true
        testInput.value = ''
        expect(field.isValid()).to.be.true
        testInput.value = 'hello world'
        expect(field.isValid()).to.be.false
      })
      it('Should validate minLength', function () {
        testInput.value = 'hello'
        let field = new ValidPlus.Field(testField, {
          rules: {
            minLength: 5
          }
        }, [], {
          isInvalid: {
            message: 'Hello, World'
          }
        })

        expect(field.isValid()).to.be.true
        testInput.value = ''
        expect(field.isValid()).to.be.false
        testInput.value = 'hello world'
        expect(field.isValid()).to.be.true
      })
      it('Should validate pattern', function () {
        testInput.value = 'hello'
        let field = new ValidPlus.Field(testField, {
          rules: {
            pattern: /[0-9]{5}/
          }
        }, [], {
          isInvalid: {
            message: 'Hello, World'
          }
        })

        expect(field.isValid()).to.be.false
        testInput.value = 1245
        expect(field.isValid()).to.be.false
        testInput.value = '12345'
        expect(field.isValid()).to.be.true
      })
    })


    it('Should validate rules over attribute if force is set', function () {
      testInput.setAttribute('maxlength', 3)
      testInput.value = 'hello'
      let field = new ValidPlus.Field(testField, {
        rules: {
          maxLength: 5
        }
      }, [], {
        isInvalid: {
          message: 'Hello, World'
        }
      })

      expect(field.isValid()).to.be.false
      field.options.forceRules = true
      expect(field.isValid()).to.be.true
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

    it('Should fire update events on pre/post formatters', function () {
      let inputEvent = DOM.window.document.createEvent('Event')
      inputEvent.initEvent('input', false, false)

      let field = new ValidPlus.Field(testField, {
        formatter: {
          pre: (input) => {
            input.value = 'Foo Bar'
            input.dispatchEvent(inputEvent)
          }
        }
      }, [], {
        isInvalid: {
          message: 'Hello, World'
        }
      })

      let inputSpy = sinon.spy(field.input, 'dispatchEvent')

      field.isValid()
      expect(testInput.value).to.equal('Foo Bar')
      expect(inputSpy.called).to.be.true
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

    it('Should accept vp-params to toggle options', function () {
      testField.setAttribute('vp-dirty', true)
      testField.setAttribute('vp-blur', false)
      testField.setAttribute('vp-watch', false)

      let field = new ValidPlus.Field(testField, {
      }, [], {
        isInvalid: {
          message: 'Foo'
        }
      })

      expect(field.options.dirtyOnBlur).to.be.true
      expect(field.options.validateOnBlur).to.be.false
      expect(field.options.watch).to.be.false
    })

    it('Should validate input based on pattern attribute', function () {
      const spyIsValid = sinon.spy(ValidPlus.Field.prototype, 'isValid')
      testInput.setAttribute('pattern', '[0-9]{5}')

      let field = new ValidPlus.Field(testField, { }, [], {
        isInvalid: {
          message: 'Hello, World'
        }
      })

      let inputEvent = DOM.window.document.createEvent('Event')
      inputEvent.initEvent('input', false, false)

      testInput.value = 'notanumber'
      testInput.dispatchEvent(inputEvent)
      expect(field._isValid).to.be.false

      testInput.value = '09101'
      testInput.dispatchEvent(inputEvent)
      expect(field._isValid).to.be.true

      testInput.value = '00'
      testInput.dispatchEvent(inputEvent)
      expect(field._isValid).to.be.false
    })
  })
})
