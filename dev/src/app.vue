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

        <sui-accordion-title>Complex Form (Async Operations)</sui-accordion-title>
        <sui-accordion-content>
          <simple-form />
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
import simpleForm from './components/forms/simple-form.vue';

export default {
  components: {
    simpleForm
  }
};
</script>

<style lang="less" scoped>
#validation {
  margin-top: 1rem;
}
</style>
