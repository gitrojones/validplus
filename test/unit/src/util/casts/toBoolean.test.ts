import * as sinon from 'sinon';
import {
  beforeEach,
  describe,
  test
} from '@jest/globals';
import {
  expect
} from 'chai';

import {toBoolean} from 'src/util/casts/toBoolean';

describe('ToBoolean', () => {
  test('Should parse the passsed parameter to a boolean', () => {
    expect(toBoolean('false')).to.be.false;
    expect(toBoolean('FaLsE')).to.be.false;
    expect(toBoolean('TruE')).to.be.true;
    expect(toBoolean('TRUE')).to.be.true;
    expect(toBoolean(0)).to.be.false;
    expect(toBoolean(1)).to.be.true;
    expect(toBoolean(200)).to.be.true;
  });

  test('Should return the default value if the test value isnt parsable', () => {
    expect(toBoolean('Test')).to.be.null;
    expect(toBoolean({})).to.be.null;
    expect(toBoolean(undefined)).to.be.null;
  });
});
