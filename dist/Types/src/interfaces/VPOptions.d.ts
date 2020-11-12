import { VerticalPosition } from 'src/enums/Positions';
import { HTMLValidationRules } from 'src/interfaces/validation/HTMLValidationRules';
import { CustomValidationRule } from 'src/interfaces/validation/CustomValidationRule';
import { ValidationLifecycle } from 'src/interfaces/validation/ValidationLifecycle';
import { ValidationOption } from 'src/interfaces/validation/ValidationStrategy';
import { InputFormatters } from 'src/interfaces/InputFormatters';
import { ChangeActions } from 'src/interfaces/events/ChangeActions';
import { ValidInput } from 'src/types/ValidInput';
import { ValidatorOptions } from 'src/models/VPOptions/ValidatorOptions';
import { FieldsetOptions } from 'src/models/VPOptions/FieldsetOptions';
import { FieldOptions } from 'src/models/VPOptions/FieldOptions';
import { ValidatableOptions } from 'src/models/VPOptions/ValidatableOptions';
/**
 * Generic ValidatableOptions Interface
 * @category Options
 * @description
 * A generic interface which all Validatable instances implement. This interface
 * is required to be implemented in order to operate as a Validatable instance
 */
export interface VPOptions<T extends ValidatableOptions<T>> {
    /** Lifecycle bindings to perform on Valid or Invalid states */
    Lifecycle?: ValidationLifecycle<T>;
    /** Classname appended when validation is erroneous */
    ErrorClassName?: string;
    /** Classname appended when validation is successful */
    ValidClassName?: string;
    /** Classname message nodes will bear */
    MessageClassName?: string;
    /** Classname message node container will bear */
    MessageContainerClassName?: string;
    /** An anchor point for message nodes. Will default to the internal element if undefined */
    MessageAnchor?: (HTMLElement | null);
    /** Message positioning; Determines how the messaging container is mounted to the anchor point */
    MessagePOS?: VerticalPosition;
    /** Indicates if we should scroll to the instance on failed validation */
    ScrollTo?: boolean;
    /** An anchor point to scroll to if scrolling is enabled and an instance is erroneous */
    ScrollAnchor?: (HTMLElement | null);
    /** Standard ScrollItnoViewOptions, see MDN */
    ScrollOptions?: (ScrollIntoViewOptions | boolean);
}
/**
 * ValidatorOptions Interface
 * @category Options
 * @description
 * A partial interface which can be passed into any VPValidator constructor
 * to be initialized as a ValidatorOption instance with standard defaults applied
 * @augments VPOptions
 */
export interface VPValidatorOptions extends VPOptions<ValidatorOptions> {
    /** Automatically parse children for Fieldsets, using DOM bindings for options */
    FindFieldsets?: boolean;
    /** Classname signifying a fieldset element */
    FieldsetClass?: string;
    /** Validate child fieldsets lazily */
    ValidateLazy?: boolean;
    /** Indicate if validation should be enforced for non-visible fieldsets */
    ValidateVisible?: boolean;
}
/**
 * FieldsetOptions Interface
 * @category Options
 * @description
 * A partial interface which can be passed into any VPFieldset constructor
 * to be initialized as a FieldsetOption instance with standard defaults applied
 * @augments VPOptions
 */
export interface VPFieldsetOptions extends VPOptions<FieldsetOptions> {
    /** Automatically parse children for Fields, using DOM bindings for options */
    FindFields?: boolean;
    /** Classname signifying a field element */
    FieldClass?: string;
    /** Indicate if validation should be enforced for non-visible elements */
    ValidateVisible?: boolean;
    /** Strategy to validate child fields against. See ValidationOption for more information. */
    ValidationStrategy?: ValidationOption;
}
/**
 * FieldOptions Interface
 * @category Options
 * @description
 * A partial interface which can be passed into any VPField constructor
 * to be initialized as a FieldOption instance with standard defaults applied
 * @augments VPOptions
 */
export interface VPFieldOptions extends VPOptions<FieldOptions> {
    /** Notify parent of changes, validating siblings together */
    Notify?: boolean;
    /** Input events required to consider input state as dirty */
    DirtyOn?: ChangeActions;
    /** Input events required to trigger formatters for inputs */
    FormatOn?: ChangeActions;
    /** Input events required to trigger validation for inputs */
    ValidateOn?: ChangeActions;
    /** Force DOM rules to supersede option rules */
    ForceRules?: boolean;
    /** Standard HTML Validation rules to apply */
    InputRules?: HTMLValidationRules;
    /** Custom Validation rules to apply */
    CustomRules?: CustomValidationRule[];
    /** Formatters to apply according to FormatOn rules */
    InputFormatter?: InputFormatters;
    /** Force IsValid to always resolve async, regardless of the presence of promises */
    ValidateAsync?: boolean;
    /** Force waiting for async validation to finish before being able to validate again */
    ValidateAsyncResolved?: boolean;
    /** The input we will validate against */
    PrimaryInput?: (null | ValidInput);
    /** The index to pluck from if we find multiple eligible inputs to parse */
    PrimaryInputIndex?: number;
    /** The type of input we should prioritize picking from if multiple eligible inputs of different types are found */
    PrimaryInputType?: (null | string);
    /** The types of inputs we look for when parsing for inputs */
    InputTypes?: ('select' | 'input' | 'textarea')[];
    /** Show standard HTML5 validation error messages */
    ShowFieldRuleErrors?: boolean;
    /** Show custom validation error messages */
    ShowCustomRuleErrors?: boolean;
    /** Validate HTML validation rules lazily */
    ValidateLazyFieldRules?: boolean;
    /** Validate custom rules lazily */
    ValidateLazyCustomRules?: boolean;
}
