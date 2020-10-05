import * as sinon from 'sinon';
import {
  beforeEach,
  describe,
  test
} from '@jest/globals';
import {
  expect
} from 'chai';
import * as VP from 'validplus';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
describe.each([
  'Validator',
  'Fieldset',
  'Field'
])('Validatable (%s)', (Validatable: ('Validator'|'Fieldset'|'Field')) => {
  /**
   * For DOMMessaging implementation details, see lib/DOMMessaging tests
   */
  describe('DOMMessaging', () => {
    test('Implements AddEventListener', () => {
      const fakeEl = window.document.createElement('div');
      const fakeInput = window.document.createElement('input');
      fakeEl.appendChild(fakeInput);

      const validator = new VP[Validatable](fakeEl);
      expect(typeof validator.addEventListener).to.equal('function');
    });

    test('Implements RemoveEventListener', () => {
      const fakeEl = window.document.createElement('div');
      const fakeInput = window.document.createElement('input');
      fakeEl.appendChild(fakeInput);

      const validator = new VP[Validatable](fakeEl);
      expect(typeof validator.removeEventListener).to.equal('function');
    });

    test('Implements DispatchEvent', () => {
      const fakeEl = window.document.createElement('div');
      const fakeInput = window.document.createElement('input');
      fakeEl.appendChild(fakeInput);

      const validator = new VP[Validatable](fakeEl);
      expect(typeof validator.dispatchEvent).to.equal('function');
    });

    test('Implements CreateEvent helper', () => {
      const fakeEl = window.document.createElement('div');
      const fakeInput = window.document.createElement('input');
      fakeEl.appendChild(fakeInput);

      const validator = new VP[Validatable](fakeEl);
      expect(typeof validator.createEvent).to.equal('function');
    });
  });

  describe('Validation Lifecycle', () => {
    test.todo('Should validate');
    test.todo('Should append Message if Valid/Invalid');
    test.todo('Should append Callback response if Valid/Invalid');
    test.todo('Should pass validation instance to callback');

    describe('Error Handling', () => {
      test.todo('Should append the error class on Invalid');
      test.todo('Should append the valid class on Valid');
      test.todo('Should source error class from options if specified');
      test.todo('Should source valid class from options if specified');
    });
  });

  describe('Standard Validation Options', () => {
  });
});

