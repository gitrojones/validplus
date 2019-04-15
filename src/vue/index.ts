import { Validatable } from './mixins/Validatable'
import { VPValidator } from './components/Validator.vue'
import { Fieldset } from './mixins/Fieldset'
import { VPFieldset } from './components/Fieldset.vue'
import { Field } from './mixins/Field'
import { VPField } from './components/Field.vue'

export const VPVue = {
  mixins: {
    Validatable,
    Fieldset,
    Field
  },
  VPValidator,
  VPFieldset,
  VPField
}

export default VPVue
