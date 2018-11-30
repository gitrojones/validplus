<template>
  <div class="test-fieldset">
    <VPField id="internal">internal</VPField>

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
    return {};
  },
  components: {
    VPField
  }
};
</script>

<style lang="less" scoped>
</style>
