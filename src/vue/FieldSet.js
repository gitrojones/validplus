import Validatable from './Validatable'

export default {
  props: {
    VPStrategy: [ Function, String ],
    VPOptions: Object,
    VPValid: Object,
    VPFields: {
      type: Array,
      default () { return [] }
    }
  },
  mixins: [ Validatable ],
  mounted () {
    this.VPFieldset = this.VPCreateFieldset(this.$el, 'all', this.VPOptions, this.VPFields, this.VPValid)
    this.VPGatherFields()
  },
  data () {
    return {
      VPFieldset: null
    }
  },
  methods: {
    VPGatherFields () {
      Object.keys(this.$slots).forEach((slot) => {
        const data = this.$slots[slot]

        data.forEach((field) => {
          if (field._isVue) {
            field.$once('VPAddField', (field) => {
              this.VPFieldset.addField(field)
            })
          }
        })
      })

      this.$children.forEach((field) => {
        if (field._isVue) {
          field.$once('VPAddField', (field) => {
            this.VPFieldset.addField(field)
          })
        }
      })
    }
  }
}
