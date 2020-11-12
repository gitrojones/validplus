<template>
  <sui-form ref="form" @submit="validationCheck">
    <sui-form-field ref="phone" class="VPFieldset">
      <div class="VPField">
        <sui-label for="phone">Phone Number</sui-label>
        <sui-input type="tel" id="phone"
            placeholder="Phone Number"
            v-model="data.phone"
            required/>
      </div>
    </sui-form-field>

    <sui-form-field ref="zipcode" class="VPFieldset">
      <div class="VPField">
        <sui-label for="zipcode">Zipcode</sui-label>
        <sui-input type="tel" id="zipcode"
                   placeholder="ZIP Code"
                   v-model="data.zipcode"
                   required/>
      </div>
    </sui-form-field>

    <div class="sui-container">
      <sui-button type="submit">
        Submit Form
      </sui-button>
    </div>
    <h1 class="title">Form Valid: {{typeof isValid === 'boolean' ? isValid : true}}</h1>
  </sui-form>
</template>

<script>
// import * as VP from 'validplus';

export default {
  data() {
    return {
      validator: undefined,
      isValid: undefined,
      data: {
        phone: undefined,
        zipcode: undefined
      }
    }
  },
  mounted() {
    this.initValidator();
  },
  methods: {
    initValidator() {
      const validator = this.validator = new VP.Validator(this.$refs.form.$el);
      const phoneFieldset = validator.createFieldset(this.$refs.phone.$el);
      phoneFieldset.findFields({
        CustomRules: [
          (attrs, el, input) => {
            const value = attrs.value.replace(/[^0-9]/g, '')
            return value.length === 10 ? true : 'Phone number must be 10 digits'
          },
          (attrs, el, input) => {
            const value = attrs.value.replace(/[^0-9]/g, '')

            let valid = true
            const area_code = value.substr(0, 3)
            const local = value.substr(3, 3)
            const number = value.substr(6, 4)

            // Test Are code
            if (area_code.length === 1) valid = /[2-9]{1}/.test(area_code)
            else if (area_code.length === 2) valid = /[2-9]{1}[0-8]{1}/.test(area_code)
            else if (area_code.length === 3) valid = +area_code >= 200
            if (!valid) return 'Invalid Area Code'

            // Test local
            if (local.length > 0) valid = +(local[0]) >= 2
            else if (local.length === 3) valid = +local !== 555
            if (!valid) return 'Invalid Local Number'

            return valid
          }
        ],
        InputFormatter: {
          pre: (value) => value.replace(/[^0-9]/g, ''),
          post: (value) => {
            const areaCode = value.substr(0, 3);
            const local = value.substr(3, 3);
            const number = value.substr(6, 4);

            let mask = '(';
            if (areaCode.length > 0) mask += areaCode;
            if (local.length > 0) mask += ') ' + local;
            if (number.length > 0) mask += '-' + number;
            return mask;
          }
        }
      });

      const zipcodeFieldset = new VP.Fieldset(this.$refs.zipcode.$el);
      zipcodeFieldset.findFields({
        InputFormatter: {
          pre: (value) => value.replace(/[^0-9]/g, '').substr(0, 5)
        }
      });
      validator.addFieldset(zipcodeFieldset);
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
