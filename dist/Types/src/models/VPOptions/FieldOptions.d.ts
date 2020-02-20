import { VPFieldOptions } from "../../interfaces/VPOptions";
import { InputFormatters } from "../../interfaces/InputFormatters";
import { ChangeActions } from "../../interfaces/events/ChangeActions";
import { HTMLValidationRules } from "../../interfaces/validation/HTMLValidationRules";
import { CustomValidationRule } from "../../interfaces/validation/CustomValidationRule";
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
    ScrollTo: boolean;
    DirtyOn: ChangeActions;
    FormatOn: ChangeActions;
    ValidateOn: ChangeActions;
    constructor(options: VPFieldOptions, element?: (HTMLElement | null));
}
