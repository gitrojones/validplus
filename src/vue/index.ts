import { Validatable } from './mixins/Validatable'
import { Fieldset } from './mixins/Fieldset'
import { Field } from './mixins/Field'
// import { VPValidator } from './components/Validator.vue'
// import { VPFieldset } from './components/Fieldset.vue'
// import { VPField } from './components/Field.vue'

export const VPVue = {
  mixins: {
    Validatable,
    Fieldset,
    Field
  }
  // VPValidator,
  // VPFieldset,
  // VPField
}

export default VPVue
