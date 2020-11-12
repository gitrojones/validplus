<template>
  <sui-container class="ValidationControls" v-if="validatable">
    <h2>{{name}} Controls <sui-icon @click="active = !active" :name="isActive ? 'angle up' : 'angle down'" /></h2>
    <sui-divider />

    <template v-if="isActive">
      <sui-form-field>
        <sui-label>Valid Message</sui-label>
        <sui-input
            placeholder="Valid Message"
            v-model="options.Lifecycle.Valid.Message" />
      </sui-form-field>

      <sui-form-field>
        <sui-label>Invalid Message</sui-label>
        <sui-input
            label="Invalid Message"
            placeholder="Error Message"
            v-model="options.Lifecycle.Invalid.Message" />
      </sui-form-field>

      <sui-form-field>
        <sui-dropdown
            label="Message Position"
            :options="position_options"
            v-model="options.MessagePOS" />
      </sui-form-field>

      <sui-form-fields v-if="isValidator">
        <sui-form-field>
          <sui-checkbox
              label="Validate Lazy"
              v-model="options.ValidateLazy" />
        </sui-form-field>

        <sui-form-field>
          <sui-checkbox
              label="Validate Visible"
              v-model="options.ValidateVisible" />
        </sui-form-field>
      </sui-form-fields>

      <sui-form-fields v-if="isFieldset">
        <sui-form-field>
          <sui-checkbox
              label="Validate Lazy"
              v-model="options.ValidateLazy" />
        </sui-form-field>
      </sui-form-fields>

      <sui-form-fields grouped v-if="isField">
        <sui-form-field>
          <sui-checkbox
              label="Notify Parent"
              v-model="options.Notify" />
        </sui-form-field>

        <sui-divider />

        <sui-form-fields v-for="(type, index) in ['DirtyOn', 'FormatOn', 'ValidateOn']" :key="index" grouped>
          <label>{{type}}</label>
          <sui-form-field>
            <sui-checkbox label="Blur" v-model="options[type].blur" />
          </sui-form-field>

          <sui-form-field>
            <sui-checkbox label="Input" v-model="options[type].input" />
          </sui-form-field>

          <sui-form-field>
            <sui-checkbox label="Change" v-model="options[type].change" />
          </sui-form-field>

          <sui-form-field>
            <sui-checkbox label="mouseleave" v-model="options[type].mouseleave" />
          </sui-form-field>
        </sui-form-fields>

        <sui-divider />

        <sui-form-field>
          <sui-checkbox label="Show field rule errors?" v-model="options.ShowFieldRuleErrors" />
        </sui-form-field>

        <sui-form-field>
          <sui-checkbox label="Show custom rule errors?" v-model="options.ShowCustomRuleErrors" />
        </sui-form-field>

        <sui-form-field>
          <sui-checkbox label="Validate field rules lazily?" v-model="options.ValidateLazyFieldRules" />
        </sui-form-field>

        <sui-form-field>
          <sui-checkbox label="Validate custom rules lazily?" v-model="options.ValidateLazyCustomRules" />
        </sui-form-field>
      </sui-form-fields>
    </template>
  </sui-container>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
// import * as VP from 'validplus';

export default {
  props: {
    title: {
      type: String,
    },
    validatable: {
      type: Object
    }
  },
  watch: {
    validatable: {
      handler (new_val) {
        if (!this.initial_options && new_val && new_val.$options) {
          this.initial_options = cloneDeep(new_val.$options);
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      active: true,
      position_options: [
        { text: 'Top', value: 'TOP' },
        { text: 'Bottom', value: 'BOTTOM' }
      ],
      initial_options: null
    };
  },
  computed: {
    options () { return this.validatable ? this.validatable.$options : {} },

    isActive () { return this.active },
    isValidator () { return this.validatable instanceof VP.Validator },
    isFieldset () { return this.validatable instanceof VP.Fieldset },
    isField () { return this.validatable instanceof VP.Field },

    name () {
      if (this.title) return this.title;
      if (this.isValidator) return 'Validator';
      if (this.isFieldset) return 'Fieldset';
      if (this.isField) return 'Field';
      return '';
    }
  }
}
</script>

<style lang="less" scoped>
@width: 250px;
.ValidationControls {
  position: absolute;
  width: @width;
  left: -(@width + 50px);
}
</style>