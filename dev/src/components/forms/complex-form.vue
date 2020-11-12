<template>
  <sui-form ref="form" @submit="validationCheck">
    <sui-label @click="active_validatable = validator">
      <sui-icon name="caret left" />
      Validator Controls
    </sui-label>
    <ValidationControls :validatable="active_validatable" />

    <sui-form-field ref="zipcode" class="VPFieldset">
      <sui-label @click="active_validatable = nth(validator.$fieldsets, 0)">
        <sui-icon name="caret left" />
        Fieldset Controls
      </sui-label>

      <div ref="zipcode_field" class="VPField">
        <sui-label @click="active_validatable = nth(nth(validator.$fieldsets, 0).$fields, 0)">
          <sui-icon name="caret left" />
          Field Controls
        </sui-label>

        <div class="wrapper">
          <label for="zipcode">ZIP Code</label>
          <sui-input
            id="zipcode"
            type="text"
            minlength="5"
            maxlength="5"
            placeholder="ZIP Code"
            v-model="data.zipcode"
            required />
        </div>
      </div>
    </sui-form-field>

    <sui-button type="submit">
      Submit Form
    </sui-button>

    <h1 class="title">Form Valid: {{isAsync ? 'Resolving...' : typeof isValid === 'boolean' ? isValid : true}}</h1>
  </sui-form>
</template>

<script>
import * as VP from 'validplus';
import ValidationControls from "../ValidationControls";

export default {
  data() {
    return {
      active_validatable: undefined,
      validator: undefined,
      isValid: undefined,
      isAsync: false,
      options: [
        { text: 'Option #1', value: 1 },
        { text: 'Option #2', value: 2 },
        { text: 'Option #3', value: 3 }
      ],
      data: {
        zipcode: undefined
      }
    }
  },
  mounted() {
    this.initValidator();
    this.active_validatable = this.validator;
  },
  methods: {
    nth(coll, index) {
      if (coll.length > index) return coll[index];
      return undefined;
    },
    initValidator() {
      this.validator = new VP.Validator(this.$refs.form.$el);
      this.validator.createFieldset(this.$refs.zipcode.$el, {}, [
          new VP.Field(this.$refs.zipcode_field, {
            ValidateAsync: true,
            ValidateOn: {
              blur: false
            },
            CustomRules: [
              () => new Promise((resolve) => setTimeout(() =>
                  resolve(Math.random() > 0.5 ? 'Please enter a Valid ZIP Code' : true), 2000))
            ],
            InputFormatter: {
              pre: (value) => value.replace(/[^0-9]/g, '').substr(0, 5)
            }
          })
      ])
    },
    validationCheck(e) {
      e.preventDefault();
      e.stopPropagation();

      this.isAsync = true
      this.validator.isValid().then((isValid) => {
        this.isAsync = false
        this.isValid = isValid
      });
    }
  },
  components: {
    ValidationControls
  }
}
</script>

<style lang="less">
.VPFieldset.-isValid {
  background: fade(green, 10%)!important;
  border: 1px solid green!important;
}

.VPFieldset.-isError {
  background: fade(red, 10%)!important;
  border: 1px solid red!important;
}
</style>