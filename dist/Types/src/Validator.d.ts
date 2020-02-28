import { ValidationLifecycle } from "./interfaces/validation/ValidationLifecycle";
import { ValidationStrategy } from "./interfaces/validation/ValidationStrategy";
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
    $options: VPValidatorOptions;
    $emitFieldsets: VPFieldset[];
    $fieldsets: VPFieldset[];
    $fieldsetWatch: (_e: Event, trigger: VPFieldset) => void;
    private readonly $visibleFieldsets;
    /**
     * @param options - Configuration for the Validator
     * @param element - Validator Anchor Element (Typically a form)
     */
    constructor(options: (VPValidatorOptions | object), element: HTMLElement);
    isValid(): (Promise<boolean> | boolean);
    addFieldset(fieldset: VPFieldset): void;
    watchFieldset(fieldset: VPFieldset): void;
    removeFieldset(fieldset: VPFieldset): VPFieldset | null | undefined;
    createFieldset(fs: HTMLElement, strategy: (ValidationStrategy | string), options: (VPFieldsetOptions | object), fields?: VPField[], onValidate?: ValidationLifecycle): VPFieldset;
}
