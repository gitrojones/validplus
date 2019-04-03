import { VerticalPosition } from '@/enums/Positions';
import { HTMLValidationRules } from '@/interfaces/validation/HTMLValidationRules';
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule';
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle';
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy';
export interface VPOptions {
    Watch: boolean;
    Lifecycle: ValidationLifecycle;
    ClassName: string;
    ErrorClassName: string;
    ValidClassName: string;
    MessageClassName: string;
    MessageAnchor: HTMLElement;
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
    InputFormatter: {
        pre: (innerHTML: HTMLElement, dispatchEvent: ((eventName: string) => void)) => string;
        post: (innerHTML: HTMLElement, dispatchEvent: ((eventName: string) => void)) => string;
    };
    InputRules: HTMLValidationRules;
    CustomRules: CustomValidationRule[];
    ShowFieldErrors: boolean;
}
