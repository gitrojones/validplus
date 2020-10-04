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

describe.each(['Validator', 'Fieldset', 'Field'])('Validatable (%s)', (Validatable) => {
  describe('DOMMessaging', () => {
    test.todo('Implements AddEventListener');
    test.todo('Implements RemoveEventListener');
    test.todo('Implements DispatchEvent');
    test.todo('Implements CreateEvent helper');

    test.todo('AddEventListener adds a listener to the listener property')
    test.todo('RemoveEventListener removes a listener on the listener property');
    test.todo('DispatchEvent fires an event');
    test.todo('CreateEvent creates an event');
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

