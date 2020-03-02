<template>
  <div class="test-fieldset">
    <VPField id="internal" :VPRules="complexRules" :VPOptions="fieldOptions" :value="test">internal</VPField>

    <!-- External Fields -->
    <slot></slot>
  </div>
</template>

<script>
import VPVue from "VPVue";
import VPField from "./Field";

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
  mixins: [VPVue.mixins.Fieldset],
  data() {
    return {
      pre: 0,
      post: 0,
      test: 'foo bar',
      complexRules: [
        (atttributes, element, input) => {
          return true
          return new Promise((resolve, reject) => {
            window.setTimeout(() => {
              resolve('Invalid promise error')
            }, 2000)
          })
        }
      ],
      fieldOptions: {
        InputFormatter: {
          pre: (input, dispatchEvent) => {
            console.log('called pre', this.pre++)
            dispatchEvent('input')
          },
          post: (input, dispatchEvent) => {
            console.log('called post', this.post++)
            dispatchEvent('input')
          }
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
