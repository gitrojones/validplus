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
    let fakeElement: HTMLElement;
    let fakeInput: HTMLInputElement;

    beforeEach(async () => {
      fakeElement = window.document.createElement('div');
      fakeInput = window.document.createElement('input');
      fakeElement.appendChild(fakeInput);
    });

    describe('AddEventListener', () => {
      test('Implements AddEventListener', () => {
        const validator = new VP[Validatable](fakeElement);
        expect(typeof validator.addEventListener).to.equal('function');
      });

      test('Should store an event listener when added', () => {
        const validator = new VP[Validatable](fakeElement);
        const fakeFunc = () => null;

        validator.addEventListener('test', fakeFunc);
        expect(validator.$listeners['test'][0]).to.equal(fakeFunc);
      });
    });

    describe('RemoveEventListener', () => {
      test('Implements RemoveEventListener', () => {
        const validator = new VP[Validatable](fakeElement);
        expect(typeof validator.removeEventListener).to.equal('function');
      });

      test('Should remove an event listener from the event stack', () => {
        const validator = new VP[Validatable](fakeElement);
        const fakeFuncs = Array.from(new Array(3), (_) => () => _);

        fakeFuncs.forEach((func) => {
          validator.addEventListener('test', func);
        });
        const func = validator.removeEventListener('test', fakeFuncs[1]);
        expect(func).to.equal(fakeFuncs[1]);
        expect(validator.$listeners['test'][0]).to.equal(fakeFuncs[0]);
        expect(validator.$listeners['test'][1]).to.equal(fakeFuncs[2]);
      });

      test('Should return null if no matching listener is found', () => {
        const validator = new VP[Validatable](fakeElement);
        const func = validator.removeEventListener('test', () => null);
        expect(func).to.be.null;
      });
    });

    describe('DispatchEvent', () => {
      test('Implements DispatchEvent', () => {
        const validator = new VP[Validatable](fakeElement);
        expect(typeof validator.dispatchEvent).to.equal('function');
      });

      test('Should dispatch an event if exists', () => {
        const validator = new VP[Validatable](fakeElement);
        const spyTestFunc = sinon.spy();

        validator.addEventListener('test', spyTestFunc);
        validator.dispatchEvent(validator.createEvent('test'));

        expect(spyTestFunc).to.be.called;
      });

      test('Should pass data to the callback if event is dispatched with data', () => {
        const validator = new VP[Validatable](fakeElement);
        const spyTestFunc = sinon.spy();
        const data = { foo: 123 };

        validator.addEventListener('test', spyTestFunc);
        validator.dispatchEvent(validator.createEvent('test'), data);

        expect(spyTestFunc.calledWith(data));
      });

      test('Should return boolean to indicate if cancellable', () => {
        const validator = new VP[Validatable](fakeElement);
        const testFunc = (e: Event) => e.preventDefault();

        validator.addEventListener('test', testFunc);
        const uncancelled = validator.dispatchEvent(
          validator.createEvent('test', { cancelable: true }));
        const notCancellable = validator.dispatchEvent(
          validator.createEvent('test', { cancelable: false }));

        expect(uncancelled).to.be.false;
        expect(notCancellable).to.be.true;
      });

      test('Should return true if event does not exist', () => {
        const validator = new VP[Validatable](fakeElement);
        const cancellable = validator.dispatchEvent(validator.createEvent('test'));
        expect(cancellable).to.be.true;
      });
    });

    describe('CreateEvent', () => {
      test('Implements CreateEvent helper', () => {
        const validator = new VP[Validatable](fakeElement);
        expect(typeof validator.createEvent).to.equal('function');
      });

      test('Should return a new event that is dispatchable', () => {
        const validator = new VP[Validatable](fakeElement);
        expect(validator.createEvent('test')).to.be.instanceOf(Event);
      });
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

