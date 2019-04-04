<template>
  <div class="test-fieldset">
    <VPField id="internal" :VPRules="complexRules">internal</VPField>

    <!-- External Fields -->
    <slot></slot>
  </div>
</template>

<script>
import VPVue from "VPVue";
import VPField from "./field";

export default {
  props: {},
  mixins: [VPVue.Fieldset],
  data() {
    return {
      complexRules: [
        (atttributes, element, input) => {
          return new Promise((resolve, reject) => {
            window.setTimeout(() => {
              resolve('Invalid promise error')
            }, 2000)
          })
        }
      ]
    };
  },
  components: {
    VPField
  }
};
</script>

<style lang="less" scoped>
</style>
