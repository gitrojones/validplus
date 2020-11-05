import { VerticalPosition } from 'src/enums/Positions';
import { HTMLValidationRules } from 'src/interfaces/validation/HTMLValidationRules';
import { CustomValidationRule } from 'src/interfaces/validation/CustomValidationRule';
import { ValidationLifecycle } from 'src/interfaces/validation/ValidationLifecycle';
import { ValidationStrategy, ValidationStrategyNames } from 'src/interfaces/validation/ValidationStrategy';
import { InputFormatters } from 'src/interfaces/InputFormatters';
import { ChangeActions } from 'src/interfaces/events/ChangeActions';
import { ValidInput } from 'src/types/ValidInput';
import { ValidatableOptions } from 'src/models/VPOptions/ValidatableOptions';
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
    ValidationStrategy: (ValidationStrategyNames | ValidationStrategy);
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
