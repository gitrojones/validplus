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
export declare class VPValidator extends Validatable {
    static Options: typeof ValidatorOptions;
    $emitFieldsets: VPFieldset[];
    $fieldsets: VPFieldset[];
    private get $visibleFieldsets();
    constructor(element: HTMLElement, options?: VPValidatorOptions);
    /**
     * Standard fieldset change watcher
     * @todo Optimize to track internal state and only revalidate if internal state has changed.
     */
    $fieldsetWatch(_e: Event, trigger: VPFieldset): void;
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
    addFieldset(fieldset: VPFieldset): void;
    watchFieldset(fieldset: VPFieldset): void;
    unwatchFieldset(fieldset: VPFieldset): void;
    removeFieldset(fieldset: VPFieldset): (VPFieldset | undefined);
    createFieldset(fs: HTMLElement, options: VPFieldsetOptions, fields: VPField[]): VPFieldset;
}
