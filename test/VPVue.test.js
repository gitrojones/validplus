const { mount, shallowMount } = require('@vue/test-utils');
const VPVue = require('VPVue').default;

const TestingGround = require('#/testing-ground').default;
const Fieldset = require('#/components/fieldset').default;
const Field = require('#/components/field').default;

describe('VPVue', function() {
  beforeEach(done => {
    done();
  });

  it('Should export "Field"', function() {
    expect(VPVue).to.have.property('Field');
  });
  it('Should export "Fieldset"', function() {
    expect(VPVue).to.have.property('Fieldset');
  });
  it('Should export "Validatable"', function() {
    expect(VPVue).to.have.property('Validatable');
  });

  describe('Field', function() {
    it('Should import Validatable', function() {
      expect(VPVue.Field).to.have.property('mixins');
      expect(VPVue.Field.mixins[0]).to.equal(VPVue.Validatable);
    });
  });

  describe('TestingGround', function() {
    it('Should import Fieldset', function() {
      let TG = shallowMount(TestingGround);
      expect(TG.find(Fieldset).exists()).to.be.true;
      expect(TG.find(Field).exists()).to.be.true;
    });
  });
});
