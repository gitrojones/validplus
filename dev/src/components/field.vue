<template>
  <div class="test-field">
    <slot></slot>
    <input id="testField" name="test" type="text" :value="value" required="true">
    <button @click="VPField.isValid()">Validate</button>

    <div class="error-anchor">
      <div class="errors" ref="errors"></div>
    </div>
  </div>
</template>

<script>
import VPVue from "VPVue";

export default {
  props: {
    value: {
      default: null
    },
    VPOptions: {
      default() {
        return {
        }
      }
    }
  },
  mixins: [VPVue.Field],
  data() {
    return {};
  },
  beforeCreate() {
    this.VPOptions$ = {
      Lifecycle: {
        Invalid: {
          Message: 'Invalid Field'
        },
        Valid: {
          Message: 'Valid Field'
        }
      }
    }
  },
  mounted() {
    this.VPChangeAnchor(this.$refs.errors)
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.test-field {
  &.-isError {
    color: red;
  }
  &.-isValid {
    color: green;
  }
}
</style>
