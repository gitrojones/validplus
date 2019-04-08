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
    MessageContainerClassName: string;
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
        [index: string]: boolean;
        blur: boolean;
        change: boolean;
        mouseleave: boolean;
    };
    DirtyOn: {
        [index: string]: boolean;
        blur: boolean;
        change: boolean;
        mouseleave: boolean;
    };
    FormatOn: {
        [index: string]: boolean;
        blur: boolean;
        change: boolean;
        mouseleave: boolean;
    };
    ForceRules: boolean;
    InputFormatter: InputFormatters;
    InputRules: HTMLValidationRules;
    CustomRules: CustomValidationRule[];
    ValidateAsyncResolved: boolean;
    ShowFieldRuleErrors: boolean;
    ShowCustomRuleErrors: boolean;
    ValidateLazyFieldRules: boolean;
    ValidateLazyCustomRules: boolean;
}
