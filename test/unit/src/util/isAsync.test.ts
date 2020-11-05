import * as sinon from 'sinon';
import {
  beforeEach,
  describe,
  test
} from '@jest/globals';
import {
  expect
} from 'chai';

import {isAsync} from 'src/util/isAsync';

describe('IsAsync', () => {
  test('Should identify a native promise', () => {
    const promise = new Promise((resolve) => resolve());
    expect(isAsync(promise)).to.be.true;
  });

  test('Should identify an async promise', () => {
    expect(isAsync(async function() { return; })).to.be.true;
  });

  test('Should identify an anonymous async promise', () => {
    expect(isAsync(async () => undefined)).to.be.true;
  });

  test('Should identify a lack of promise', () => {
    expect(isAsync('Hello World')).to.be.true;
  });

  test('Should accept a promise-like object', () => {
    expect(isAsync({ then: () => undefined })).to.be.true;
  });
});