import { VPValidatorOptions, VPFieldsetOptions } from 'src/interfaces/VPOptions';
import { Validatable } from 'src/Validatable';
import { VPFieldset } from 'src/Fieldset';
import { VPField } from 'src/Field';
import { ValidatorOptions } from 'src/models/VPOptions/ValidatorOptions';
/**
 * VPValidator Instance
 * @description
 * Validator instances are responsible for managing fieldsets. Validator instances
 * are capable of dispatching validation on all fieldsets (and fields), allowing for a single "isValid" check.
 * @example
 * <form id="sample_form">
 *   ...
 * </form>
 *
 * const Validator = new VP.Validator(
 *  document.getElementById('sample_form'), <options>);
 * @augments Validatable
 */
export declare class VPValidator extends Validatable<ValidatorOptions> {
    static Options: typeof ValidatorOptions;
    $fieldsets: VPFieldset[];
    $observer: MutationObserver | undefined;
    private get $visibleFieldsets();
    constructor(element: HTMLElement, options?: VPValidatorOptions | ValidatorOptions);
    /**
     * If running a modern browser, VP will automatically
     * handle removing tracked nodes which are removed from the DOM.
     * If supporting sub IE11, you must do this yourself using the removeFieldset
     * helpers defined on this instance.
     * @private
     */
    $observe(mutations: MutationRecord[]): void;
    /**
     * Validate internal state
     * @description
     * IsValid is a standard method for validating the internal state
     * of a validator and all it's associated fieldsets (and fields). This method supports dynamic
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
    /**
     * Add a fieldset instance to be tracked
     * @param {VPFieldset} fieldset - Fieldset to track
     * @param {number} [index] - Indicate the fieldset order to track by
     */
    addFieldset(fieldset: VPFieldset, index?: number): void;
    /**
     * Remove a tracked fieldset from this validator
     * @param {VPFieldset} fieldset - Fieldset instance to remove
     */
    removeFieldset(fieldset: VPFieldset): (VPFieldset | undefined);
    /**
     * Helper method for creating a new Fieldset to automatically track
     * @param {HTMLElement} el - Fieldset element
     * @param {VPFieldsetOptions} options - Options to apply to the fieldset instance
     * @param {VPField[]} [fields] - Fields to append to the fieldset
     */
    createFieldset(el: HTMLElement, options: VPFieldsetOptions, fields?: VPField[]): VPFieldset;
    /**
     * Helper for automatically parsing child elements for Fieldsets
     * @param {VPFieldsetOptions|VPFieldsetOptions[]} [fieldsetOptions] - Options to apply to the found fieldsets. If array, options will apply based on index
     */
    findFieldsets(fieldsetOptions?: (VPFieldsetOptions | VPFieldsetOptions[])): void;
}
