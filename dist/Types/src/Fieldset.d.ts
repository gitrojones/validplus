import { VPFieldsetOptions, VPFieldOptions } from "./interfaces/VPOptions";
import { ValidationStrategy } from "./interfaces/validation/ValidationStrategy";
import { VPField } from "./Field";
import { Validatable } from "./Validatable";
import { FieldsetOptions } from "./models/VPOptions/FieldsetOptions";
export declare class VPFieldset extends Validatable {
    static Options: typeof FieldsetOptions;
    $strategy: ValidationStrategy;
    $fields: VPField[];
    $emitFields: VPField[];
    get $visibleFields(): VPField[];
    constructor(element: HTMLElement, options?: VPFieldsetOptions);
    $fieldWatch(_e: Event, trigger: VPField): void;
    isValid(validateDirty?: boolean): (boolean | Promise<boolean>);
    removeField(field: VPField): (VPField | undefined);
    watchField(field: VPField): void;
    addField(field: VPField): void;
    createField(el: HTMLElement, options: VPFieldOptions): VPField;
    findFields(fieldOptions?: (VPFieldOptions | VPFieldOptions[])): void;
}
