import { VPFieldsetOptions, VPFieldOptions } from "./interfaces/VPOptions";
import { ValidationStrategy } from "./interfaces/validation/ValidationStrategy";
import { CustomValidationRule } from "./interfaces/validation/CustomValidationRule";
import { VPField } from "./Field";
import { Validatable } from "./Validatable";
import { FieldsetOptions } from "./models/VPOptions/FieldsetOptions";
import Cloneable from "./interfaces/Cloneable";
export declare class VPFieldset extends Validatable implements Cloneable {
    static Options: typeof FieldsetOptions;
    $options: VPFieldsetOptions;
    $strategy: ValidationStrategy;
    $fields: VPField[];
    $emitFields: VPField[];
    $fieldWatch: (_e: Event, trigger: VPField) => void;
    readonly $visibleFields: VPField[];
    constructor(element: HTMLElement, strategy: (string | ValidationStrategy), options: (VPFieldsetOptions | object));
    clone(element?: HTMLElement, options?: (VPFieldsetOptions | object)): VPFieldset;
    isValid(validateDirty?: boolean): (boolean | Promise<boolean>);
    removeField(field: VPField): VPField | null | undefined;
    watchField(field: VPField): void;
    addField(field: VPField): void;
    createField(el: HTMLElement, options: (VPFieldOptions | object), customRules: CustomValidationRule[]): VPField;
    findFields(fieldOptions?: (VPFieldOptions | VPFieldOptions[])): void;
}
