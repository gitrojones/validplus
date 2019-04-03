/* global describe, it, beforeEach, afterEach, expect, sinon */
describe('ValidPlus', function() {
  let ValidPlus;

  beforeEach(done => {
    ValidPlus = require('validplus').ValidPlus;
    done();
  });
  afterEach(done => {
    done();
  });

  it('Should export "Validator"', function() {
    expect(ValidPlus).to.have.property('Validator');
  });

  describe('ValidPlus.Validatable', function () {
    describe('DOMMessaging', function () {
      let validatable
      let testValidator
      let testFieldset
      let testField

      beforeEach(done => {
        testValidator = window.document.createElement('form');
        testFieldset = window.document.createElement('div');
        testField = window.document.createElement('div');

        validatable = [
          new ValidPlus.Validator({}, testValidator),
          new ValidPlus.Fieldset(testFieldset, 'all', {}),
          new ValidPlus.Field(testField, {}, [], {})
        ]

        done()
      })

      it('Implements AddEventListener', function () {
        expect(validatable.every(v => typeof v.addEventListener === 'function')).to.be.true
      })
      it('AddEventListener adds a listener to the listener property', function () {
        const func = () => null

        validatable.forEach(v => {
          v.addEventListener('click', func)
        })
        expect(validatable.every(v => v.$listeners.click[0] === func)).to.be.true
      })
      it('Implements RemoveEventListener', function () {
        expect(validatable.every(v => typeof v.removeEventListener === 'function')).to.be.true
      })
      it('RemoveEventListener removes a listener on the listener property', function () {
        const func = () => null

        validatable.forEach(v => {
          v.addEventListener('click', func)
          v.removeEventListener('click', func)
        })
        expect(validatable.every(v => v.$listeners.click.length === 0)).to.be.true
      })
      it('Implements DispatchEvent', function () {
        expect(validatable.every(v => typeof v.dispatchEvent === 'function')).to.be.true
      })
      it('DispatchEvent fires an event upwards', function (done) {
        let count = 0
        validatable.forEach((v) => {
          v.addEventListener('click', function () {
            expect(true).to.be.true
            count++

            if (count === 3) done()
          })
        })

        validatable.every(v => v.dispatchEvent(v.createEvent('click')))
      })
      it('Implements CreateEvent Helper', function () {
        expect(validatable.every(v => typeof v.createEvent === 'function')).to.be.true
      })
    })
  })

  describe('ValidPlus.Validator', function() {
    let testForm;

    beforeEach(done => {
      testForm = window.document.createElement('form');
      testForm.className = 'form';

      done();
    });

    describe('Validator Properties', function() {
      it('Validator instance should have properties', function() {
        let validator = new ValidPlus.Validator({}, testForm);
        expect(validator).to.have.property('addFieldset');
        expect(validator).to.have.property('removeFieldset');
        expect(validator).to.have.property('clearMessages');
        expect(validator).to.have.property('removeMessage');
        expect(validator).to.have.property('addMessage');
        expect(validator).to.have.property('isValid');
      });
    });

    it('Validator should track new fieldsets', function() {
      let validator = new ValidPlus.Validator({}, testForm);
      let testFieldset = window.document.createElement('div');
      testFieldset.className = 'fieldset';

      let success = new ValidPlus.Fieldset(testFieldset, 'one', {}, []);
      validator.addFieldset(success)

      expect(success).to.not.be.false;
      expect(validator.$fieldsets.length).to.equal(1);
      expect(validator.$fieldsets[0]).to.be.instanceof(ValidPlus.Fieldset);
    });

    it('Validator should allow adding fieldsets and their fields', function() {
      let validator = new ValidPlus.Validator({}, testForm);
      let testFieldset = window.document.createElement('div');
      testFieldset.className = 'fieldset';

      let testField = window.document.createElement('div');
      testField.className = 'VPField';

      testFieldset.append(testField);

      const fieldset = new ValidPlus.Fieldset(testFieldset, 'all', {})
      const field = new ValidPlus.Field(testField, {}, [], {})
      fieldset.addField(field)

      validator.addFieldset(fieldset)
      expect(fieldset.$fields.length).to.equal(1);
    });

    it('Validator should lazy evaluate fieldset validness byDefault', function() {
      let validator = new ValidPlus.Validator(
        {
          ValidateVisible: false,
          ScrollTo: false,
        },
        testForm
      );
      let testFieldset = window.document.createElement('div');
      let testFieldsetTwo = window.document.createElement('div');
      testFieldset.className = 'fieldset';
      testFieldsetTwo.className = 'fieldsetTwo';

      let testField = window.document.createElement('div');
      let testFieldTwo = window.document.createElement('div');
      testField.className = 'VPField';
      testFieldTwo.className = 'VPField';

      let testInput = window.document.createElement('input');
      let testInputTwo = window.document.createElement('input');
      testInput.setAttribute('required', true);
      testInputTwo.setAttribute('required', true);

      testField.append(testInput);
      testFieldTwo.append(testInputTwo);

      testFieldset.append(testField);
      testFieldsetTwo.append(testFieldTwo);

      const fieldset = validator.createFieldset(
        testFieldset,
        'all',
        {
          ValidateVisible: false,
          ScrollTo: false,
        },
        [new ValidPlus.Field(testField, {}, [], {})]
      );
      const fieldsetTwo = validator.createFieldset(
        testFieldsetTwo,
        'all',
        {
          ValidateVisible: false,
          ScrollTo: false,
        },
        [new ValidPlus.Field(testFieldTwo, {}, [], {})]
      );

      expect(validator.isValid()).to.be.false;
      expect(fieldset.$isValid).to.be.false;
      expect(fieldsetTwo.$isValid).to.equal(null);
    });

    it('Validator should evaluate all fieldsets with lazy off', function() {
      let validator = new ValidPlus.Validator(
        {
          ValidateLazy: false,
          ValidateVisible: false,
        },
        testForm
      );
      let testFieldset = window.document.createElement('div');
      let testFieldsetTwo = window.document.createElement('div');
      testFieldset.className = 'fieldset';
      testFieldsetTwo.className = 'fieldsetTwo';

      let testField = window.document.createElement('div');
      let testFieldTwo = window.document.createElement('div');
      testField.className = 'VPField';
      testFieldTwo.className = 'VPField';

      let testInput = window.document.createElement('input');
      let testInputTwo = window.document.createElement('input');
      testInput.setAttribute('required', true);
      testInputTwo.setAttribute('required', true);

      testField.append(testInput);
      testFieldTwo.append(testInputTwo);

      testFieldset.append(testField);
      testFieldsetTwo.append(testFieldTwo);

      const fieldset = validator.createFieldset(
        testFieldset,
        'all',
        {
          ValidateVisible: false,
        },
        [new ValidPlus.Field(testField, {}, [], {})]
      );
      const fieldsetTwo = validator.createFieldset(
        testFieldsetTwo,
        'all',
        {
          ValidateVisible: false,
        },
        [new ValidPlus.Field(testFieldTwo, {}, [], {})]
      );

      expect(validator.isValid()).to.be.false;
      expect(fieldset.$isValid).to.be.false;
      expect(fieldsetTwo.$isValid).to.be.false;
    });

    // TODO: Implement Cypress E2E testing for visual
    it('Validator should ignore hidden fieldsets by default');

    describe('Validator Error Handling', function() {
      it('Should append the errorClass on invalid', function() {
        const MockFieldset = { isValid: () => false, element: {} };
        const validator = new ValidPlus.Validator(
          {
            ScrollTo: false,
            ValidateVisible: false,
          },
          testForm
        );
        validator.$fieldsets.push(MockFieldset);

        expect(validator.isValid()).to.be.false;
        expect(testForm.classList.contains('-isError')).to.be.true;
      });
      it('Should append the validClass on valid', function() {
        const validator = new ValidPlus.Validator({}, testForm);
        expect(validator.isValid()).to.be.true;
        expect(testForm.classList.contains('-isValid')).to.be.true;
      });
      it('Should append a custom options.errorClass on invalid', function() {
        const errorClass = '-helloWorld';
        const MockFieldset = { isValid: () => false, element: {} };
        const validator = new ValidPlus.Validator(
          {
            ErrorClassName: errorClass,
            ScrollTo: false, // ScrollTo expects a element, which we don't have (mocked)
            ValidateVisible: false,
          },
          testForm
        );
        validator.$fieldsets.push(MockFieldset);

        expect(validator.isValid()).to.be.false;
        expect(testForm.classList.contains(errorClass)).to.be.true;
      });
      it('Should append a custom options.validClass on valid', function() {
        const validClass = '-fooBar';
        const validator = new ValidPlus.Validator(
          {
            ValidClassName: validClass,
          },
          testForm
        );
        expect(validator.isValid()).to.be.true;
        expect(testForm.classList.contains(validClass)).to.be.true;
      });
    });
  });

  describe('ValidPlus.Fieldset', function() {
    let testFieldset;

    beforeEach(done => {
      testFieldset = window.document.createElement('div');
      testFieldset.className = 'fieldset';

      done();
    });

    describe('Fieldset Error Handling', function() {
      let testFieldset;
      let testField;
      let testInput;

      beforeEach(() => {
        testFieldset = window.document.createElement('div');
        testField = window.document.createElement('div');
        testField.className = 'field';
        testFieldset.append(testField);

        testInput = window.document.createElement('input');
        testInput.className = 'input';
        testInput.value = 'Hello, World';
        testField.append(testInput);
      });

      it('Should append the errorClass on invalid fieldset', function() {
        testInput.value = null;
        testInput.setAttribute('required', true);
        let field = new ValidPlus.Field(testField, {}, [], {});
        let fieldset = new ValidPlus.Fieldset(
          testFieldset,
          'all',
          {
            ValidateVisible: false,
          },
          {}
        );
        fieldset.addField(field);

        expect(fieldset.isValid()).to.be.false;
        expect(testFieldset.classList.contains('-isError')).to.be.true;
      });
      it('Should append the validClass on valid fields/inputs', function() {
        testInput.value = 'hello';
        testInput.setAttribute('required', true);
        let field = new ValidPlus.Field(testField, {}, [], {});
        let fieldset = new ValidPlus.Fieldset(
          testFieldset,
          'all',
          {
            ValidateVisible: false,
          },
          {}
        );
        fieldset.addField(field);

        expect(fieldset.isValid()).to.be.true;
        expect(testFieldset.classList.contains('-isValid')).to.be.true;
      });
      it('Should allow for custom errorClass', function() {
        const errorClass = '-fooBar';
        testInput.value = null;
        testInput.setAttribute('required', true);
        let field = new ValidPlus.Field(testField, {}, [], {});
        let fieldset = new ValidPlus.Fieldset(
          testFieldset,
          'all',
          {
            ErrorClassName: errorClass,
            ValidateVisible: false,
          },
          {}
        );
        fieldset.addField(field);

        expect(fieldset.isValid()).to.be.false;
        expect(testFieldset.classList.contains(errorClass)).to.be.true;
      });
      it('Should allow for custom validClass', function() {
        const validClass = '-helloWorld';
        testInput.value = 'hello';
        testInput.setAttribute('required', true);
        let field = new ValidPlus.Field(testField, {}, [], {});
        let fieldset = new ValidPlus.Fieldset(
          testFieldset,
          'all',
          {
            ValidClassName: validClass,
            ValidateVisible: false,
          },
          {}
        );
        fieldset.addField(field);

        expect(fieldset.isValid()).to.be.true;
        expect(testFieldset.classList.contains(validClass)).to.be.true;
      });
    });

    it('Fieldset should throw an error if missing an element', function() {
      expect(() => new ValidPlus.Fieldset(null, () => null, {})).to.throw();
    });
    it('Fieldset should throw an error if missing a strategy', function() {
      expect(() => new ValidPlus.Fieldset(testFieldset, null, {})).to.throw();
    });
    it('Fieldset should add children fields', function() {
      let testField = window.document.createElement('div');
      testField.className = 'field';
      testFieldset.append(testField);

      let fieldset = new ValidPlus.Fieldset(testFieldset, () => null, {
        fieldClass: 'field',
      });
      fieldset.createField(testField, [], {});

      expect(fieldset.$fields.length).to.equal(1);
      expect(fieldset.$fields[0]).to.be.instanceof(ValidPlus.Field);
    });

    it('Fieldset should validate', function() {
      let testInput = window.document.createElement('input');
      testInput.className = 'input';
      let testField = window.document.createElement('div');
      testField.className = 'VPField';

      testField.append(testInput);
      testFieldset.append(testField);

      let fieldset = new ValidPlus.Fieldset(
        testFieldset,
        a => a.every(v => v === true),
        {}
      );
      fieldset.createField(testField, [], {});

      expect(fieldset.$fields.length).to.equal(1);
      expect(fieldset.isValid()).to.be.true;
    });

    it('Fieldset should validate fields', function() {
      let testField = window.document.createElement('div');
      testField.className = 'VPField';

      let testInput = window.document.createElement('input');
      testInput.value = 10;
      testInput.setAttribute('type', 'number');
      testInput.setAttribute('min', 1);
      testInput.setAttribute('max', 15);

      testField.append(testInput);
      testFieldset.append(testField);

      let fieldset = new ValidPlus.Fieldset(
        testFieldset,
        a => a.every(v => v === true),
        {}
      );
      fieldset.addField(new ValidPlus.Field(testField, {}));

      expect(fieldset.$fields.length).to.equal(1);
      expect(fieldset.isValid()).to.be.true;
    });

    it('Fieldset should append onValid Message and message should be correct', function() {
      let testField = window.document.createElement('div');
      testField.className = 'VPField';

      let testInput = window.document.createElement('input');
      testInput.value = 10;
      testInput.setAttribute('type', 'number');
      testInput.setAttribute('min', 1);
      testInput.setAttribute('max', 15);

      testField.append(testInput);
      testFieldset.append(testField);

      let fieldset = new ValidPlus.Fieldset(
        testFieldset,
        'all',
        {},
        {
          Valid: {
            Message: 'Hello, World',
          },
        }
      );
      fieldset.addField(new ValidPlus.Field(testField, {}));

      expect(fieldset.isValid()).to.be.true;
      expect(testFieldset.children.length).to.equal(2);
      expect(testFieldset.children[1].className).to.equal('VPMessages');
      expect(testFieldset.children[1].children.length).to.equal(1);
      expect(testFieldset.children[1].children[0].className).to.equal(
        'VPMessage -isValid'
      );
      expect(testFieldset.children[1].children[0].innerHTML).to.equal(
        'Hello, World'
      );
    });
  });

  describe('ValidPlus.Field', function() {
    let validator;
    let testFieldset;
    let testField;
    let testInput;

    beforeEach(done => {
      testFieldset = window.document.createElement('div');
      testField = window.document.createElement('div');
      testField.className = 'field';
      testFieldset.append(testField);

      testInput = window.document.createElement('input');
      testInput.className = 'input';
      testInput.value = 'Hello, World';
      testField.append(testInput);

      done();
    });

    describe('Fields Properties', function() {});

    describe('Field Error Handling', function() {
      it('Should append the errorClass on invalid fields/inputs', function() {
        testInput.value = null;
        testInput.setAttribute('required', true);
        let field = new ValidPlus.Field(testField, {}, [], {});

        expect(field.isValid()).to.be.false;
        expect(testField.classList.contains('-isError')).to.be.true;
      });
      it('Should append the validClass on valid fields/inputs', function() {
        testInput.value = 'hello';
        testInput.setAttribute('required', true);
        let field = new ValidPlus.Field(testField, {}, [], {});

        expect(field.isValid()).to.be.true;
        expect(testField.classList.contains('-isValid')).to.be.true;
      });
      it('Should allow for custom errorClass', function() {
        const errorClass = '-fooBar';
        testInput.value = null;
        testInput.setAttribute('required', true);
        let field = new ValidPlus.Field(
          testField,
          {
            ErrorClassName: errorClass,
          },
          [],
          {}
        );

        expect(field.isValid()).to.be.false;
        expect(testField.classList.contains(errorClass)).to.be.true;
      });
      it('Should allow for custom validClass', function() {
        const validClass = '-helloWorld';
        testInput.value = 'hello';
        testInput.setAttribute('required', true);
        let field = new ValidPlus.Field(
          testField,
          {
            ValidClassName: validClass,
          },
          [],
          {}
        );

        expect(field.isValid()).to.be.true;
        expect(testField.classList.contains(validClass)).to.be.true;
      });
    });

    describe('Fields Default Validation Types', function() {
      it('Should validate required (standard)', function() {
        testInput.setAttribute('required', true);
        testInput.value = null;
        let field = new ValidPlus.Field(testField, {}, [], {
          Invalid: {
            Message: 'Hello, World',
          },
        });

        expect(field.isValid()).to.be.false;
        testInput.value = 'hello';
        expect(field.isValid()).to.be.true;
      });

      it('Should validate required (radio)', function() {
        let testFieldsetTwo = window.document.createElement('div');
        let testFieldTwo = window.document.createElement('div');
        testFieldTwo.className = 'field';
        testFieldsetTwo.append(testField);

        let testInputTwo = window.document.createElement('input');
        testInputTwo.className = 'input';
        testInputTwo.value = 'Hello, World';
        testInputTwo.setAttribute('type', 'radio');
        testFieldTwo.append(testInputTwo);

        testInput.setAttribute('type', 'radio');
        testInput.setAttribute('required', true);
        testInput.checked = false;
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Foo',
          },
        });

        let fieldTwo = new ValidPlus.Field(testFieldTwo, {}, [], {
          isInvalid: {
            message: 'Bar',
          },
        });

        expect(fieldTwo.isValid()).to.be.true;
        expect(field.isValid()).to.be.false;

        testInputTwo.checked = false;
        testInput.checked = true;

        // Radio is always valid if not required
        // Else it is checked/!checked as usual
        expect(fieldTwo.isValid()).to.be.true;
        expect(field.isValid()).to.be.true;
      });

      it('Should validate min', function() {
        testInput.setAttribute('min', 5);
        testInput.value = 3;
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Hello, World',
          },
        });

        expect(field.isValid()).to.be.false;
        testInput.value = 6;
        expect(field.isValid()).to.be.true;
      });
      it('Should validate max', function() {
        testInput.setAttribute('max', 5);
        testInput.value = 3;
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Hello, World',
          },
        });

        expect(field.isValid()).to.be.true;
        testInput.value = 6;
        expect(field.isValid()).to.be.false;
      });
      it('Should validate maxLength', function() {
        testInput.setAttribute('maxlength', 5);
        testInput.value = 'hello';
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Hello, World',
          },
        });

        expect(field.isValid()).to.be.true;
        testInput.value = '';
        expect(field.isValid()).to.be.true;
        testInput.value = 'hello world';
        expect(field.isValid()).to.be.false;
      });
      it('Should validate minLength', function() {
        testInput.setAttribute('minlength', 5);
        testInput.value = 'hello';
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Hello, World',
          },
        });

        expect(field.isValid()).to.be.true;
        testInput.value = '';
        expect(field.isValid()).to.be.false;
        testInput.value = 'hello world';
        expect(field.isValid()).to.be.true;
      });
      it('Should validate pattern', function() {
        testInput.setAttribute('pattern', '[0-9]{5}');
        testInput.value = 'hello';
        let field = new ValidPlus.Field(testField, {}, [], {
          isInvalid: {
            message: 'Hello, World',
          },
        });

        expect(field.isValid()).to.be.false;
        testInput.value = 1245;
        expect(field.isValid()).to.be.false;
        testInput.value = '12345';
        expect(field.isValid()).to.be.true;
      });
    });

    describe('Validate programmically', function() {
      it('Should validate required', function() {
        testInput.value = null;
        let field = new ValidPlus.Field(
          testField,
          {
            InputRules: {
              required: true,
            },
          },
          [],
          {
            Invalid: {
              Message: 'Hello, World',
            },
          }
        );

        expect(field.isValid()).to.be.false;
        testInput.value = 'hello';
        expect(field.isValid()).to.be.true;
      });

      it('Should validate min', function() {
        testInput.value = 3;
        let field = new ValidPlus.Field(
          testField,
          {
            InputRules: {
              min: 5,
            },
          },
          [],
          {
            Invalid: {
              Message: 'Hello, World',
            },
          }
        );

        expect(field.isValid()).to.be.false;
        testInput.value = 6;
        expect(field.isValid()).to.be.true;
      });
      it('Should validate max', function() {
        testInput.value = 3;
        let field = new ValidPlus.Field(
          testField,
          {
            InputRules: {
              max: 5,
            },
          },
          [],
          {
            Invalid: {
              Message: 'Hello, World',
            },
          }
        );

        expect(field.isValid()).to.be.true;
        testInput.value = 6;
        expect(field.isValid()).to.be.false;
      });
      it('Should validate maxlength', function() {
        testInput.value = 'hello';
        let field = new ValidPlus.Field(
          testField,
          {
            InputRules: {
              maxlength: 5,
            },
          },
          [],
          {
            Invalid: {
              Message: 'Hello, World',
            },
          }
        );

        expect(field.isValid()).to.be.true;
        testInput.value = '';
        expect(field.isValid()).to.be.true;
        testInput.value = 'hello world';
        expect(field.isValid()).to.be.false;
      });

      it('Should validate minlength', function() {
        testInput.value = 'hello';
        let field = new ValidPlus.Field(
          testField,
          {
            InputRules: {
              minlength: 5,
            },
          },
          [],
          {
            Invalid: {
              Message: 'Hello, World',
            },
          }
        );

        expect(field.isValid()).to.be.true;
        testInput.value = '';
        expect(field.isValid()).to.be.false;
        testInput.value = 'hello world';
        expect(field.isValid()).to.be.true;
      });

      it('Should validate pattern', function() {
        testInput.value = 'hello';
        let field = new ValidPlus.Field(
          testField,
          {
            InputRules: {
              pattern: /[0-9]{5}/,
            },
          },
          [],
          {
            Invalid: {
              Message: 'Hello, World',
            },
          }
        );

        expect(field.isValid()).to.be.false;
        testInput.value = 1245;
        expect(field.isValid()).to.be.false;
        testInput.value = '12345';
        expect(field.isValid()).to.be.true;
      });
    });

    it('Should validate rules over attribute if force is set', function() {
      testInput.setAttribute('maxlength', 3);
      testInput.value = 'hello';
      let field = new ValidPlus.Field(
        testField,
        {
          InputRules: {
            maxlength: 5,
          },
        },
        [],
        {
          Invalid: {
            Message: 'Hello, World',
          },
        }
      );

      expect(field.isValid()).to.be.false;
      field.$options.ForceRules = true;
      expect(field.isValid()).to.be.true;
    });

    it('Should format pre/post and include an eventDispatch method', function() {
      let uppercasePre = (input, dispatchEvent) => {
        input.value = input.value.toUpperCase();
        input.value = input.value += '-world';
        dispatchEvent('input');
      };
      let lowercasePost = (input, dispatchEvent) => {
        input.value = input.value.toLowerCase();
        dispatchEvent('input');
      };
      testInput.value = 'hello';

      const spyPreFired = sinon.spy(uppercasePre);
      const spyPostFired = sinon.spy(lowercasePost);

      let field = new ValidPlus.Field(
        testField,
        {
          InputFormatter: {
            pre: spyPreFired,
            post: spyPostFired,
          },
        },
        [],
        {}
      );

      expect(field.isValid()).to.be.true;

      expect(spyPreFired.args[0][0]).to.be.an.instanceof(window.HTMLElement);
      expect(typeof spyPreFired.args[0][1]).to.equal('function');
      expect(spyPostFired.args[0][0]).to.be.an.instanceof(window.HTMLElement);
      expect(typeof spyPostFired.args[0][1]).to.equal('function');

      expect(testInput.value).to.equal('hello-world');
    });

    it('Should listen for changes on input/change by default', function() {
      const spyIsValid = sinon.spy(ValidPlus.Field.prototype, 'isValid');
      let field = new ValidPlus.Field(testField, {
        Watch: true
      }, [], {
        isInvalid: {
          message: 'Hello, World',
        },
      });
      let inputEvent = window.document.createEvent('Event');
      inputEvent.initEvent('input', false, false);

      testInput.value = 'Foo, Bar';
      testInput.dispatchEvent(inputEvent);

      expect(spyIsValid.calledOnce).to.be.true;

      ValidPlus.Field.prototype.isValid.restore();
    });

    it ('Should append message for pre/post formatters', function () {
      const message = 'Hello, World'

      let field = new ValidPlus.Field(
        testField,
        {
          Watch: true,
          InputFormatter: {
            pre: 'Hello World'
          },
        },
        [],
        {
          Invalid: {
            Message: message
          },
        }
      );

      field.isValid();
      expect(field.$MessageAnchor.children[1].innerHTML === message)
    })

    it('Should fire update events on pre/post formatters', function() {
      let inputEvent = window.document.createEvent('Event');
      inputEvent.initEvent('input', false, false);

      let field = new ValidPlus.Field(
        testField,
        {
          Watch: true,
          InputFormatter: {
            pre: (input, dispatchEvent) => {
              input.value = 'Foo Bar';
              dispatchEvent('input');
            },
          },
        },
        [],
        {
          isInvalid: {
            message: 'Hello, World',
          },
        }
      );

      let inputSpy = sinon.spy(field.$input, 'dispatchEvent');

      field.isValid();
      expect(testInput.value).to.equal('Foo Bar');
      expect(inputSpy.called).to.be.true;
    });

    it('Should only validate onBlur w/ dirtyOnBlur', function() {
      let field = new ValidPlus.Field(
        testField,
        {
          ValidateOn: {
            blur: true
          },
          DirtyOnBlur: true,
          Watch: true
        },
        [],
        {
          Invalid: {
            Message: 'Hello, World',
          },
        }
      );
      const spyIsValid = sinon.spy(ValidPlus.Field.prototype, 'isValid');

      let inputEvent = window.document.createEvent('Event');
      let blurEvent = window.document.createEvent('Event');
      inputEvent.initEvent('input', false, false);
      blurEvent.initEvent('blur', false, false);

      const string = 'FooBar';
      for (let i = 0, l = string.length; i < l; i++) {
        testInput.value = testInput.value + string[i];
        testInput.dispatchEvent(inputEvent);
      }

      expect(field.$dirty).to.be.false;
      expect(spyIsValid.calledOnce).to.be.false;

      testInput.dispatchEvent(blurEvent);
      expect(spyIsValid.calledOnce).to.be.true;
      expect(field.$dirty).to.be.true;

      ValidPlus.Field.prototype.isValid.restore();
    });

    it('Should accept vp-params to toggle options', function() {
      testField.setAttribute('vp-dirty', true);
      testField.setAttribute('vp-blur', false);
      testField.setAttribute('vp-watch', false);

      let field = new ValidPlus.Field(testField, {}, [], {
        Invalid: {
          Message: 'Foo',
        },
      });

      expect(field.$options.DirtyOnBlur).to.be.true;
      expect(field.$options.ValidateOn.blur).to.be.false;
      expect(field.$options.Watch).to.be.false;
    });

    it('Should validate on blur if set, regardless of watch', function() {
      let blurEvent = window.document.createEvent('Event');
      blurEvent.initEvent('blur', false, false);

      testField.setAttribute('vp-blur', true);
      testField.setAttribute('vp-watch', false);

      testInput.setAttribute('required', true);

      let field = new ValidPlus.Field(testField, {}, [], {
        isInvalid: {
          message: 'Foo',
        },
      });

      testInput.value = 'Bar';
      expect(field.$isValid).to.equal(null);
      testInput.dispatchEvent(blurEvent);
      expect(field.$isValid).to.equal(true);
      testInput.value = '';
      expect(field.$isValid).to.equal(true);
      testInput.dispatchEvent(blurEvent);
      expect(field.$isValid).to.equal(false);
    });

    it('Should validate input based on pattern attribute', function() {
      testInput.setAttribute('pattern', '[0-9]{5}');

      let field = new ValidPlus.Field(testField, {
        Watch: true
      }, [], {
        isInvalid: {
          message: 'Hello, World',
        },
      });

      let inputEvent = window.document.createEvent('Event');
      inputEvent.initEvent('input', false, false);

      testInput.value = 'notanumber';
      testInput.dispatchEvent(inputEvent);
      expect(field.$isValid).to.be.false;

      testInput.value = '09101';
      testInput.dispatchEvent(inputEvent);
      expect(field.$isValid).to.be.true;

      testInput.value = '00';
      testInput.dispatchEvent(inputEvent);
      expect(field.$isValid).to.be.false;
    });
  });
});
