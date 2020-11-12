import { VPFieldsetOptions, VPFieldOptions } from "./interfaces/VPOptions";
import { ValidationStrategy } from "./interfaces/validation/ValidationStrategy";
import { VPField } from "./Field";
import { Validatable } from "./Validatable";
import { FieldsetOptions } from "./models/VPOptions/FieldsetOptions";
export declare class VPFieldset extends Validatable<FieldsetOptions> {
    static Options: typeof FieldsetOptions;
    $strategy: ValidationStrategy;
    $fields: VPField[];
    $cached: VPField[];
    $canValidate: boolean;
    $observer: MutationObserver | undefined;
    get $visibleFields(): VPField[];
    constructor(element: HTMLElement, options?: VPFieldsetOptions);
    get $isValid(): boolean | null;
    set $isValid(isValid: boolean | null);
    /**
     * If running a modern browser, VP will automatically
     * handle removing tracked nodes which are removed from the DOM.
     * If supporting sub IE11, you must do this yourself using the removeField
     * helpers defined on this instance.
     * @param mutations
     */
    $observe(mutations: MutationRecord[]): void;
    $fieldWatch(_e: Event, trigger: VPField): void;
    $fieldRemove(_e: Event, field: VPField): void;
    isValid(): (boolean | Promise<boolean>);
    removeField(field: VPField): (VPField | undefined);
    addField(field: VPField, index?: number): void;
    createField(el: HTMLElement, options: VPFieldOptions): VPField;
    findFields(fieldOptions?: (VPFieldOptions | VPFieldOptions[])): void;
}
