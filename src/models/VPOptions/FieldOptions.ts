import { VPFieldOptions } from 'src/interfaces/VPOptions'
import { InputFormatters } from 'src/interfaces/InputFormatters'
import { ChangeActions } from 'src/interfaces/events/ChangeActions'
import { HTMLValidationRules } from 'src/interfaces/validation/HTMLValidationRules'
import { CustomValidationRule } from 'src/interfaces/validation/CustomValidationRule'

import { ValidatableOptions } from './ValidatableOptions'
import {ValidInput} from 'src/types/ValidInput'

export class FieldOptions extends ValidatableOptions<FieldOptions> implements VPFieldOptions {
  ForceRules = false;
  InputRules: HTMLValidationRules = {} as HTMLValidationRules;
  CustomRules: CustomValidationRule[] = [];
  InputFormatter: InputFormatters = {} as InputFormatters;
  ShowFieldRuleErrors = false;
  ShowCustomRuleErrors = true;
  ValidateLazyCustomRules = true;
  ValidateLazyFieldRules = true;
  ValidateAsyncResolved = true;
  DirtyOn: ChangeActions = {} as ChangeActions;
  FormatOn: ChangeActions = {} as ChangeActions;
  ValidateOn: ChangeActions = {} as ChangeActions;

  // Input Controller
  PrimaryInput: (null | ValidInput) = null;
  PrimaryInputIndex = 0;
  PrimaryInputType: (null | string) = null;
  InputTypes: ('select' | 'input' | 'textarea')[] = ['select', 'input', 'textarea'];


  constructor(options: VPFieldOptions, element: (HTMLElement | null) = null) {
    super(options, element);
    Object.assign(this, options);
  }
}
