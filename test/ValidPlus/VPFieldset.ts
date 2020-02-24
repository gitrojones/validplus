const ValidPlus = require('validplus').default
const { describe, it, beforeEach } = require('mocha')
const { expect } = require('chai')

export const VPFieldset = function () {
  let testFieldset: HTMLElement

  beforeEach((done: (err?: any) => void) => {
    testFieldset = window.document.createElement('div')
    testFieldset.className = 'fieldset'

    done()
  })

  describe('Fieldset Error Handling', function () {
    let testFieldset: HTMLElement
    let testField: HTMLElement
    let testInput: HTMLInputElement

    beforeEach(() => {
      testFieldset = window.document.createElement('div')
      testField = window.document.createElement('div')
      testField.className = 'field'
      testFieldset.append(testField)

      testInput = window.document.createElement('input')
      testInput.className = 'input'
      testInput.value = 'Hello, World'
      testField.append(testInput)
    })

    it('Should append the errorClass on invalid fieldset', function () {
      testInput.value = ''
      testInput.setAttribute('required', 'true')
      let field = new ValidPlus.Field(testField, {}, [])
      let fieldset = new ValidPlus.Fieldset(testFieldset, 'all', {
        ValidateVisible: false
      })
      fieldset.addField(field)

      expect(fieldset.isValid()).to.be.false
      expect(testFieldset.classList.contains('-isError')).to.be.true
    })

    it('Should append the validClass on valid fields/inputs', function () {
      testInput.value = 'hello'
      testInput.setAttribute('required', 'true')
      let field = new ValidPlus.Field(testField, {}, [])
      let fieldset = new ValidPlus.Fieldset(testFieldset, 'all', {
        ValidateVisible: false
      })
      fieldset.addField(field)

      expect(fieldset.isValid()).to.be.true
      expect(testFieldset.classList.contains('-isValid')).to.be.true
    })

    it('Should allow for custom errorClass', function () {
      const errorClass = '-fooBar'
      testInput.value = ''
      testInput.setAttribute('required', 'true')
      let field = new ValidPlus.Field(testField, {}, [])
      let fieldset = new ValidPlus.Fieldset(testFieldset, 'all', {
        ErrorClassName: errorClass,
        ValidateVisible: false
      })
      fieldset.addField(field)

      expect(fieldset.isValid()).to.be.false
      expect(testFieldset.classList.contains(errorClass)).to.be.true
    })

    it('Should allow for custom validClass', function () {
      const validClass = '-helloWorld'
      testInput.value = 'hello'
      testInput.setAttribute('required', 'true')
      let field = new ValidPlus.Field(testField, {}, [])
      let fieldset = new ValidPlus.Fieldset(testFieldset, 'all', {
        ValidClassName: validClass,
        ValidateVisible: false
      })
      fieldset.addField(field)

      expect(fieldset.isValid()).to.be.true
      expect(testFieldset.classList.contains(validClass)).to.be.true
    })
  })

  it('Fieldset should throw an error if missing an element', function () {
    expect(() => new ValidPlus.Fieldset(null, () => null, {})).to.throw()
  })

  it('Fieldset should throw an error if missing a strategy', function () {
    expect(() => new ValidPlus.Fieldset(testFieldset, null, {})).to.throw()
  })

  it('Fieldset should add children fields', function () {
    let testField = window.document.createElement('div')
    let testFieldInput = window.document.createElement('textarea')
    testField.appendChild(testFieldInput)
    testField.className = 'field'
    testFieldset.append(testField)

    let fieldset = new ValidPlus.Fieldset(testFieldset, () => null, {
      fieldClass: 'field'
    })
    fieldset.createField(testField, [], [])

    expect(fieldset.$fields.length).to.equal(1)
    expect(fieldset.$fields[0]).to.be.instanceof(ValidPlus.Field)
  })

  it('Fieldset should validate', function () {
    let testInput = window.document.createElement('input')
    testInput.className = 'input'
    let testField = window.document.createElement('div')
    testField.className = 'VPField'

    testField.append(testInput)
    testFieldset.append(testField)

    let fieldset = new ValidPlus.Fieldset(testFieldset, (a: boolean[]) => a.every((v) => v === true), {})
    fieldset.createField(testField, [], [])

    expect(fieldset.$fields.length).to.equal(1)
    expect(fieldset.isValid()).to.be.true
  })

  it('Fieldset should validate fields', function () {
    let testField = window.document.createElement('div')
    testField.className = 'VPField'

    let testInput = window.document.createElement('input')
    testInput.value = '10'
    testInput.setAttribute('type', 'number')
    testInput.setAttribute('min', '1')
    testInput.setAttribute('max', '15')

    testField.append(testInput)
    testFieldset.append(testField)

    let fieldset = new ValidPlus.Fieldset(testFieldset, (a: boolean[]) => a.every((v) => v === true), {})
    fieldset.addField(new ValidPlus.Field(testField, {}))

    expect(fieldset.$fields.length).to.equal(1)
    expect(fieldset.isValid()).to.be.true
  })

  it('Fieldset should validate radio', function () {
    let testField = window.document.createElement('div')
    let testFieldTwo = window.document.createElement('div')
    testFieldTwo.className = 'field'
    testField.className = 'field'
    testFieldset.append(testField)
    testFieldset.append(testFieldTwo)

    let testInputTwo = window.document.createElement('input')
    let testInput = window.document.createElement('input')
    testInputTwo.className = 'input'
    testInputTwo.value = 'Hello, World'
    testInputTwo.checked = true
    testInputTwo.setAttribute('type', 'radio')
    testInputTwo.setAttribute('required', 'true')
    testFieldTwo.append(testInputTwo)

    testInput.setAttribute('type', 'radio')
    testInput.setAttribute('required', 'true')
    testInput.value = 'foo'
    testInput.checked = false
    testField.append(testInput)

    let validator = new ValidPlus.Fieldset(testFieldset, 'one', {
      FieldClass: 'field',
      ValidateVisible: false
    })
    validator.findFields()

    expect(validator.isValid()).to.be.true
    expect(validator.$fields[0].$valid).to.be.false
    expect(validator.$fields[1].$valid).to.be.true

    testInputTwo.checked = false
    testInput.checked = true

    expect(validator.isValid()).to.be.true
    expect(validator.$fields[0].$valid).to.be.true
    expect(validator.$fields[1].$valid).to.be.false

    testInputTwo.checked = false
    testInput.checked = false

    expect(validator.isValid()).to.be.false
    expect(validator.$fields[0].$valid).to.be.false
    expect(validator.$fields[1].$valid).to.be.false

    testInputTwo.checked = true
    testInput.checked = true

    expect(validator.isValid()).to.be.false
    expect(validator.$fields[0].$valid).to.be.true
    expect(validator.$fields[1].$valid).to.be.true
  })

  it('Fieldset should append onValid Message and message should be correct', function () {
    let testField = window.document.createElement('div')
    testField.className = 'VPField'

    let testInput = window.document.createElement('input')
    testInput.value = '10'
    testInput.setAttribute('type', 'number')
    testInput.setAttribute('min', '1')
    testInput.setAttribute('max', '15')

    testField.append(testInput)
    testFieldset.append(testField)

    let fieldset = new ValidPlus.Fieldset(testFieldset, 'all', {}, {
      Valid: {
        Message: 'Hello, World'
      }
    })
    fieldset.addField(new ValidPlus.Field(testField, {}))

    expect(fieldset.isValid()).to.be.true
    expect(testFieldset.children.length).to.equal(2)
    expect(testFieldset.children[1].className).to.equal('VPMessages')
    expect(testFieldset.children[1].children.length).to.equal(1)
    expect(testFieldset.children[1].children[0].className).to.equal('VPMessage -isValid')
    expect(testFieldset.children[1].children[0].innerHTML).to.equal('Hello, World')
  })

  describe('Fieldset Lifecycle', function () {
    it('Should append Message if Valid/Invalid')
    it('Should append Call CB if Valid/Invalid')
    it('Should pass instance to CB')

    it('Should Accept Lifecycle in options w/o LifeCycle prop', function () {
      let field = new ValidPlus.Fieldset(testFieldset, 'all', {
        Lifecycle: {
          Invalid: {
            Message: 'Foo'
          },
          Valid: {
            Message: 'Bar'
          }
        }
      })

      expect(field.$options.Lifecycle.Invalid.Message).to.equal('Foo')
      expect(field.$options.Lifecycle.Valid.Message).to.equal('Bar')
    })

    it('Should Accept Lifecycle in LifeCycle prop, w/o options', function () {
      let field = new ValidPlus.Fieldset(testFieldset, 'all', {}, {
        Invalid: {
          Message: 'Foo'
        },
        Valid: {
          Message: 'Bar'
        }
      })

      expect(field.$options.Lifecycle.Invalid.Message).to.equal('Foo')
      expect(field.$options.Lifecycle.Valid.Message).to.equal('Bar')
    })

        // TODO: Lifecycle prop to be deprecated
    it('Should prioritize Lifecycle prop over options', function () {
      let field = new ValidPlus.Fieldset(testFieldset, 'all', {
        Lifecycle: {
          Invalid: {
            Message: 'Baz'
          },
          Valid: {
            Message: 'Bing'
          }
        }
      }, {
        Invalid: {
          Message: 'Foo'
        },
        Valid: {
          Message: 'Bar'
        }
      })

      expect(field.$options.Lifecycle.Invalid.Message).to.equal('Foo')
      expect(field.$options.Lifecycle.Valid.Message).to.equal('Bar')
    })
  })
}
