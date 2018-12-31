import Validator from './src/Validator'
import Fieldset from './src/Fieldset'
import Field from './src/Field'

import '@lib/polyfills'

/**
  * Main export
  * @param {VPValidator} Validator - ValidPlus Validator
  * @param {VPFieldset} Fieldset - ValidPlus Fieldset
  * @param {VPField} Field - ValidPlus Field
  */
const ValidPlus = {
  Validator,
  Fieldset,
  Field
}

export default ValidPlus
