<template>
  <div class="sui-container">
    <sui-menu :widths="4" align="center">
      <sui-menu-item
          @click="active = 0"
          :active="active === 0"
          link>
        ValidPlus
      </sui-menu-item>

      <sui-menu-item
          @click="active = 1"
          :active="active === 1"
          link>
        VPVue (WIP)
      </sui-menu-item>

      <sui-menu-item
          @click="active = 2"
          :active="active === 2"
          link>
        VPReact (TODO)
      </sui-menu-item>

      <sui-menu-item
          @click="active = 3"
          :active="active === 3"
          link>
        VPAngular (TODO)
      </sui-menu-item>
    </sui-menu>

    <sui-grid id="validation" :columns="2">
      <sui-grid-column>
        <validation-controls :validatable="validatable" />
      </sui-grid-column>

      <sui-grid-column>
        <!-- ValidPlus -->
        <sui-accordion ref="acc" exclusive styled v-if="active === 0">
          <sui-accordion-title>Simple Form (Synchronous Operations)</sui-accordion-title>
          <sui-accordion-content active>
            <simple-form @validatable="setValidatable" v-if="active_acc === 0" />
          </sui-accordion-content>

          <sui-accordion-title>Complex Form (Input Formatters/Custom Synchronous Rules)</sui-accordion-title>
          <sui-accordion-content>
            <formatter-form @validatable="setValidatable" v-if="active_acc === 1" />
          </sui-accordion-content>

          <sui-accordion-title>Rebind Form (Observers IE11+)</sui-accordion-title>
          <sui-accordion-content>
            <rebind-form @validatable="setValidatable" v-if="active_acc === 2" />
          </sui-accordion-content>

          <sui-accordion-title>Complex Form (Input Formatters/Custom Async Rules)</sui-accordion-title>
          <sui-accordion-content>
            <complex-form @validatable="setValidatable" v-if="active_acc === 3" />
          </sui-accordion-content>
        </sui-accordion>

        <!-- VPVue -->
        <sui-accordion ref="acc" exclusive styled v-if="active === 0">
          <sui-accordion-title>Simple Form (Synchronous Operations)</sui-accordion-title>
          <sui-accordion-content active>
            <simple-form-vue @validatable="setValidatable" v-if="active_acc === 0" />
          </sui-accordion-content>

        </sui-accordion>
      </sui-grid-column>
    </sui-grid>
  </div>

</template>

<script>
import simpleForm from './components/forms/validplus/simple-form';
import rebindForm from './components/forms/validplus/rebind-form';
import formatterForm from './components/forms/validplus/formatter-form';
import complexForm from './components/forms/validplus/complex-form';
import ValidationControls from './components/ValidationControls';

export default {
  components: {
    simpleForm,
    rebindForm,
    formatterForm,
    complexForm,
    ValidationControls
  },
  watch: {
    active (new_val) {
      this.render = false;
      this.validatable = null;
      this.$nextTick(() => {
        this.render = true;
      });
    }
  },
  mounted () {
    this.render = true;
  },
  data () {
    return {
      active: 0,
      render: false,
      validatable: null
    }
  },
  methods: {
    setValidatable (validatable) {
      this.validatable = validatable
    }
  },
  computed: {
    active_acc () {
      if (this.render && this.$refs.acc) return this.$refs.acc.active || 0
      return 0;
    }
  }
};
</script>

<style lang="less" scoped>
#validation {
  margin-top: 1rem;
}
</style>
