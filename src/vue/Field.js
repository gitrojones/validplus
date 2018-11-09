import Validatable from './Validatable'

export default {
  props: {
    VPOptions: Object,
    VPValid: Object
  },
  mixins: [ Validatable ],
  mounted () {
    this.VPField = this.VPCreateField(this.$el, this.VPOptions, this.VPRules, this.VPValid)

    this.$nextTick(() => {
      this.$emit('VPAddField', this.VPField)
    })
  },
  data () {
    return {
      VPField: null
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
