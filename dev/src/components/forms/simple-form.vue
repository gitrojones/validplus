<template>
  <sui-form class="is-relative" ref="form" @submit="validationCheck" vp-find>
    <sui-label @click="active_validatable = validator">
      <sui-icon name="caret left" />
      Validator Controls
    </sui-label>
    <ValidationControls :validatable="active_validatable" />

    <sui-form-field class="VPFieldset" vp-find>
      <sui-label @click="active_validatable = nth(validator.$fieldsets, 0)">
        <sui-icon name="caret left" />
        Fieldset Controls
      </sui-label>

      <div class="VPField">
        <sui-label for="full-name" @click="active_validatable = nth(nth(validator.$fieldsets, 0).$fields, 0)">
          <sui-icon name="caret left" />
          Field Controls
        </sui-label>

        <div class="wrapper">
          <label for="full-name">Full Name</label>
          <sui-input
              type="text"
              id="full-name"
              placeholder="Full Name"
              v-model="data.name"
              required />
        </div>
      </div>
    </sui-form-field>

    <sui-form-field class="VPFieldset" vp-find>
      <sui-label @click="active_validatable = nth(validator.$fieldsets, 1)">
        <sui-icon name="caret left" />
        Fieldset Controls
      </sui-label>

      <div class="VPField">
        <sui-label for="full-name" @click="active_validatable = nth(nth(validator.$fieldsets, 1).$fields, 0)">
          <sui-icon name="caret left" />
          Field Controls
        </sui-label>

        <div class="wrapper">
          <label for="email">Email Address</label>
          <sui-input
              id="email"
              type="email"
              placeholder="Email Address"
              title="Domain must be one of [&quot;nextgenleads&quot;, &quot;controlgroup&quot;]."
              v-model="data.email"
              :pattern="emailRegex"
              required/>
        </div>
      </div>
    </sui-form-field>

    <sui-form-field class="VPFieldset" vp-find>
      <sui-label @click="active_validatable = nth(validator.$fieldsets, 2)">
        <sui-icon name="caret left" />
        Fieldset Controls
      </sui-label>

      <div class="VPField">
        <sui-label for="full-name" @click="active_validatable = nth(nth(validator.$fieldsets, 2).$fields, 0)">
          <sui-icon name="caret left" />
          Field Controls
        </sui-label>

        <div class="wrapper">
          <label for="age">Age</label>
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
      </div>
    </sui-form-field>

    <sui-form-field class="VPFieldset" vp-find>
      <sui-label @click="active_validatable = nth(validator.$fieldsets, 3)">
        <sui-icon name="caret left" />
        Fieldset Controls
      </sui-label>

      <div class="VPField">
        <sui-label for="full-name" @click="active_validatable = nth(nth(validator.$fieldsets, 3).$fields, 0)">
          <sui-icon name="caret left" />
          Field Controls
        </sui-label>

        <div class="wrapper">
          <label for="graduation_date">Graduation Date</label>
          <sui-input
            id="graduation_date"
            type="date"
            placeholder="Graudation Date"
            min="2018-01-01"
            :max="new Date().toISOString().slice(0, 10)"
            v-model="data.graduation_date"
            required/>
        </div>
      </div>
    </sui-form-field>

    <sui-form-field class="VPFieldset" vp-strategy="one" vp-find>
      <sui-label @click="active_validatable = nth(validator.$fieldsets, 4)">
        <sui-icon name="caret left" />
        Fieldset Controls
      </sui-label>

      <div class="VPField">
        <sui-label for="full-name" @click="active_validatable = nth(nth(validator.$fieldsets, 4).$fields, 0)">
          <sui-icon name="caret left" />
          Field #1 Controls
        </sui-label>

        <div class="wrapper">
          <label for="option-one">Option #1</label>
          <sui-input
            id="option-one"
            name="option"
            type="radio"
            value="one"
            @input="data.option_select = $event"
            required />
        </div>
      </div>
      <div class="VPField">
        <sui-label for="full-name" @click="active_validatable = nth(nth(validator.$fieldsets, 4).$fields, 1)">
          <sui-icon name="caret left" />
          Field #2 Controls
        </sui-label>

        <div class="wrapper">
          <label for="option-two">Option #2</label>
          <sui-input
            id="option-two"
            name="option"
            type="radio"
            value="two"
            @input="data.option_select = $event"
            required />
        </div>
      </div>
      <div class="VPField">
        <sui-label for="full-name" @click="active_validatable = nth(nth(validator.$fieldsets, 4).$fields, 2)">
          <sui-icon name="caret left" />
          Field #3 Controls
        </sui-label>

        <div class="wrapper">
          <label for="option-three">Option #3</label>
          <sui-input
            id="option-three"
            name="option"
            type="radio"
            value="three"
            @input="data.option_select = $event"
            required />
        </div>
      </div>
    </sui-form-field>

    <sui-form-field class="VPFieldset" vp-find>
      <sui-label @click="active_validatable = nth(validator.$fieldsets, 5)">
        <sui-icon name="caret left" />
        Fieldset Controls
      </sui-label>

      <div class="VPField">
        <sui-label for="full-name" @click="active_validatable = nth(nth(validator.$fieldsets, 5).$fields, 0)">
          <sui-icon name="caret left" />
          Field Controls
        </sui-label>

        <div class="wrapper">
          <label for="choice">Preference (Wrapper)</label>
          <sui-input id="choice" name="choice" type="hidden" :value="data.choice" required />
          <sui-dropdown
            placeholder="Select an option"
            :options="options"
            selection
            v-model="data.choice" />
        </div>
      </div>
    </sui-form-field>

    <sui-form-field class="VPFieldset" vp-find>
      <sui-label @click="active_validatable = nth(validator.$fieldsets, 6)">
        <sui-icon name="caret left" />
        Fieldset Controls
      </sui-label>

      <div class="VPField">
        <sui-label for="full-name" @click="active_validatable = nth(nth(validator.$fieldsets, 6).$fields, 0)">
          <sui-icon name="caret left" />
          Field Controls
        </sui-label>

        <div class="wrapper">
          <label for="choice_native">Preference (Native)</label>
          <select id="choice_native" name="choice_native"
                  v-model="data.native_choice"
                  required>
            <option disabled selected :value="undefined">Select an option</option>
            <option v-for="(choice, index) in options" :key="index" :value="choice.value">
              {{ choice.text }}
            </option>
          </select>
        </div>
      </div>
    </sui-form-field>

    <sui-form-field class="VPFieldset" vp-find>
      <sui-label @click="active_validatable = nth(validator.$fieldsets, 7)">
        <sui-icon name="caret left" />
        Fieldset Controls
      </sui-label>

      <div class="VPField">
        <sui-label for="full-name" @click="active_validatable = nth(nth(validator.$fieldsets, 7).$fields, 0)">
          <sui-icon name="caret left" />
          Field Controls
        </sui-label>

        <div class="wrapper">
          <label for="choice_native_multiple">Preference (Native Multiple)</label>
          <select id="choice_native_multiple" name="choice_native_multiple"
                  v-model="data.native_choice_multi"
                  multiple
                  required>
            <option disabled selected :value="undefined">Select an option</option>
            <option v-for="(choice, index) in options" :key="index" :value="choice.value">
              {{ choice.text }}
            </option>
          </select>
        </div>
      </div>
    </sui-form-field>

    <sui-form-field class="VPFieldset" vp-find>
      <sui-label @click="active_validatable = nth(validator.$fieldsets, 8)">
        <sui-icon name="caret left" />
        Fieldset Controls
      </sui-label>

      <div class="VPField">
        <sui-label for="full-name" @click="active_validatable = nth(nth(validator.$fieldsets, 8).$fields, 0)">
          <sui-icon name="caret left" />
          Field Controls
        </sui-label>

        <div class="wrapper">
          <label for="confirm">I agree with the <a href="#">Terms & Conditions</a> and have read the <a href="#">Privacy
            Policy</a></label>
          <sui-checkbox
              id="confirm"
              type="checkbox"
              v-model.number="data.compliance"
              required/>
        </div>
      </div>
    </sui-form-field>

    <sui-button type="submit">
      Submit Form
    </sui-button>

    <h1 class="title">Form Valid: {{typeof isValid === 'boolean' ? isValid : true}}</h1>
  </sui-form>
</template>

<script>
// import * as VP from 'validplus';
import ValidationControls from "../ValidationControls";

export default {
  data() {
    return {
      default_config: {
        ErrorClassName: 'error',
        ValidClassName: 'success'
      },
      active_validatable: undefined,
      validator: undefined,
      isValid: undefined,
      options: [
        { text: 'Option #1', value: 1 },
        { text: 'Option #2', value: 2 },
        { text: 'Option #3', value: 3 }
      ],
      data: {
        name: undefined,
        age: undefined,
        email: undefined,
        compliance: undefined,
        graduation_date: undefined,
        choice: undefined,
        native_choice: undefined,
        native_choice_multi: [],
        option_select: undefined
      },
      emailRegex: /.+@(nextgenleads|controlgroup)\..+/
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
    },
    validationCheck(e) {
      e.preventDefault();
      e.stopPropagation();

      this.isValid = this.validator.isValid();
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