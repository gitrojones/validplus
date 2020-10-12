import * as sinon from 'sinon';
import {
  beforeEach,
  describe,
  test
} from '@jest/globals';
import {
  expect
} from 'chai';

import {toNumber} from 'src/util/casts/toNumber';

describe('ToNumber', () => {
  test('Should parse the passsed parameter to a number', () => {
    expect(toNumber(123)).to.equal(123);
    expect(toNumber('123')).to.equal(123);
    expect(toNumber(null)).to.equal(0);
  });

  test('Should return the default value if the test value isnt parsable', () => {
    expect(toNumber('Test')).to.be.null;
    expect(toNumber({})).to.be.null;
    expect(toNumber('123-test')).to.be.null;
    expect(toNumber(undefined)).to.be.null;
    expect(toNumber('fasl123')).to.be.null;
  });
});
