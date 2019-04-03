import { VPFieldOptions } from '@/interfaces/VPOptions';
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule';
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle';
import { ValidationAttributes } from '@/interfaces/validation/ValidationAttributes';
import { Validatable } from '@/Validatable';
export declare class VPField extends Validatable {
    $options: VPFieldOptions;
    $dirty: boolean;
    $input: (HTMLInputElement | null);
    $canValidate: boolean;
    constructor(element: HTMLElement, options: VPFieldOptions, customRules: CustomValidationRule[], onValidate: ValidationLifecycle);
    parseInput(): ValidationAttributes;
    setInput(): void;
    isValid(): boolean;
}
