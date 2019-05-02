import { VPFieldsetOptions, VPFieldOptions } from "./interfaces/VPOptions";
import { ValidationStrategy } from "./interfaces/validation/ValidationStrategy";
import { ValidationLifecycle } from "./interfaces/validation/ValidationLifecycle";
import { CustomValidationRule } from "./interfaces/validation/CustomValidationRule";
import { VPField } from "./Field";
import { Validatable } from "./Validatable";
export declare class VPFieldset extends Validatable {
    $options: VPFieldsetOptions;
    $strategy: ValidationStrategy;
    $fields: VPField[];
    $emitFields: VPField[];
    $fieldWatch: (_e: Event, trigger: VPField) => void;
    readonly $visibleFields: VPField[];
    constructor(element: HTMLElement, strategy: string | ValidationStrategy, options: VPFieldsetOptions, onValidate: ValidationLifecycle);
    isValid(validateDirty?: boolean): (boolean | Promise<boolean>);
    removeField(field: VPField): VPField | null | undefined;
    watchField(field: VPField): void;
    addField(field: VPField): void;
    createField(el: HTMLElement, options: VPFieldOptions, customRules: CustomValidationRule[], onValidate: ValidationLifecycle): VPField;
    findFields(fieldOptions?: (VPFieldOptions | VPFieldOptions[])): void;
}
