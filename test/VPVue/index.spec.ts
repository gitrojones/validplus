// @ts-ignore
const { describe, it } = require('mocha')
const { expect } = require('chai')
const VPVue = require('VPVue').default

// const VPVueForm = require('./VPVueForm').default
const VPVueMixins = require('./VPVueMixins').default

describe('VPVue', function () {
  describe('Properties', function () {
    it('Should export default "Field" component', function () {
      expect(VPVue).to.have.property('Field')
    })

    it('Should export default "Fieldset" component', function () {
      expect(VPVue).to.have.property('Fieldset')
    })

    describe('Mixins', function () {
      it('Should export "Field" mixin', function () {
        expect(VPVue.mixins).to.have.property('Field')
      })

      it('Should export "Fieldset" mixin', function () {
        expect(VPVue.mixins).to.have.property('Fieldset')
      })

      it('Should export "Validatable" mixin', function () {
        expect(VPVue.mixins).to.have.property('Validatable')
      })
    })
  })

  // describe('VPVueForm', VPVueForm)
  describe('VPVueMixins', VPVueMixins)
})
