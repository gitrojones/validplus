import * as sinon from 'sinon';
import {
  beforeEach,
  describe,
  test
} from '@jest/globals';
import {
  expect
} from 'chai';

import {hasAsync} from 'src/util/hasAsync';

describe('HasAsync', () => {
  test('Should identify a promise within a pure collection', () => {
    const promises = [
      new Promise((resolve) => resolve()),
      new Promise((resolve) => resolve(new Error('Should not be called')))
    ];
    expect(hasAsync(promises)).to.be.true;
  });

  test('Should identify a promise within a mixed collection', () => {
    const promises = [null, new Promise((resolve) => resolve()), 123, undefined];
    expect(hasAsync(promises)).to.be.true;
  });

  test('Should identify no promise within a mixed collection', () => {
    const promises = [null, 123, undefined];
    expect(hasAsync(promises)).to.be.false;
  });

  test('Should identify an empty collection as false', () => {
    const promises = [] as any[];
    expect(hasAsync(promises)).to.be.false;
  });
});