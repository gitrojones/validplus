import { VPFieldOptions } from 'src/interfaces/VPOptions';
import { InputFormatters } from 'src/interfaces/InputFormatters';
import { ChangeActions } from 'src/interfaces/events/ChangeActions';
import { HTMLValidationRules } from 'src/interfaces/validation/HTMLValidationRules';
import { CustomValidationRule } from 'src/interfaces/validation/CustomValidationRule';
import { ValidatableOptions } from './ValidatableOptions';
export declare class FieldOptions extends ValidatableOptions implements VPFieldOptions {
    ForceRules: boolean;
    InputRules: HTMLValidationRules;
    CustomRules: CustomValidationRule[];
    InputFormatter: InputFormatters;
    ShowFieldRuleErrors: boolean;
    ShowCustomRuleErrors: boolean;
    ValidateLazyCustomRules: boolean;
    ValidateLazyFieldRules: boolean;
    ValidateAsyncResolved: boolean;
    DirtyOn: ChangeActions;
    FormatOn: ChangeActions;
    ValidateOn: ChangeActions;
    constructor(options: VPFieldOptions, element?: (HTMLElement | null));
}
