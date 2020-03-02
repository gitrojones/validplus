import { VPFieldOptions, VPOptions } from '@/interfaces/VPOptions'
import { InputFormatters } from '@/interfaces/InputFormatters'
import { ChangeActions } from '@/interfaces/events/ChangeActions'
import { HTMLValidationRules } from '@/interfaces/validation/HTMLValidationRules'
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule'

import { ValidatableOptions } from './ValidatableOptions'
import { cloneDeep } from 'lodash'

export class FieldOptions extends ValidatableOptions implements VPFieldOptions {
  $options: VPOptions
  ForceRules: boolean = false
  InputRules: HTMLValidationRules = {} as HTMLValidationRules
  CustomRules: CustomValidationRule[] = []
  InputFormatter: InputFormatters = {} as InputFormatters
  ShowFieldRuleErrors: boolean = false
  ShowCustomRuleErrors: boolean = true
  ValidateLazyCustomRules: boolean = true
  ValidateLazyFieldRules: boolean = true
  ValidateAsyncResolved: boolean = true
  ScrollTo: boolean = false
  DirtyOn: ChangeActions = {} as ChangeActions
  FormatOn: ChangeActions = {} as ChangeActions
  ValidateOn: ChangeActions = {} as ChangeActions

  constructor (options: (VPFieldOptions | object), element: (HTMLElement | null) = null) {
    super(cloneDeep(options) as VPOptions, element)
    this.$options = options as VPFieldOptions

    Object.assign(this, options)
  }
}
