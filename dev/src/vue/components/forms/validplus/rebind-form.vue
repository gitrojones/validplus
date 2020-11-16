<template>
  <sui-form ref="form" @submit="validationCheck" vp-find>
    <sui-form-field class="VPFieldset" vp-find v-if="active_field">
      <div class="VPField">
        <sui-label for="full-name">Full Name</sui-label>
        <sui-input v-if="active_input"
            type="text"
            id="full-name"
            placeholder="Full Name"
            v-model="data.name"
            required/>
      </div>

      <sui-button type="button" @click="toggleActiveInputs">
        Remove Input
      </sui-button>
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

    <div class="sui-container">
      <sui-button type="submit">
        Submit Form
      </sui-button>

      <sui-button type="button" @click="toggleActiveFields">
        Toggle Active Fields
      </sui-button>
    </div>
    <h1 class="title">Form Valid: {{typeof isValid === 'boolean' ? isValid : true}}</h1>
  </sui-form>
</template>

<script>
export default {
  watch: {
    active_validatable: {
      handler (new_val) {
        this.$emit('validatable', new_val)
      },
      immediate: true
    }
  },
  data() {
    return {
      default_config: {
        ErrorClassName: 'error',
        ValidClassName: 'success'
      },
      validator: undefined,
      isValid: undefined,
      active_field: true,
      active_input: true,
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
    toggleActiveInputs() {
      this.active_input = !this.active_input;
    },
    toggleActiveFields() {
      this.active_field = !this.active_field;

      // Rebind fields which were removed
      this.$nextTick(() => this.validator.findFieldsets());
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
