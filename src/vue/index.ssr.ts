import { Validatable } from './Validatable'
import { Fieldset } from './Fieldset'
import { Field } from './Field'

const VP = {
  Validatable,
  Fieldset,
  Field
}

const VP_SSR = {
  Validatable: {},
  Fieldset: {},
  Field: {}
}

export const VPVue = (env) => {
  return (env === 'client')
  ? VP
  : VP_SSR
}

export default VPVue
