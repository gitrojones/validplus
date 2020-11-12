import { VPValidatorOptions, VPFieldsetOptions } from "./interfaces/VPOptions";
import { Validatable } from "./Validatable";
import { VPFieldset } from "./Fieldset";
import { VPField } from "./Field";
import { ValidatorOptions } from "./models/VPOptions/ValidatorOptions";
/**
 * ValidPlus Validator instance, the container
 * responsible for firing off the validation cycle
 *
 * @name VPValidator
 */
export declare class VPValidator extends Validatable<ValidatorOptions> {
    static Options: typeof ValidatorOptions;
    $emitFieldsets: VPFieldset[];
    $fieldsets: VPFieldset[];
    $observer: MutationObserver | undefined;
    private get $visibleFieldsets();
    constructor(element: HTMLElement, options?: VPValidatorOptions | ValidatorOptions);
    /**
     * If running a modern browser, VP will automatically
     * handle removing tracked nodes which are removed from the DOM.
     * If supporting sub IE11, you must do this yourself using the removeFieldset
     * helpers defined on this instance.
     * @param mutations
     */
    $observe(mutations: MutationRecord[]): void;
    /**
     * Validate internal state
     * @description
     * IsValid is a standard method for validating the internal state
     * of a validator and all it's associated children. This method supports dynamic
     * checks for determining if validation should be performed async or sync.
     *
     * If any custom validation rules resolve async, validation will be performed async. Otherwise,
     * all validation is performed synchronously. Optionally, You may enforce async validation through
     * a validation option. This will enforce all validation is returned as a promise.
     *
     * Further, this validation library is capable of short-circuit validation. Lazy validation will
     * stop validation on the first instance of an error.
     *
     * @see {@link ValidatorOptions}
     */
    isValid(): (Promise<boolean> | boolean);
    addFieldset(fieldset: VPFieldset, index?: number): void;
    removeFieldset(fieldset: VPFieldset): (VPFieldset | undefined);
    createFieldset(fs: HTMLElement, options: VPFieldsetOptions, fields?: VPField[]): VPFieldset;
    findFieldsets(fieldsetOptions?: (VPFieldsetOptions | VPFieldsetOptions[])): void;
}
