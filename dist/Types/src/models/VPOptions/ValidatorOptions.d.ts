import { VPValidatorOptions } from "../../interfaces/VPOptions";
import { ValidatableOptions } from "./ValidatableOptions";
/**
 * Validator Options instance for VPValidator
 * @category Options
 * @description
 * Internally created VPValidator options instance, implementing the VPValidatorOptions interface w/
 * standard defaults applied dynamically from the DOM bindings or statically if undefined.
 *
 * __NOTE:__ See property descriptions for DOM binding attribute names, if implemented
 * @prop {boolean} [FindFieldsets=false] - vp-find?
 * @prop {string} [FieldsetClass=VPFieldset]  - vp-find
 * @prop {boolean} [ValidateLazy=true] - vp-lazy
 * @prop {boolean} [ValidateVisible=true] - vp-visible
 *
 * @see {@link VPOptions} For more information on properties defined
 * @augments ValidatableOptions
 */
export declare class ValidatorOptions extends ValidatableOptions<ValidatorOptions> implements VPValidatorOptions {
    FindFieldsets: boolean;
    FieldsetClass: string;
    ValidateLazy: boolean;
    ValidateVisible: boolean;
    constructor(options: VPValidatorOptions, element: HTMLElement);
}
