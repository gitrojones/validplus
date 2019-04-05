<template>
  <div class="test-fieldset">
    <VPField id="internal" :VPRules="complexRules" :VPOptions="fieldOptions">internal</VPField>

    <!-- External Fields -->
    <slot></slot>
  </div>
</template>

<script>
import VPVue from "VPVue";
import VPField from "./field";

export default {
  props: {
    VPOptions: {
      default() {
        return {
        }
      }
    }
  },
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
      ],
      fieldOptions: {
        Watch: true,
        DirtyOnBlur: false,
        ValidateOn: {
          change: true
        },
        InputFormatter: {
          pre: (el, dispatchEvent) => {
            el.value = el.value.replace(/[^0-9]/g, '')
            if (el.value.length > 5) {
              el.value = el.value.substr(0, 5)
            }

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
