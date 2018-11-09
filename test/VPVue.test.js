const { mount } = require('@vue/test-utils')
const VPVue = require('VPVue').default
const TestingGround = mount(require('../dev/src/testing-ground.vue').default)

describe('VPVue', function () {
  beforeEach(done => {
    done()
  })

  it('Should export "Field"', function () {
    expect(VPVue).to.have.property('Field')
  })
  it('Should export "Fieldset"', function () {
    expect(VPVue).to.have.property('FieldSet')
  })
  it('Should export "Validatable"', function () {
    expect(VPVue).to.have.property('Validatable')
  })

  it('Should extend a component', function () {
    expect(TestingGround.vm.$data.foo).to.equal('bar')
  })
})
