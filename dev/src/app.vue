<template>
  <sui-grid id="validation" :columns="2">
    <sui-grid-column>
      <sui-header align="center">
        ValidPlus - Native
      </sui-header>

      <sui-accordion
        exclusive
        styled
      >
        <sui-accordion-title>Simple Form (Synchronous Operations)</sui-accordion-title>
        <sui-accordion-content active>
          <simple-form />
        </sui-accordion-content>

        <sui-accordion-title>Complex Form (Input Formatters/Custom Synchronous Rules)</sui-accordion-title>
        <sui-accordion-content>
          <formatter-form />
        </sui-accordion-content>

        <sui-accordion-title>Rebind Form (Observers IE11+)</sui-accordion-title>
        <sui-accordion-content>
          <rebind-form />
        </sui-accordion-content>

        <sui-accordion-title>Complex Form (Input Formatters/Custom Async Rules)</sui-accordion-title>
        <sui-accordion-content>
          <complex-form />
        </sui-accordion-content>
      </sui-accordion>
    </sui-grid-column>

    <sui-grid-column>
      <sui-header align="center">
        ValidPlus - VPVue
      </sui-header>
    </sui-grid-column>
  </sui-grid>
</template>

<script>
import simpleForm from './components/forms/simple-form';
import rebindForm from './components/forms/rebind-form';
import formatterForm from './components/forms/formatter-form';
import complexForm from './components/forms/complex-form';

export default {
  components: {
    simpleForm,
    rebindForm,
    formatterForm,
    complexForm
  }
};
</script>

<style lang="less" scoped>
#validation {
  margin-top: 1rem;
}
</style>
