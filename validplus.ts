/**
 * ValidPlus 2019-Present
 * @author: Ryann Jones<GitRojones>
 * @license: GPL 3.0
 */

import '@lib/polyfills'

import { VPValidator as Validator } from '@/Validator'
import { VPFieldset as Fieldset } from '@/Fieldset'
import { VPField as Field } from '@/Field'

/**
  * Main export
  * @param {VPValidator} Validator - ValidPlus Validator
  * @param {VPFieldset} Fieldset - ValidPlus Fieldset
  * @param {VPField} Field - ValidPlus Field
  */
export const ValidPlus = {
  Validator,
  Fieldset,
  Field
}

export default ValidPlus
