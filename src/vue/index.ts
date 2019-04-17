import _Vue from 'vue'
import { Validatable } from './mixins/Validatable'
import { Fieldset } from './mixins/Fieldset'
import { Field } from './mixins/Field'
import { VPValidator } from './components/Validator.vue'
import { VPFieldset } from './components/Fieldset.vue'
import { VPField } from './components/Field.vue'

export const VPVue = {
  mixins: {
    Validatable,
    Fieldset,
    Field
  },
  Validator: VPValidator,
  Fieldset: VPFieldset,
  Field: VPField,
  install: VPVuePlugin
}

function VPVuePlugin<VPVueOptions>
  (Vue: typeof _Vue, _options: VPVueOptions) {
  Vue.component('VPValidator', VPValidator)
  Vue.component('VPFieldset', VPFieldset)
  Vue.component('VPField', VPField)
}
export interface VPVueOptions { }

export default VPVue
