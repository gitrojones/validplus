import { Validatable } from './mixins/Validatable'
import { Fieldset } from './mixins/Fieldset'
import { Field } from './mixins/Field'
// import { VPValidator } from '@/vue/components/Validator.vue'
// import { VPFieldset } from './components/Fieldset.vue'
// import { VPField } from './components/Field.vue'

const VP = {
  mixins: {
    Validatable,
    Fieldset,
    Field
  }
  // VPValidator,
  // VPFieldset,
  // VPField
}

const VP_SSR = {
  mixins: {
    Validatable: {},
    Fieldset: {},
    Field: {}
  }
  // VPValidator,
  // VPFieldset,
  // VPField
}

export const VPVue = (env: string) => {
  return (env === 'client')
    ? VP
    : VP_SSR
}

export default VPVue
