/**
 * VPVue SSR 2019-Present
 * @author: Ryann Jones<GitRojones>
 * @license: GPL 3.0
 */

import _Vue from 'vue'
import { Validatable } from './mixins/Validatable'
import { Fieldset } from './mixins/Fieldset'
import { Field } from './mixins/Field'
import { VPValidator } from '@/vue/components/Validator.vue'
import { VPFieldset } from './components/Fieldset.vue'
import { VPField } from './components/Field.vue'

const VP = {
  mixins: {
    Validatable,
    Fieldset,
    Field
  },
  VPValidator,
  VPFieldset,
  VPField,
  install: VPVuePlugin
}

const VP_SSR = {
  mixins: {
    Validatable: {},
    Fieldset: {},
    Field: {}
  },
  VPValidator,
  VPFieldset,
  VPField,
  install: VPVuePlugin
}

function VPVuePlugin<VPVueOptions>
  (Vue: typeof _Vue, _options: VPVueOptions) {
  Vue.component('VPValidator', VPValidator)
  Vue.component('VPFieldset', VPFieldset)
  Vue.component('VPField', VPField)
}
export interface VPVueOptions { }

export const VPVue = (env: string) => {
  return (env === 'client')
    ? VP
    : VP_SSR
}

export default VPVue
