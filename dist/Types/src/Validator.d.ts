import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle';
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy';
import { VPValidatorOptions, VPFieldsetOptions } from '@/interfaces/VPOptions';
import { Validatable } from '@/Validatable';
import { VPFieldset } from '@/Fieldset';
import { VPField } from '@/Field';
/**
 * ValidPlus Validator instance, the container
 * responsible for firing off the validation cycle
 *
 * @name VPValidator
 */
export declare class VPValidator extends Validatable {
    $options: VPValidatorOptions;
    private $fieldsets;
    private readonly $visibleFieldsets;
    /**
     * @param options - Configuration for the Validator
     * @param element - Validator Anchor Element (Typically a form)
     */
    constructor(options: VPValidatorOptions, element: HTMLElement);
    isValid(): boolean | Promise<{}>;
    addFieldset(fieldset: VPFieldset): void;
    watchFieldset(fieldset: VPFieldset): void;
    removeFieldset(fieldset: VPFieldset): void;
    createFieldset(fs: HTMLElement, strategy: ValidationStrategy, options: VPFieldsetOptions, fields: VPField[], onValidate: ValidationLifecycle): VPFieldset;
}
