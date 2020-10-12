import * as sinon from 'sinon';
import {
  beforeEach,
  describe,
  test
} from '@jest/globals';
import {
  expect
} from 'chai';

import {toRegexp} from 'src/util/casts/toRegexp';

describe('ToRegexp', () => {
  test('Should parse the passsed parameter to a regex', () => {
    const stringRegex = toRegexp('/foo/') as RegExp;
    const stringRegexTwo = toRegexp('foo') as RegExp;
    expect(stringRegex.test('foo')).to.be.true;
    expect(stringRegexTwo.test('foo')).to.be.true;
  });

  test('Should parse string flags in /<regex>/<flags> format', () => {
    const caseInsensitiveStringRegex = toRegexp('/Foo/i') as RegExp;
    expect(caseInsensitiveStringRegex.ignoreCase).to.be.true;
    expect(caseInsensitiveStringRegex.test('fOo')).to.be.true;
  });

  test('Should return the original value if its already a RegExp', () => {
    const regex = new RegExp('foo');
    expect(toRegexp(regex)).to.equal(regex);
  });

  test('Should return null if the test value isnt parsable', () => {
    expect(toRegexp({})).to.be.null;
  });
});
