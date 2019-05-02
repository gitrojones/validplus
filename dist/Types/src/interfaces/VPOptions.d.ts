import { VerticalPosition } from "../enums/Positions";
import { HTMLValidationRules } from "./validation/HTMLValidationRules";
import { CustomValidationRule } from "./validation/CustomValidationRule";
import { ValidationLifecycle } from "./validation/ValidationLifecycle";
import { ValidationStrategy } from "./validation/ValidationStrategy";
import { InputFormatters } from "./inputFormatters";
export interface VPOptions {
    [property: string]: any;
    Watch: boolean;
    Lifecycle: ValidationLifecycle;
    ClassName: string;
    ErrorClassName: string;
    ValidClassName: string;
    MessageClassName: string;
    MessageContainerClassName: string;
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
        [index: string]: boolean;
        blur: boolean;
        input: boolean;
        change: boolean;
        mouseleave: boolean;
    };
    DirtyOn: {
        [index: string]: boolean;
        blur: boolean;
        input: boolean;
        change: boolean;
        mouseleave: boolean;
    };
    FormatOn: {
        [index: string]: boolean;
        blur: boolean;
        input: boolean;
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
