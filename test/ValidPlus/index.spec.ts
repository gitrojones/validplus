const ValidPlus = require('validplus').default
// @ts-ignore
const { describe, it } = require('mocha')
const { expect } = require('chai')

const { VPValidatable } = require('./VPValidatable')
const { VPValidator } = require('./VPValidator')
const { VPFieldset } = require('./VPFieldset')
const { VPField } = require('./VPField')

describe('ValidPlus', function () {
  it('Should export VPValidator', function () {
    expect(ValidPlus).to.have.property('Validator')
  })

  it('Should export VPFieldset', function () {
    expect(ValidPlus).to.have.property('Fieldset')
  })

  it('Should export VPField', function () {
    expect(ValidPlus).to.have.property('Field')
  })

  describe('VPValidatable', VPValidatable)
  describe('VPValidator', VPValidator)
  describe('VPFieldset', VPFieldset)
  describe('VPField', VPField)
})
