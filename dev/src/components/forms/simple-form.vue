<template>
  <sui-form ref="form" @submit="validationCheck" vp-find>
    <sui-form-field class="VPFieldset" vp-find>
      <div class="VPField">
        <sui-label for="full-name">Full Name</sui-label>
        <sui-input
            type="text"
            id="full-name"
            placeholder="Full Name"
            v-model="data.name"
            required/>
      </div>
    </sui-form-field>

    <sui-form-field class="VPFieldset" vp-find>
      <div class="VPField">
        <sui-label for="email">Email Address</sui-label>
        <sui-input
            type="text"
            id="email"
            placeholder="Email Address"
            v-model="data.email"
            :pattern="emailRegex"
            required/>
      </div>
    </sui-form-field>

    <sui-form-field class="VPFieldset" vp-find>
      <div class="VPField">
        <sui-label for="age">Age</sui-label>
        <sui-input
            id="age"
            type="number"
            placeholder="Age"
            step="1"
            min="13"
            max="120"
            v-model.number="data.age"
            required/>
      </div>
    </sui-form-field>

    <sui-form-field class="VPFieldset" vp-strategy="one" vp-find>
      <div class="VPField">
        <sui-label for="option-one">Option #1</sui-label>
        <sui-input
            id="option-one"
            name="option"
            type="radio"
            value="one"
            @input="data.option_select = $event"
            required />
      </div>
      <div class="VPField">
        <sui-label for="option-two">Option #2</sui-label>
        <sui-input
            id="option-two"
            name="option"
            type="radio"
            value="two"
            @input="data.option_select = $event"
            required />
      </div>
      <div class="VPField">
        <sui-label for="option-three">Option #3</sui-label>
        <sui-input
            id="option-three"
            name="option"
            type="radio"
            value="three"
            @input="data.option_select = $event"
            required />
      </div>
    </sui-form-field>

    <sui-form-field class="VPFieldset" vp-find>
      <div class="VPField">
        <sui-label for="confirm">I agree with the <a href="#">Terms & Conditions</a> and have read the <a href="#">Privacy
          Policy</a></sui-label>
        <sui-checkbox
            id="confirm"
            type="checkbox"
            v-model.number="data.compliance"
            required/>
      </div>
    </sui-form-field>

    <sui-button type="submit">
      Submit Form
    </sui-button>

    <sui-comment v-html="data"></sui-comment>
  </sui-form>
</template>

<script>
import * as VP from 'validplus';

export default {
  data() {
    return {
      default_config: {
        ErrorClassName: 'error',
        ValidClassName: 'success'
      },
      validator: undefined,
      isValid: undefined,
      data: {
        name: undefined,
        age: undefined,
        email: undefined,
        compliance: undefined,
        option_select: undefined
      },
      emailRegex: /.+@.+\..+/
    }
  },
  mounted() {
    this.initValidator();
  },
  methods: {
    initValidator() {
      this.validator = new VP.Validator(this.$refs.form.$el);
    },
    validationCheck(e) {
      e.preventDefault();
      e.stopPropagation();

      this.isValid = this.validator.isValid();
    }
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