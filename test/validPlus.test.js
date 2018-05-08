const expect = require('chai').expect
const _ = require('lodash')
const validator = require('../validplus').default

describe('ValidPlus', function () {
  it('Should export "validator" and "FieldsetError"', function () {
    expect(validator).to.have.property('Validator')
    expect(validator).to.have.property('FieldsetError')
  })
})
