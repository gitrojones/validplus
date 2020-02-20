import { VPFieldOptions } from '@/interfaces/VPOptions'
import { InputFormatters } from '@/interfaces/InputFormatters'
import { ChangeActions } from '@/interfaces/events/ChangeActions'
import { HTMLValidationRules } from '@/interfaces/validation/HTMLValidationRules'
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule'

import { ValidatableOptions } from './ValidatableOptions'

export class FieldOptions extends ValidatableOptions implements VPFieldOptions {
  ForceRules: boolean = false;
  InputRules: HTMLValidationRules = {} as HTMLValidationRules;
  CustomRules: CustomValidationRule[] = [];
  InputFormatter: InputFormatters = {} as InputFormatters;
  ShowFieldRuleErrors: boolean = false;
  ShowCustomRuleErrors: boolean = true;
  ValidateLazyCustomRules: boolean = true;
  ValidateLazyFieldRules: boolean = true;
  ValidateAsyncResolved: boolean = true;
  ScrollTo: boolean = false; // ScrollTo isn't intended to be field-level
  DirtyOn: ChangeActions = {} as ChangeActions;
  FormatOn: ChangeActions = {} as ChangeActions;
  ValidateOn: ChangeActions = {} as ChangeActions;

  constructor(options: VPFieldOptions, element: (HTMLElement | null) = null) {
    super(options, element);
    Object.assign(this, options);
  }
};
