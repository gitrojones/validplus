import { VPFieldsetOptions } from 'src/interfaces/VPOptions';
import { ValidationOption } from 'src/interfaces/validation/ValidationStrategy';
import { ValidatableOptions } from './ValidatableOptions';
/**
 * Fieldset Options instance for VPFieldset
 * @category Options
 * @description
 * Internally created VPFieldset options instance, implementing the VPFieldsetOptions interface w/
 * standard defaults applied dynamically from the DOM bindings or statically if undefined.
 *
 * __NOTE:__ See property descriptions for DOM binding attribute names, if implemented
 * @prop {boolean} [FindFields=false] - vp-find?
 * @prop {string} [FieldClass='VPField'] - vp-find
 * @prop {boolean} [ValidateVisible=true] - vp-visible
 * @prop {ValidationOption} [ValidationStrategy='all'] - vp-strategy
 * @prop {boolean} [ScrollTo=true] - vp-scroll
 * @see {@link VPFieldsetOptions} For more information on properties defined
 * @augments ValidatableOptions
 */
export declare class FieldsetOptions extends ValidatableOptions<FieldsetOptions> implements VPFieldsetOptions {
    FieldClass: string;
    FindFields: boolean;
    ValidateVisible: boolean;
    ValidationStrategy: ValidationOption;
    ScrollTo: boolean;
    constructor(options: VPFieldsetOptions, element: HTMLElement);
}
