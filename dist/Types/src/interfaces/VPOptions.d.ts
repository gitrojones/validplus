import { VerticalPosition } from '@/enums/Positions';
import { HTMLValidationRules } from '@/interfaces/validation/HTMLValidationRules';
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule';
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle';
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy';
import { InputFormatters } from '@/interfaces/inputFormatters';
export interface VPOptions {
    Watch: boolean;
    Lifecycle: ValidationLifecycle;
    ClassName: string;
    ErrorClassName: string;
    ValidClassName: string;
    MessageClassName: string;
    MessageAnchor: HTMLElement;
    DeferredMessageAnchor: boolean;
    MessagePOS: VerticalPosition;
    ScrollTo: boolean;
    ScrollAnchor: HTMLElement;
}
export interface VPValidatorOptions extends VPOptions {
    ValidateLazy: boolean;
    ValidateVisible: boolean;
    ValidationInputs: string[];
}
export interface VPFieldsetOptions extends VPOptions {
    ValidateVisible: boolean;
    FieldClass: string;
    ValidationStrategy: ValidationStrategy;
}
export interface VPFieldOptions extends VPOptions {
    ValidateOn: {
        blur: boolean;
        change: boolean;
        mouseleave: boolean;
    };
    DirtyOnBlur: boolean;
    ForceRules: boolean;
    InputFormatter: InputFormatters;
    InputRules: HTMLValidationRules;
    CustomRules: CustomValidationRule[];
    ShowFieldRuleErrors: boolean;
    ShowCustomRuleErrors: boolean;
    ValidateLazyFieldRules: boolean;
    ValidateLazyCustomRules: boolean;
}
