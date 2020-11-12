import { VPFieldOptions } from 'src/interfaces/VPOptions';
import { InputFormatters } from 'src/interfaces/InputFormatters';
import { ChangeActions } from 'src/interfaces/events/ChangeActions';
import { HTMLValidationRules } from 'src/interfaces/validation/HTMLValidationRules';
import { CustomValidationRule } from 'src/interfaces/validation/CustomValidationRule';
import { ValidatableOptions } from './ValidatableOptions';
import { ValidInput } from 'src/types/ValidInput';
/**
 * Field Options instance for VPField
 * @category Options
 * @description
 * Internally created VPField options instance, implementing the VPFieldOptions interface w/
 * standard defaults applied dynamically from the DOM bindings or statically if undefined.
 *
 * __NOTE:__ See property descriptions for DOM binding attribute names, if implemented
 * @prop {boolean} [Notify=true] - vp-notify
 * @prop {boolean} [ShowFieldRuleErrors=false] - vp-field-errors
 * @prop {boolean} [ShowCustomRuleErrors=true] - vp-custom-errors
 * @prop {boolean} [ValidateLazyCustomRules=true] - vp-lazy-custom || vp-lazy
 * @prop {boolean} [ValidateLazyFieldFields=true] - vp-lazy-fields || vp-lazy
 * @prop {boolean} [ValidateAsync=false] - vp-async
 * @prop {boolean} [ValidateAsyncResolved=true] - vp-await
 * @prop {boolean} [DirtyOn.blur=false] - vp-dirty-blur
 * @prop {boolean} [DirtyOn.input=true] - vp-dirty-input
 * @prop {boolean} [DirtyOn.change=false] - vp-dirty-change
 * @prop {boolean} [DirtyOn.mouseleave=false] - vp-dirty-mouseleave
 * @prop {boolean} [FormatOn.blur=false] - vp-format-blur
 * @prop {boolean} [FormatOn.input=true] - vp-format-input
 * @prop {boolean} [FormatOn.change=false] - vp-format-change
 * @prop {boolean} [FormatOn.mouseleave=false] - vp-format-mouseleave
 * @prop {boolean} [ValidateOn.blur=true] - vp-blur || vp-validate-blur
 * @prop {boolean} [ValidateOn.input=false] - vp-input || vp-validate-input
 * @prop {boolean} [ValidateOn.change=false] - vp-change || vp-validate-change
 * @prop {boolean} [ValidateOn.mouseleave=false] - vp-mouseleave || vp-validate-mouseleave
 * @prop {boolean} [ForceRules=false]
 * @prop {HTMLValidationRules} [InputRules={}]
 * @prop {CustomValidationRule[]} [CustomRules=[]]
 * @prop {InputFormatters} [InputFormatter={}]
 * @prop {null|ValidInput} [PrimaryInput=null]
 * @prop {number} [PrimaryInputIndex=0]
 * @prop {null|string} [PrimaryInputType=null]
 * @prop {string[]} [InputTypes=['select','input','textarea']]
 * @see {@link VPFieldOptions} For more information on properties defined
 * @augments ValidatableOptions
 */
export declare class FieldOptions extends ValidatableOptions<FieldOptions> implements VPFieldOptions {
    Notify: boolean;
    ValidateAsync: boolean;
    ValidateAsyncResolved: boolean;
    ShowFieldRuleErrors: boolean;
    ShowCustomRuleErrors: boolean;
    ValidateLazyCustomRules: boolean;
    ValidateLazyFieldRules: boolean;
    DirtyOn: ChangeActions;
    FormatOn: ChangeActions;
    ValidateOn: ChangeActions;
    ForceRules: boolean;
    InputRules: HTMLValidationRules;
    CustomRules: CustomValidationRule[];
    InputFormatter: InputFormatters;
    PrimaryInput: (null | ValidInput);
    PrimaryInputIndex: number;
    PrimaryInputType: (null | string);
    InputTypes: ('select' | 'input' | 'textarea')[];
    constructor(options: VPFieldOptions, element: HTMLElement);
}
