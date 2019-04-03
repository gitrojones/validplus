import { VPFieldsetOptions, VPFieldOptions } from '@/interfaces/VPOptions';
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy';
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle';
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule';
import { VPField } from '@/Field';
import { Validatable } from '@/Validatable';
export declare class VPFieldset extends Validatable {
    $options: VPFieldsetOptions;
    $strategy: ValidationStrategy;
    $fields: VPField[];
    readonly $visibleFields: VPField[];
    constructor(element: HTMLElement, strategy: string | ValidationStrategy, options: VPFieldsetOptions, onValidate: ValidationLifecycle);
    isValid(): boolean;
    removeField(field: VPField): void;
    watchField(field: VPField): void;
    addField(field: VPField): void;
    createField(el: HTMLElement, options: VPFieldOptions, customRules: CustomValidationRule[], onValidate: ValidationLifecycle): VPField;
    findFields(): void;
}
