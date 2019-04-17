const { mount, shallowMount, createLocalVue } = require('@vue/test-utils');
const VPVue = require('VPVue').VPVue;
const VP = require('validplus').default;

const EmptyComponent = require('./components/empty').default;
const Validator = VPVue.Validator;
const Fieldset = VPVue.Fieldset;
const Field = VPVue.Field;

describe('VPVue', function() {
  beforeEach(done => {
    done();
  });

  it('Should export Field wrapper component', function() {
    expect(VPVue).to.have.property('Field');
  });
  it('Should export "Field" mixin', function() {
    expect(VPVue.mixins).to.have.property('Field');
  });
  it('Should export Fieldset wrapper component', function() {
    expect(VPVue).to.have.property('Fieldset');
  });
  it('Should export "Fieldset" mixin', function() {
    expect(VPVue.mixins).to.have.property('Fieldset');
  });
  it('Should export Validator wrapper component', function() {
    expect(VPVue).to.have.property('Validator');
  });
  it('Should export "Validatable" mixin', function() {
    expect(VPVue.mixins).to.have.property('Validatable');
  });

  describe('Field', function() {
    it('Should import Validatable mixin', function() {
      const localVue = createLocalVue()
      let FieldMixin = shallowMount(EmptyComponent, {
        localVue,
        mixins: [
          VPVue.mixins.Field 
        ]
      });
      
      expect(FieldMixin.vm.validator instanceof VP.Validator).to.be.true;
      expect(FieldMixin.vm.VPField instanceof VP.Field).to.be.true;
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
