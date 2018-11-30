import Validatable from './Validatable'
import Fieldset from './Fieldset'
import Field from './Field'

const VPVue = {
  Validatable,
  Fieldset,
  Field
}

export default (env) => {
  return (env === 'client')
    ? VPVue
    : { Validatable: {}, Fieldset: {}, Field: {} }
}
