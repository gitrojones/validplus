export default {
  props: {
    validator: {
      type: Object,
      default () {
        if (this.VPNewValidator) {
          this.VPProvideValidator = true
        }

        return this.VPValidator
      }
    }
  },
  beforeMount () {
    this.VP = require('validplus').default
  },
  mounted () {
    if (this.VPNewValidator) {
      this.validator.element = this.$el
    }
  },
  provide () {
    let providing = {}
    if (this.VPProvideValidator) providing.VPValidator = this.validator
    return providing
  },
  inject: {
    VPValidator: {
      default () {
        this.VPNewValidator = true
        console.log('[VPVue] Validator not provided, injecting new validator.')
        const VP = require('validplus').default
        return new VP.Validator({})
      }
    }
  },
  methods: {
    VPCreateField (el, options, rules, onValidation) {
      return new this.VP.Field(el, options, rules, onValidation)
    },
    VPCreateFieldset (el, strategy, options, fields, onValidation) {
      const fieldset = this.validator.createFieldset(el, strategy, options, fields, onValidation)
      this.VPFieldSets.push(fieldset)

      return fieldset
    },
    VPisValid () {
      if ((this.VPField && this.VPField.isValid()) ||
          (this.VPFieldset && this.VPFieldset.isValid()) ||
          this.validator.isValid()) {
        this.$nextTick(() => {
          this.$emit('isValid')
        })

        return true
      }

      return false
    }
  },
  beforeDestroy () {
    this.VPFieldSets.forEach((fs) => {
      console.log('[VPVue] Cleaning up fieldsets', fs)
      this.validator.removeFieldset(fs)
    })
  },
  data () {
    return {
      VPFieldSets: []
    }
  }
}
