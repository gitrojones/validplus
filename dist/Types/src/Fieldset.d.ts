import { VPFieldsetOptions, VPFieldOptions } from "./interfaces/VPOptions";
import { ValidationStrategy } from "./interfaces/validation/ValidationStrategy";
import { ValidationLifecycle } from "./interfaces/validation/ValidationLifecycle";
import { CustomValidationRule } from "./interfaces/validation/CustomValidationRule";
import { VPField } from "./Field";
import { Validatable } from "./Validatable";
import { FieldsetOptions } from "./models/VPOptions/FieldsetOptions";
export declare class VPFieldset extends Validatable {
    static Options: typeof FieldsetOptions;
    $options: VPFieldsetOptions;
    $strategy: ValidationStrategy;
    $fields: VPField[];
    $emitFields: VPField[];
    $fieldWatch: (_e: Event, trigger: VPField) => void;
    readonly $visibleFields: VPField[];
<<<<<<< HEAD
    constructor(element: HTMLElement, strategy: string | ValidationStrategy, options: VPFieldsetOptions, onValidate: (ValidationLifecycle | undefined));
=======
    constructor(element: HTMLElement, strategy: (string | ValidationStrategy), options: VPFieldsetOptions, onValidate: ValidationLifecycle);
>>>>>>> Typescript vue support
    isValid(validateDirty?: boolean): (boolean | Promise<boolean>);
    removeField(field: VPField): VPField | null | undefined;
    watchField(field: VPField): void;
    addField(field: VPField): void;
    createField(el: HTMLElement, options: VPFieldOptions, customRules: CustomValidationRule[], onValidate: ValidationLifecycle): VPField;
    findFields(fieldOptions?: (VPFieldOptions | VPFieldOptions[])): void;
}
