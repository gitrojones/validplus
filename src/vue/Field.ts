import { Validatable } from './Validatable'

export const Field = {
  props: {
    VPOptions: {
      type: Object
    },
    VPRules: {
      type: Array
    },
    VPValid: {
      type: Object
    }
  },
  mixins: [ Validatable ],
  watch: {
    'VPField.$valid': function (isValid) {
      if (isValid) {
        this.$emit('isValid', this)
      } else {
        this.$emit('isInvalid', this)
      }
    }
  },
  mounted () {
    this.VPField = this.VPCreateField(
      this.$el,
      this.VPOptions$,
      this.VPRules$,
      this.VPValid$
    )

    this.$nextTick(() => {
      this.$emit('VPAddField', this.VPField)
    })
  },
  data () {
    return {
      VPField: null,
      VPOptions$: this.VPOptions || {},
      VPRules$: this.VPRules || [],
      VPValid$: this.VPValid || {}
    }
  },
  methods: {
    VPChangeAnchor (el) {
      this.VPField.$options.MessageAnchor = el
      this.VPField.$MessageAnchor = el
      this.VPField.generateMessageNode()
    },

    VPAddRule (rule) {
      if (typeof rule === 'function') {
        this.VPField.$options.CustomRules.push(rule)
      } else {
        console.error('[VPField] Rule must be a function that resolves to a promise')
      }
    },

    VPGatherFields () {
      Object.keys(this.$slots).forEach((slot) => {
        const data = this.$slots[slot]

        data.forEach((field) => {
          if (field._isVue) {
            field.$once('AddField', function (field) {
              this.VPFields.push(field)
            })
          }
        })
      })

      this.$children.forEach((field) => {
        if (field._isVue) {
          field.$once('AddField', function (field) {
            this.VPFields.push(field)
          })
        }
      })
    }
  }
}
