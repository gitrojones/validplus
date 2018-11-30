import Validatable from './Validatable'

export default {
  props: {
    VPOptions: {
      type: Object
    },
    VPRules: {
      type: Object
    },
    VPValid: {
      type: Object
    }
  },
  mixins: [ Validatable ],
  watch: {
    'VPField._isValid': function (isValid) {
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
      VPRules$: this.VPRules || {},
      VPValid$: this.VPValid || {}
    }
  },
  methods: {
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
