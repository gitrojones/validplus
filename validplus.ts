import Validator from '@/Validator'
import Fieldset from '@/Fieldset'
import Field from '@/Field'

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
