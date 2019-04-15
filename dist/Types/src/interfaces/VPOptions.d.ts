<<<<<<< HEAD
import { VerticalPosition } from "../enums/Positions";
import { HTMLValidationRules } from "./validation/HTMLValidationRules";
import { CustomValidationRule } from "./validation/CustomValidationRule";
import { ValidationLifecycle } from "./validation/ValidationLifecycle";
import { ValidationStrategy } from "./validation/ValidationStrategy";
import { InputFormatters } from "./InputFormatters";
import { ChangeActions } from "./events/ChangeActions";
import { ValidInput } from "../types/ValidInput";
import { ValidatableOptions } from "../models/VPOptions/ValidatableOptions";
=======
import { VerticalPosition } from '@/enums/Positions';
import { HTMLValidationRules } from '@/interfaces/validation/HTMLValidationRules';
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule';
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle';
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy';
import { InputFormatters } from '@/interfaces/InputFormatters';
>>>>>>> Typescript vue support
export interface VPOptions {
    [property: string]: any;
    Watch: boolean;
    Lifecycle: ValidationLifecycle;
    ErrorClassName: string;
    ValidClassName: string;
    PrimaryInput: (null | ValidInput);
    PrimaryInputIndex: number;
    PrimaryInputType: (null | string);
    InputTypes: ('select' | 'input' | 'textarea')[];
    MessageClassName: string;
    MessageContainerClassName: string;
    MessageAnchor: (HTMLElement | null);
    MessagePOS: VerticalPosition;
    ScrollTo: boolean;
    ScrollAnchor: (HTMLElement | null);
}
export interface VPValidatorOptions extends ValidatableOptions, VPOptions {
    ValidateLazy: boolean;
    ValidateVisible: boolean;
}
export interface VPFieldsetOptions extends ValidatableOptions, VPOptions {
    ValidateVisible: boolean;
    FieldClass: string;
    ValidationStrategy: (ValidationStrategy | null);
}
export interface VPFieldOptions extends ValidatableOptions, VPOptions {
    ValidateOn: ChangeActions;
    DirtyOn: ChangeActions;
    FormatOn: ChangeActions;
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
