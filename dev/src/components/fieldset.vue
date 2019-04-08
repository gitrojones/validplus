<template>
  <div class="test-fieldset">
    <VPField id="internal" :VPRules="complexRules" :VPOptions="fieldOptions" :value="test">internal</VPField>

    <!-- External Fields -->
    <slot></slot>
  </div>
</template>

<script>
import VPVue from "VPVue";
import VPField from "./field";

export default {
  props: {
    VPValid: {
      default() {
        return {
          Valid: {
            CB: [
              () => console.log('valid', this.test)
            ]
          }
        }
      }
    }
  },
  mixins: [VPVue.Fieldset],
  data() {
    return {
      test: 'foo bar',
      complexRules: [
        (atttributes, element, input) => {
          return new Promise((resolve, reject) => {
            window.setTimeout(() => {
              resolve('Invalid promise error')
            }, 2000)
          })
        }
      ],
      fieldOptions: {
        Watch: true,
        DirtyOnBlur: false,
        ValidateOn: {
          change: true
        }
      }
    };
  },
  components: {
    VPField
  }
};
</script>

<style lang="less" scoped>
</style>
