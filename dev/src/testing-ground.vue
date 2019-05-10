<template>
<div class="testing-ground">
  <div class="testing-ground__wrapper">
    <!-- Import components here to test -->
    <vp-fieldset @isValid="remove">
      <span>Hello World</span>

      <vp-field id="external" :VPOptions="validationOptions" :VPValid="valid" value="foo">
        external
      </vp-field>
    </vp-fieldset>

    <vp-fieldset style="marginTop: 2em;">
      <span>Should not Validate</span>

      <vp-field id="external" :VPOptions="validationOptions2" :VPValid="valid" value="foo">
        external
      </vp-field>
    </vp-fieldset>
  </div>
</div>
</template>

<script>
import VPVue from 'VPVue'
import fieldset from '#/components/fieldset'
import field from '#/components/field'

/**
 * @vue-prop {Boolean} test - test value
 */
export default {
  prop: {
    test: Boolean
  },
  mixins: [ VPVue.Validatable ],
  data() {
    return {
      valid: {
        Invalid: {
          Message: 'Invalid!'
        },
        Valid: {
          Message: 'VALID'
        }
      },
      validationOptions: {
        // Options
      },
      validationOptions2: {
        CustomRules: [
          () => new Promise((resolve, reject) => {
            window.setTimeout(() => {
              return resolve(false)
            }, 1000)
          })
        ]
      }
    }
  },
  methods: {
    remove(e) {
      console.log('remove', e, e.VPFieldset)
      this.validator.removeFieldset(e.VPFieldset)
    }
  },
  components: {
    VpFieldset: fieldset,
    VpField: field
  }
}
</script>

<style lang="less">
* {
  box-sizing: border-box;
}

body {
  display: flex;
  min-height: 100vh;
  margin: 0;
}


.testing-ground {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  width: 100%;

  &__wrapper {
    display: flex;
    flex-flow: column;
    flex: 1 1 auto;
  }
}
</style>
