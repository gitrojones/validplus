<template>
<form ref="form" class="ui form" @submit="validationCheck">
  <div ref="name" class="field">
    <label for="full-name" class="name">Full Name</label>
    <input type="text" id="full-name"
           placeholder="Full Name"
           required="true"
           v-model="data.name">
  </div>

  <div ref="email" class="field">
    <label for="email" class="name">Email Address</label>
    <input type="text" id="email"
           placeholder="Email Address"
           required="true"
           :pattern="emailRegex"
           v-model="data.email">
  </div>

  <div ref="age" class="field">
    <label for="age" class="name">Age</label>
    <input type="tel" id="age" placeholder="Age" v-model.number="data.age">
  </div>

  <div ref="confirm" class="field">
    <label for="confirm">I agree with the <a href="#">Terms & Conditions</a> and have read the <a href="#">Privacy Policy</a></label>
    <input class="ui checkbox" type="checkbox" id="confirm" v-model="data.compliance">
  </div>

  <button class="ui button" type="submit">
    Submit Form
  </button>
</form>
</template>

<script>
import * as VP from 'validplus';

export default {
  data () {
    return {
      validator: undefined,
      isValid: undefined,
      data: {
        name: undefined,
        age: undefined,
        email: undefined,
        compliance: undefined
      },
      emailRegex: /.+@.+\..+/
    }
  },
  mounted () {
    this.initValidator();
  },
  methods: {
    initValidator() {
      const validator = this.validator = new VP.Validator(this.$refs.form);

      const NameField = new VP.Fieldset(this.$refs.name, new VP.Fieldset.Options({
        FieldClass: 'field',
        ValidationStrategy: 'all',
        ValidateVisible: true
      }));
      NameField.findFields();
    },
    validationCheck (e) {
      e.preventDefault();
      e.stopPropagation();

      this.isValid = this.validator.isValid();
    }
  }
}
</script>