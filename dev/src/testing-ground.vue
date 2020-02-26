<template>
<div class="uk-flex uk-width-1-1">
  <div class="uk-card uk-card-body uk-width-1-2">
    <!-- VPVue Bindings for ValidPlus Validator -->
    <div class="VPVue">
      <form action="#" class="testing-ground__wrapper">
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
      </form>
    </div>
  </div>

  <hr class="uk-divider-vertical uk-height-1-1" />

  <div class="uk-card uk-card-body uk-width-1-2">
      <!-- Classic ValidPlus Validator (No VPVue) -->
    <div class="VP">
      <form action="" class="testing-ground__wrapper">
          <!-- Basic Validation -->
          <fieldset class="uk-fieldset">
              <legend class="uk-legend">About Yourself:</legend>

              <!-- Text Input validation -->
              <p class="field-title">Name:</p>
              <div class="uk-flex uk-flex-around">
                  <div class="uk-width-1-2 uk-padding-small">
                      <div class="uk-field field">
                          <input id="name-first" class="uk-input" type="text"
                                 placeholder="First"
                                 v-model="model.name.first" />
                      </div>
                  </div>

                  <div class="uk-width-1-2 uk-padding-small">
                      <div class="uk-field field">
                          <input id="name-last" class="uk-input" type="text"
                                 placeholder="Last"
                                 v-model="model.name.last" />
                      </div>
                  </div>
              </div>

              <!-- Textarea validation -->

              <!-- Radio Validation -->

              <!-- Checkbox Validation -->
          </fieldset>

          <!-- Promise Validation -->
          <!-- Complex Fieldtype Validation (EG. Custom Field) -->
      </form>
    </div>
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
        model: {
            name: {
                first: '',
                last: ''
            },
            contact: {
                phone: '',
                email: '',
                address: {
                    city: '',
                    state: '',
                    street1: '',
                    street2: '',
                    zip: '',
                }
            }
        },
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
@import (css) "https://cdn.jsdelivr.net/npm/uikit@3.3.2/dist/css/uikit.min.css";

* {
  box-sizing: border-box;
}

body {
  display: flex;
  min-height: 100vh;
  margin: 0;
}

.field-title {
    margin-bottom: -0.25rem;
    font-weight: 500;
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
