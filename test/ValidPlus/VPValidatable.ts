import { VPValidator } from '../../src/Validator'
import { VPFieldset } from '../../src/Fieldset'
import { VPField } from '../../src/Field'
import { BasicEventTarget } from '../../src/interfaces/events/BasicEventTarget'

const ValidPlus = require('validplus').default
const { describe, it, beforeEach } = require('mocha')
const { expect } = require('chai')

export const VPValidatable = function () {
  describe('DOMMessaging', function () {
    let validatable: Array<BasicEventTarget>
    let validator: VPValidator
    let fieldset: VPFieldset
    let field: VPField

    let elValidator: HTMLFormElement
    let elFieldset: HTMLElement
    let elField: HTMLElement
    let elInput: HTMLInputElement

    beforeEach(async () => {
      elValidator = window.document.createElement('form')
      elFieldset = window.document.createElement('div')
      elField = window.document.createElement('div')
      elInput = window.document.createElement('input')
      elField.appendChild(elInput)

      validator = new ValidPlus.Validator({
        ValidateVisible: false
      }, elValidator)
      fieldset = new ValidPlus.Fieldset(elFieldset, 'all', {})
      field = new ValidPlus.Field(elField, {}, [])

      validatable = [
        validator,
        fieldset,
        field
      ]
    })

    it('Implements AddEventListener', function () {
      // tslint:disable-next-line:no-unused-expression
      expect(validatable.every((v) => typeof v.addEventListener === 'function')).to.be.true
    })

    it('AddEventListener adds a listener to the listener property', function () {
      const func = () => null

      validatable.forEach((v) => {
        v.addEventListener('click', func)
      })

      // tslint:disable-next-line:no-unused-expression
      expect(validatable.every((v) => v.$listeners.click[0] === func)).to.be.true
    })

    it('Implements RemoveEventListener', function () {
      // tslint:disable-next-line:no-unused-expression
      expect(validatable.every((v) => typeof v.removeEventListener === 'function')).to.be.true
    })

    it('RemoveEventListener removes a listener on the listener property', function () {
      const func = () => null

      validatable.forEach((v) => {
        v.addEventListener('click', func)
        v.removeEventListener('click', func)
      })
      // tslint:disable-next-line:no-unused-expression
      expect(validatable.every((v) => v.$listeners.click.length === 0)).to.be.true
    })

    it('Remove Fieldset removes EventListener on the listener property', function () {
      const generateFields = () => [
        new ValidPlus.Field(elField, new ValidPlus.Field.Options({
          InputRules: {
            required: true
          }
        }))
      ]
      const createFieldset = () => validator.createFieldset(elFieldset, 'all',
        new ValidPlus.Fieldset.Options({
          ValidateVisible: false,
          Lifecycle: {
            Invalid: {
              Message: 'Invalid'
            },
            Valid: {
              Message: 'Valid'
            }
          }
        }), generateFields())

      let fieldsetFromValidator = createFieldset()
      validator.removeFieldset(fieldsetFromValidator)

      expect(fieldsetFromValidator.$listeners.onValidate.length).to.eq(0)

      fieldsetFromValidator = createFieldset()
      validator.isValid()
      expect(elFieldset.querySelectorAll('.-isValid').length).to.eq(1)
    })

    it('Implements DispatchEvent', function () {
      // tslint:disable-next-line:no-unused-expression
      expect(validatable.every((v) => typeof v.dispatchEvent === 'function')).to.be.true
    })

    it('DispatchEvent fires an event upwards', function (done: (err?: any) => void) {
      let count = 0
      validatable.forEach((v) => {
        v.addEventListener('click', function () {
          // tslint:disable-next-line:no-unused-expression
          expect(true).to.be.true
          count++

          if (count === 3) done()
        })
      })

      validatable.every((v) => {
        const event = v.createEvent('click')
        return v.dispatchEvent(event, {}) || false
      })
    })

    it('Implements CreateEvent Helper', function () {
      // tslint:disable-next-line:no-unused-expression
      expect(validatable.every((v) => typeof v.createEvent === 'function')).to.be.true
    })

    it('No message node if missing anchor', function () {
      const validator = new ValidPlus.Validator({})
      // tslint:disable-next-line:no-unused-expression
      expect(validator.$MessageNode).to.be.null
    })

    it('Does not throw if anchor is deferred', function () {
      expect(() => {
        validatable = new ValidPlus.Validator({
          DeferredMessageAnchor: true
        })
      }).to.not.throw('anchor must be an HTMLElement')
    })
  })

  describe('Validatable Lifecycle', function () {
    it('Should append Message if Valid/Invalid')
    it('Should append Call CB if Valid/Invalid')
    it('Should append ValidClass/ErrorClass on Valid/Invalid')
    it('Should pass instance to CB')

    it('Should Accept Lifecycle in options w/o LifeCycle prop')
    it('Should Accept Lifecycle in LifeCycle prop, w/o options')
    it('Should prioritize Lifecycle in options over LifeCycle prop')
  })
}
