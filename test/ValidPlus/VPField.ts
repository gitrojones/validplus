/* tslint:disable:no-unused-expression */
import { ValidationAttributes } from '@/interfaces/validation/ValidationAttributes'
import DOMMessaging from './DOMMessaging'

const ValidPlus = require('validplus').default
const sinon = require('sinon')
const { describe, beforeEach } = require('mocha')
const { expect } = require('chai')
const { difference } = require('lodash/fp')

export const VPField = function () {
  let testFieldset: HTMLElement
  let testField: HTMLElement = window.document.createElement('div')
  let testInput: HTMLInputElement = window.document.createElement('input')
  testField.append(testInput)

  beforeEach((done: (err?: any) => void) => {
    testFieldset = window.document.createElement('div')
    testField = window.document.createElement('div')
    testField.className = 'field'
    testFieldset.append(testField)

    testInput = window.document.createElement('input')
    testInput.className = 'input'
    testInput.value = 'Hello, World'
    testField.append(testInput)

    done()
  })

  describe('Messaging', DOMMessaging(new ValidPlus.Field(testField)))

  describe('Fields Properties', function () {
    it('Should use specified ControllerInput')
    it('Should prioritize primary controller type')
    it('Should fallback to a defined controlled type if missing primary controller type')
    it('Should allow controller types that extend HTMLInput, HTMLSelect, HTMLTextarea')
    it('Should prioritize `vp-primary` controllers')
  })

  describe('DOM Assertions', function () {
    describe('Field Error handling' , function () {
      it('Should allow for custom errorClass', function () {
        const errorClass = '-fooBar'
        testInput.value = ''
        testInput.setAttribute('required', 'true');

        (new ValidPlus.Field(testField, {
          ErrorClassName: errorClass
        }, [])).isValid()
        expect(testField.classList.contains(errorClass)).to.be.true
      })

      it('Should allow for custom validClass', function () {
        const validClass = '-helloWorld'
        testInput.value = 'hello'
        testInput.setAttribute('required', 'true');
        (new ValidPlus.Field(testField, {
          ValidClassName: validClass
        }, [])).isValid()

        expect(testField.classList.contains(validClass)).to.be.true
      })

      it('Should append the errorClass on invalid fields/inputs', function () {
        testInput.value = ''
        testInput.setAttribute('required', 'true');

        (new ValidPlus.Field(testField, {}, [])).isValid()
        expect(testField.classList.contains('-isError')).to.be.true
      })

      it('Should append the validClass on valid fields/inputs', function () {
        testInput.value = 'hello'
        testInput.setAttribute('required', 'true');

        (new ValidPlus.Field(testField, {}, [], {})).isValid()
        expect(testField.classList.contains('-isValid')).to.be.true
      })
    })

    describe('Evaluation', function () {
      it('Should display any message returned in a custom rule as an error', function () {
        const ErrorMessage = 'Invalid Field';
        (new ValidPlus.Field(testField, {}, [
          () => ErrorMessage
        ])).isValid()

        expect((testField.querySelector('div.-isError') as Element).innerHTML).to.eq(ErrorMessage)
      })

      it('Should not display an error message until async is resolved (if error)', function () {
        const ErrorMessage = 'Invalid Field'
        const delayedMessage = new Promise((resolve) => {
          setTimeout(() => resolve(ErrorMessage), 1)
        });

        (new ValidPlus.Field(testField, {}, [
          () => delayedMessage
        ])).isValid()

        expect(testField.querySelector('div.-isError')).to.be.null
      })

      it('Should eventually display an error message when async is resolved (if error)', function (done: (err?: any) => void) {
        const ErrorMessage = 'Invalid Field'
        const delayedMessage = new Promise((resolve) => {
          setTimeout(() => resolve(ErrorMessage), 1)
        });

        (new ValidPlus.Field(testField, {}, [
          () => delayedMessage
        ])).isValid()

        setTimeout(() => {
          expect((testField.querySelector('div.-isError') as HTMLElement).innerHTML).to.eq(ErrorMessage)
          done()
        }, 2)
      })

      it('Should not append error classes until async is resolved (if error)', function () {
        const ErrorMessage = 'Invalid Field'
        const delayedMessage = new Promise((resolve) => {
          setTimeout(() => resolve(ErrorMessage), 1)
        });

        (new ValidPlus.Field(testField, {}, [
          () => delayedMessage
        ])).isValid()

        expect(testField.classList.contains('-isError')).to.be.false
      })

      it('Should eventually append error classes when async is resolved (if error)', function (done: (err?: any) => void) {
        const delayedMessage = new Promise((resolve) => {
          setTimeout(() => resolve(false), 1)
        });

        (new ValidPlus.Field(testField, {}, [
          () => delayedMessage
        ])).isValid()

        setTimeout(() => {
          expect(testField.classList.contains('-isError')).to.be.true
          done()
        }, 2)
      })

      it('Should not append valid classes until async is resolved (if valid)', function () {
        const delayedCB = new Promise((resolve) => {
          setTimeout(() => resolve(true), 1)
        });

        (new ValidPlus.Field(testField, {}, [
          () => delayedCB
        ])).isValid()

        expect(testField.classList.contains('-isValid')).to.be.false
      })

      it('Should eventually append valid classes when async is resolved (if valid)', function (done: (err?: any) => void) {
        const delayedCB = new Promise((resolve) => {
          setTimeout(() => resolve(true), 1)
        });

        (new ValidPlus.Field(testField, {}, [
          () => delayedCB
        ])).isValid()

        setTimeout(() => {
          expect(testField.classList.contains('-isValid')).to.be.true
          done()
        }, 2)
      })
    })
  })

  describe('Library State Assertions', function () {
    describe('Field Error handling' , function () {
      it('Should allow for custom errorClass', function () {
        const errorClass = '-fooBar'
        testInput.value = ''
        testInput.setAttribute('required', 'true')
        let field = new ValidPlus.Field(testField, {
          ErrorClassName: errorClass
        }, [])

        expect(field.$options.ErrorClassName).to.eq(errorClass)
      })

      it('Should allow for custom validClass', function () {
        const validClass = '-helloWorld'
        testInput.value = 'hello'
        testInput.setAttribute('required', 'true')
        let field = new ValidPlus.Field(testField, {
          ValidClassName: validClass
        }, [])

        expect(field.$options.ValidClassName).to.eq(validClass)
      })

      it('Should append the errorClass on invalid fields/inputs', function () {
        testInput.value = ''
        testInput.setAttribute('required', 'true')
        let field = new ValidPlus.Field(testField, {}, [])

        expect(field.isValid()).to.be.false
      })

      it('Should append the validClass on valid fields/inputs', function () {
        testInput.value = 'hello'
        testInput.setAttribute('required', 'true')
        let field = new ValidPlus.Field(testField, {}, [], {})

        expect(field.isValid()).to.be.true
      })
    })

    describe('Field Error Messaging', function () {
      it('Should allow changing the Messaging Node className', function () {
        const MessageClassName = 'VPFoo'
        const field = new ValidPlus.Field(testField, {
          MessageClassName
        }, [ ])

        expect(field.$options.MessageClassName).to.eq(MessageClassName)
      })

      it('Should allow changing the Messaging inner node className', function () {
        const MessageContainerClassName = 'VPFooInner'
        const field = new ValidPlus.Field(testField, {
          MessageContainerClassName
        }, [ ])

        expect(field.$options.MessageClassName).to.eq(MessageContainerClassName)
      })

      it('Should allow changing the Messaging inner node anchor', function () {
        const ArbitraryAnchor = document.createElement('div')
        const field = new ValidPlus.Field(testField, {
          MessageAnchor: ArbitraryAnchor
        }, [ ])

        expect(field.$options.MessageAnchor).to.eq(ArbitraryAnchor)
      })

      describe('Scrollable', function () {
        it('Should not be scrollable by default', function () {
          const field = new ValidPlus.Field(testField, {}, [ ])
          expect(field.$options.ScrollTo).to.be.false
        })

        it('Should default the scroll anchor to the field', function () {
          const field = new ValidPlus.Field(testField, {}, [ ])
          expect(field.$options.ScrollAnchor).to.eq(testField)
        })
      })

      describe('CustomRules', function () {
        describe('Attributes', function () {
          it('Should provide the input attributes', function (done: (err?: any) => void) {
            const field = new ValidPlus.Field(testField, {}, [
              async (attrs: ValidationAttributes) => {
                expect(difference(Object.keys(attrs), [
                  'value',
                  'checked',
                  'type',
                  'name',
                  'rules'
                ]).length).to.eq(0)

                done()
                return true
              }])

            field.isValid()
          })

          it('Should provide the element', function (done: (err?: any) => void) {
            const field = new ValidPlus.Field(testField, {}, [
              async (_attributes: ValidationAttributes, el: HTMLElement) => {
                expect(el).to.eq(testField)
                done()
                return true
              }])

            field.isValid()
          })

          it('Should provide the input', function () {
            new ValidPlus.Field(testField, {}, [
              function (_attributes: ValidationAttributes, _el: HTMLElement, input: HTMLInputElement) {
                expect(input).to.eq(testInput)
                return true
              }
            ])
          })
        })
      })
    })

    describe('Evaluation', function () {
      it('Should return a boolean if sync rules only', function () {
        let field = new ValidPlus.Field(testField, {}, [
          () => false
        ])

        expect(typeof field.isValid()).to.eq('boolean')
      })

      it('Should return a promise if async rule provided', function () {
        let field = new ValidPlus.Field(testField, {}, [
          async () => false
        ])

        expect(typeof field.isValid().then).to.eq('function')
      })

      it('Should return a promise if async rule provided with sync rules', function () {
        let field = new ValidPlus.Field(testField, {}, [
          () => true,
          async () => false
        ])

        expect(typeof field.isValid().then).to.eq('function')
      })

      it('Should validate false if a message is returned', function () {
        let field = new ValidPlus.Field(testField, {}, [
          () => 'Invalid Field'
        ])

        expect(field.isValid()).to.be.false
      })
    })

    describe('Lazy Evaluation (default)', function () {
      it('Should skip custom rule validation if basic validation is false', function () {
        const shouldNotBeCalled = sinon.fake()
        testInput.value = ''
        testInput.setAttribute('required', 'true');

        (new ValidPlus.Field(testField, {}, [
          shouldNotBeCalled
        ])).isValid()

        expect(shouldNotBeCalled.called).to.be.false
      })

      it('Should skip any additional rules if any previous validate false', function () {
        const errorMessage = 'Foo bar baz'
        const shouldNotBeCalled = sinon.fake();
        (new ValidPlus.Field(testField, {}, [
          () => errorMessage,
          shouldNotBeCalled
        ])).isValid()

        expect(shouldNotBeCalled.called).to.be.false
      })

      it('Should return a promise if valid up until an async customRule is evaluated', function () {
        let field = (new ValidPlus.Field(testField, {}, [
          () => true,
          async () => false
        ])).isValid()

        expect(typeof field.then).to.eq('function')
      })
    })

    describe('Full Validation', function () {
      it('Should validate all rules, regardless of validity', function () {
        const shouldGetCalled = sinon.fake();
        (new ValidPlus.Field(testField, {
          ValidateLazyFieldRules: false,
          ValidateLazyCustomRules: false,
        }, [
          () => false,
          shouldGetCalled
        ])).isValid()

        expect(shouldGetCalled.called).to.be.true
      })

      it('Should return as promise if any customRule is async', function () {
        let field = new ValidPlus.Field(testField, {
          ValidateLazyFieldRules: false,
          ValidateLazyCustomRules: false,
        }, [
          async () => false
        ])

        expect(typeof field.isValid().then).to.eq('function')
      })

      it('Should properly validate sync as async', function (done: (err?: any) => void) {
        let field = new ValidPlus.Field(testField, {
          ValidateLazyFieldRules: false,
          ValidateLazyCustomRules: false,
        }, [
          () => false,
          async () => true
        ])

        expect(field.isValid()).to.eventually.eq(false).notify(done)
      })

      it('Should properly validate async with mixed sync', function (done: (err?: any) => void) {
        let field = new ValidPlus.Field(testField, {
          ValidateLazyFieldRules: false,
          ValidateLazyCustomRules: false,
        }, [
          () => true,
          async () => false
        ])

        expect(field.isValid()).to.eventually.eq(false).notify(done)
      })
    })

    it('Should return synchronously if customRules are synchronous', function () {
      const errorMessage = 'Foo bar baz'
      let field = new ValidPlus.Field(testField, {}, [(attributes, el, input) => errorMessage], {})

      let isValid = field.isValid()
      expect(isValid).to.be.false
    })

    it('Should append customRule error messages by default', function (done) {
      const errorMessage = 'Foo bar baz'
      let field = new ValidPlus.Field(
                testField,
                {},
        [
          (attributes, el, input) =>
                        new Promise((resolve, reject) => {
                          return resolve(errorMessage)
                        }),
          (attributes, el, input) =>
                        new Promise((resolve, reject) => {
                          return resolve(true)
                        })
        ],
                {}
            )

            // Will be valid until it isn't
      expect(field.isValid()).to.eventually.be.true.notify(() => {
        const valid = field.$valid === false
        const children = field.$MessageNode.children.length === 1

        let innerHTML
        if (children) {
          innerHTML = field.$MessageNode.children[0].innerHTML === errorMessage
          if (valid && children && innerHTML) {
            return done()
          }
        }
        if (valid === false) {
          done(new Error('Field invalid'))
        } else if (children === false) {
          done(new Error('Invalid children length'))
        } else if (innerHTML === false) {
        }
      })
    })
  })

  describe('Field Lifecycle', function () {
    it('Should append Message if Valid/Invalid')
    it('Should append Call CB if Valid/Invalid')
    it('Should pass instance to CB')

    it('Should Accept Lifecycle in options only', function () {
      let field = new ValidPlus.Field(testField, {
        Lifecycle: {
          Invalid: {
            Message: 'Foo'
          },
          Valid: {
            Message: 'Bar'
          }
        }
      }, [])

      expect(field.$options.Lifecycle.Invalid.Message).to.eq('Foo')
      expect(field.$options.Lifecycle.Valid.Message).to.eq('Bar')
    })

    it('Should Accept Lifecycle in LifeCycle prop, w/o options', function () {
      let field = new ValidPlus.Field(testField, {}, [], {
        Invalid: {
          Message: 'Foo'
        },
        Valid: {
          Message: 'Bar'
        }
      })

      expect(field.$options.Lifecycle.Invalid.Message).to.eq('Foo')
      expect(field.$options.Lifecycle.Valid.Message).to.eq('Bar')
    })

        // TODO: Lifecycle prop to be deprecated
    it('Should prioritize Lifecycle prop over options', function () {
      let field = new ValidPlus.Field(
                testField,
        {
          Lifecycle: {
            Invalid: {
              Message: 'Baz'
            },
            Valid: {
              Message: 'Bing'
            }
          }
        },
                [],
        {
          Invalid: {
            Message: 'Foo'
          },
          Valid: {
            Message: 'Bar'
          }
        }
            )

      expect(field.$options.Lifecycle.Invalid.Message).to.eq('Foo')
      expect(field.$options.Lifecycle.Valid.Message).to.eq('Bar')
    })
  })

describe('Fields Default Validation Types', function () {
    it('Should validate required (standard)', function () {
      testInput.setAttribute('required', true)
      testInput.value = null
      let field = new ValidPlus.Field(testField, {}, [], {
        Invalid: {
          Message: 'Hello, World'
        }
      })

      expect(field.isValid()).to.be.false
      testInput.value = 'hello'
      expect(field.isValid()).to.be.true
    })

    it('Should validate required (radio)', function () {
      let testFieldsetTwo = window.document.createElement('div')
      let testFieldTwo = window.document.createElement('div')
      testFieldTwo.className = 'field'
      testFieldsetTwo.append(testField)

      let testInputTwo = window.document.createElement('input')
      testInputTwo.className = 'input'
      testInputTwo.value = 'Hello, World'
      testInputTwo.checked = true
      testInputTwo.setAttribute('type', 'radio')
      testFieldTwo.append(testInputTwo)

      testInput.setAttribute('type', 'radio')
      testInput.setAttribute('required', true)
      testInput.value = 'foo'
      testInput.checked = false
      let field = new ValidPlus.Field(testField, {}, [], {
        Invalid: {
          Message: 'Foo'
        }
      })

      let fieldTwo = new ValidPlus.Field(testFieldTwo, {}, [], {
        Invalid: {
          Message: 'Bar'
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
        Invalid: {
          Message: 'Hello, World'
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
        Invalid: {
          Message: 'Hello, World'
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
        Invalid: {
          Message: 'Hello, World'
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
      let field = new ValidPlus.Field(
                testField,
        {
          InputRules: {
            required: true
          }
        },
                [],
        {
          Invalid: {
            Message: 'Hello, World'
          }
        }
            )

      expect(field.isValid()).to.be.false
      testInput.value = 'hello'
      expect(field.isValid()).to.be.true
    })

    it('Should validate min', function () {
      testInput.value = 3
      let field = new ValidPlus.Field(
                testField,
        {
          InputRules: {
            min: 5
          }
        },
                [],
        {
          Invalid: {
            Message: 'Hello, World'
          }
        }
            )

      expect(field.isValid()).to.be.false
      testInput.value = 6
      expect(field.isValid()).to.be.true
    })
    it('Should validate max', function () {
      testInput.value = 3
      let field = new ValidPlus.Field(
                testField,
        {
          InputRules: {
            max: 5
          }
        },
                [],
        {
          Invalid: {
            Message: 'Hello, World'
          }
        }
            )

      expect(field.isValid()).to.be.true
      testInput.value = 6
      expect(field.isValid()).to.be.false
    })
    it('Should validate maxlength', function () {
      testInput.value = 'hello'
      let field = new ValidPlus.Field(
                testField,
        {
          InputRules: {
            maxlength: 5
          }
        },
                [],
        {
          Invalid: {
            Message: 'Hello, World'
          }
        }
            )

      expect(field.isValid()).to.be.true
      testInput.value = ''
      expect(field.isValid()).to.be.true
      testInput.value = 'hello world'
      expect(field.isValid()).to.be.false
    })

    it('Should validate minlength', function () {
      testInput.value = 'hello'
      let field = new ValidPlus.Field(
                testField,
        {
          InputRules: {
            minlength: 5
          }
        },
                [],
        {
          Invalid: {
            Message: 'Hello, World'
          }
        }
            )

      expect(field.isValid()).to.be.true
      testInput.value = ''
      expect(field.isValid()).to.be.false
      testInput.value = 'hello world'
      expect(field.isValid()).to.be.true
    })

    it('Should validate pattern', function () {
      testInput.value = 'hello'
      let field = new ValidPlus.Field(
                testField,
        {
          InputRules: {
            pattern: /[0-9]{5}/
          }
        },
                [],
        {
          Invalid: {
            Message: 'Hello, World'
          }
        }
            )

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
    let field = new ValidPlus.Field(
            testField,
      {
        InputRules: {
          maxlength: 5
        }
      },
            [],
      {
        Invalid: {
          Message: 'Hello, World'
        }
      }
        )

    expect(field.isValid()).to.be.false
    field.$options.ForceRules = true
    expect(field.isValid()).to.be.true
  })

it('Should format pre/post and include an eventDispatch method', function () {
    let uppercasePre = (input, dispatchEvent) => {
      input.value = input.value.toUpperCase()
      input.value = input.value += '-world'
      dispatchEvent('input')
    }
    let lowercasePost = (input, dispatchEvent) => {
      input.value = input.value.toLowerCase()
      dispatchEvent('input')
    }
    testInput.value = 'hello'

    const spyPreFired = sinon.spy(uppercasePre)
    const spyPostFired = sinon.spy(lowercasePost)

    let field = new ValidPlus.Field(
            testField,
      {
        InputFormatter: {
          pre: spyPreFired,
          post: spyPostFired
        }
      },
            [],
            {}
        )

    expect(field.isValid()).to.be.true

    expect(spyPreFired.args[0][0]).to.be.an.instanceof(window.HTMLElement)
    expect(typeof spyPreFired.args[0][1]).to.eq('function')
    expect(spyPostFired.args[0][0]).to.be.an.instanceof(window.HTMLElement)
    expect(typeof spyPostFired.args[0][1]).to.eq('function')

    expect(testInput.value).to.eq('hello-world')
  })

it('Should listen for changes on input/change by default', function () {
    const spyIsValid = sinon.spy(ValidPlus.Field.prototype, 'isValid')
    let field = new ValidPlus.Field(testField, {}, [], {
      Invalid: {
        Message: 'Hello, World'
      }
    })
    let inputEvent = window.document.createEvent('Event')
    inputEvent.initEvent('input', false, false)

    testInput.value = 'Foo, Bar'
    testInput.dispatchEvent(inputEvent)

    expect(spyIsValid.calledOnce).to.be.true
    ValidPlus.Field.prototype.isValid.restore()
  })

it('Should append message for pre/post formatters', function () {
    const message = 'Hello, World'

    let field = new ValidPlus.Field(
            testField,
      {
        Watch: true,
        InputFormatter: {
          pre: 'Hello World'
        }
      },
            [],
      {
        Invalid: {
          Message: message
        }
      }
        )

    field.isValid()
    expect(field.$MessageAnchor.children[1].innerHTML === message)
  })

it('Should fire update events on pre/post formatters', function () {
    let inputEvent = window.document.createEvent('Event')
    inputEvent.initEvent('input', false, false)

    let field = new ValidPlus.Field(
            testField,
      {
        Watch: true,
        InputFormatter: {
          pre: (input, dispatchEvent) => {
            input.value = 'Foo Bar'
            dispatchEvent('input')
          }
        }
      },
            [],
      {
        isInvalid: {
          message: 'Hello, World'
        }
      }
        )

    let inputSpy = sinon.spy(field.$input, 'dispatchEvent')

    field.isValid()
    expect(testInput.value).to.eq('Foo Bar')
    expect(inputSpy.called).to.be.true
  })

it('Should only validate onBlur w/ DirtyOnBlur', function () {
    let field = new ValidPlus.Field(
            testField,
      {
        ValidateOn: {
          blur: true,
          input: false,
          mouseleave: false
        },
        DirtyOn: {
          blur: true,
          input: false,
          mouseleave: false
        },
        Watch: false
      },
            [],
      {
        Invalid: {
          Message: 'Hello, World'
        }
      }
        )
    const spyIsValid = sinon.spy(ValidPlus.Field.prototype, 'isValid')

    let inputEvent = window.document.createEvent('Event')
    let blurEvent = window.document.createEvent('Event')
    inputEvent.initEvent('input', false, false)
    blurEvent.initEvent('blur', false, false)

    const test = 'FooBar'
    for (let i = 0, l = test.length; i < l; i++) {
      testInput.value = testInput.value + test[i]
      testInput.dispatchEvent(inputEvent)
    }

    expect(field.$dirty).to.be.false
    expect(spyIsValid.calledOnce).to.be.false

    testInput.dispatchEvent(blurEvent)
    expect(spyIsValid.calledOnce).to.be.true
    expect(field.$dirty).to.be.true

    ValidPlus.Field.prototype.isValid.restore()
  })

it('Should accept vp-params to toggle options', function () {
    testField.setAttribute('vp-dirtyBlur', 'true')
    testField.setAttribute('vp-dirtyChange', 'false')
    testField.setAttribute('vp-dirtyMouseLeave', 'true')
    testField.setAttribute('vp-blur', 'false')
    testField.setAttribute('vp-change', 'false')
    testField.setAttribute('vp-mouseleave', 'true')

    testField.setAttribute('vp-watch', 'false')

    let field = new ValidPlus.Field(testField, {}, [], {
      Invalid: {
        Message: 'Foo'
      }
    })

    expect(field.$options.DirtyOn.blur).to.be.true
    expect(field.$options.DirtyOn.change).to.be.false
    expect(field.$options.DirtyOn.mouseleave).to.be.true

    expect(field.$options.ValidateOn.blur).to.be.false
    expect(field.$options.ValidateOn.change).to.be.false
    expect(field.$options.ValidateOn.mouseleave).to.be.true

    expect(field.$options.Watch).to.be.false
  })

it('Should validate on blur if set, regardless of watch', function () {
    let blurEvent = window.document.createEvent('Event')
    blurEvent.initEvent('blur', false, false)

    testField.setAttribute('vp-blur', 'true')
    testField.setAttribute('vp-dirtyBlur', 'true')
    testField.setAttribute('vp-watch', 'false')

    testInput.setAttribute('required', 'true')

    let field = new ValidPlus.Field(testField, {}, [], {
      Invalid: {
        Message: 'Foo'
      }
    })

    testInput.value = 'Bar'
    expect(field.$isValid).to.eq(null)
    testInput.dispatchEvent(blurEvent)
    expect(field.$isValid).to.eq(true)
    testInput.value = ''
    expect(field.$isValid).to.eq(true)
    testInput.dispatchEvent(blurEvent)
    expect(field.$isValid).to.eq(false)
  })

it('Should validate input based on pattern attribute', function () {
    testInput.setAttribute('pattern', '[0-9]{5}')

    let field = new ValidPlus.Field(testField, {
      Watch: true
    }, [], {
      isInvalid: {
        message: 'Hello, World'
      }
    })

    let inputEvent = window.document.createEvent('Event')
    inputEvent.initEvent('input', false, false)

    testInput.value = 'notanumber'
    testInput.dispatchEvent(inputEvent)
    expect(field.$isValid).to.be.false

    testInput.value = '09101'
    testInput.dispatchEvent(inputEvent)
    expect(field.$isValid).to.be.true

    testInput.value = '00'
    testInput.dispatchEvent(inputEvent)
    expect(field.$isValid).to.be.false
  })
}
