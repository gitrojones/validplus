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
    $emitFieldsets: VPFieldset[];
    $fieldsets: VPFieldset[];
    private get $visibleFieldsets();
    constructor(element: HTMLElement, options?: VPValidatorOptions);
    $fieldsetWatch(_e: Event, trigger: VPFieldset): void;
    isValid(): boolean | Promise<unknown>;
    addFieldset(fieldset: VPFieldset): void;
    watchFieldset(fieldset: VPFieldset): void;
    removeFieldset(fieldset: VPFieldset): VPFieldset | null | undefined;
    createFieldset(fs: HTMLElement, strategy: ValidationStrategy, options: VPFieldsetOptions, fields?: VPField[], onValidate?: ValidationLifecycle): VPFieldset;
}
