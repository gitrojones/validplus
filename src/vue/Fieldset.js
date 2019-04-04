import { Validatable } from './Validatable'

export const Fieldset = {
  props: {
    VPOptions: {
      type: Object
    },
    VPValid: {
      type: Object
    },
    VPStrategy: {
      type: [ Function, String ]
    },
    VPFields: {
      type: Array
    }
  },
  mixins: [ Validatable ],
  mounted () {
    this.VPFieldset = this.VPCreateFieldset(
      this.$el,
      this.VPStrategy$,
      this.VPOptions$,
      this.VPFields$,
      this.VPValid$
    )

    this.VPGatherFields()
  },
  watch: {
    'VPFieldset._isValid': function (isValid) {
      if (isValid) {
        this.$emit('isValid', this)
      } else {
        this.$emit('isInvalid', this)
      }
    }
  },
  data () {
    return {
      VPFieldset: null,

      VPStrategy$: this.VPStrategy || 'all',
      VPFields$: this.VPFields || [],
      VPOptions$: this.VPOptions || {},
      VPValid$: this.VPValid || {
        Invalid: {
          Message: 'Input is invalid'
        }
      }
    }
  },
  methods: {
    VPChangeAnchor (el) {
      this.VPFieldset.$options.MessageAnchor = el
      this.VPFieldset.$MessageAnchor = el
      this.VPFieldset.generateMessageNode()
    },

    VPGatherFields () {
      Object.keys(this.$slots).forEach((slot) => {
        const data = this.$slots[slot]

        data.forEach((field) => {
          if (field._isVue) {
            field.$once('VPAddField', (VPField) => {
              this.VPFieldset.addField(VPField)
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

export default Fieldset
