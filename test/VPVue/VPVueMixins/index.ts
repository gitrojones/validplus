const { shallowMount } = require('@vue/test-utils')
const { describe, it } = require('mocha')
const { expect } = require('chai')

const VPVueMixinsForm = require('#/Forms/VPVueMixins').default
const Fieldset = require('#/Components/Fieldset').default
const Field = require('#/Components/Field').default
const VPVue = require('VPVue').default
export default function () {
  describe('Properties', function () {
    let Form
    beforeEach(() => {
      Form = shallowMount(VPVueMixinsForm)
    })

    it('Should consume the Validatable Mixin', function () {
      expect(VPVueMixinsForm.mixins[0]).to.equal(VPVue.mixins.Validatable)
    })

    describe('Components', function () {
      describe('Field', function () {
        it('Should consume the Field Mixin', function () {
          expect(Field.mixins[0]).to.equal(VPVue.mixins.Field)
        })
      })

      describe('Fieldset', function () {
        it('Should consume the Fieldset Mixin', function () {
          expect(Fieldset.mixins[0]).to.equal(VPVue.mixins.Fieldset)
        })
      })
    })
  })
}
