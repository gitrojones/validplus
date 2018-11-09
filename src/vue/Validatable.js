import VP from 'ValidPlus'

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
  provide () {
    if (this.VPProvideValidator) {
      return {
        VPValidator: this.validator
      }
    }
  },
  inject: {
    VPValidator: {
      default () {
        console.log('[VPVue] Validator not provided, injecting new validator.')
        this.VPNewValidator = true

        // SSR Support
        if (process.env.VUE_ENV !== 'server') {
          const VP = require('ValidPlus').default
          return new VP.Validator({})
        } else {
          return null
        }
      }
    }
  },
  methods: {
    VPCreateField (el, options, rules, onValidation) {
      return new VP.Field(el, options, rules, onValidation)
    },
    VPCreateFieldset (el, strategy, options, fields, onvalidation) {
      const fieldset = this.validator.createFieldset(el, strategy, options, fields, onvalidation)
      this.VPFieldSets.push(fieldset)

      return fieldset
    },
    VPisValid () {
      if (this.validator.isValid()) {
        this.$emit('isValid')
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
