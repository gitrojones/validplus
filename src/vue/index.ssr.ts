import { Validatable } from './mixins/Validatable'
import { VPValidator } from '@/vue/components/Validator.vue'
import { Fieldset } from './mixins/Fieldset'
import { VPFieldset } from './components/Fieldset.vue'
import { Field } from './mixins/Field'
import { VPField } from './components/Field.vue'

const VP = {
  mixins: {
    Validatable,
    Fieldset,
    Field
  },
  VPValidator,
  VPFieldset,
  VPField
}

const VP_SSR = {
  mixins: {
    Validatable: {},
    Fieldset: {},
    Field: {}
  },
  VPValidator,
  VPFieldset,
  VPField
}

export const VPVue = (env: string) => {
  return (env === 'client')
    ? VP
    : VP_SSR
}

export default VPVue
