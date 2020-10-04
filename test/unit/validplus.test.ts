import * as sinon from 'sinon';
import {
  beforeAll,
  describe,
  test
} from '@jest/globals';
import {
  expect
} from 'chai';
import * as VP from 'validplus';

describe('ValidPlus', () => {
  test('Should export a Form Validator', () => {
    expect(typeof VP.Validator).to.equal('function');
  });

  test('Should export a Fieldset Validator', () => {
    expect(typeof VP.Fieldset).to.equal('function');
  });

  test('Should export a Field Validator', () => {
    expect(typeof VP.Field).to.equal('function');
  });
});

