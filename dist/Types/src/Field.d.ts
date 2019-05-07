import { VPFieldOptions } from "./interfaces/VPOptions";
import { CustomValidationRule } from "./interfaces/validation/CustomValidationRule";
import { ValidationLifecycle } from "./interfaces/validation/ValidationLifecycle";
import { ValidationAttributes } from "./interfaces/validation/ValidationAttributes";
import { ValidInput } from "./types/ValidInput";
import { Validatable } from "./Validatable";
export declare class VPField extends Validatable {
    $options: VPFieldOptions;
    $dirty: boolean;
    $canValidate: boolean;
    $formatterEvent: {
        pre: boolean;
        post: boolean;
    };
    constructor(element: HTMLElement, options: VPFieldOptions, customRules: CustomValidationRule[], onValidate: ValidationLifecycle);
    $input: ValidInput;
    parseInput(): ValidationAttributes;
    setInput(): void;
    isValid(formattedExternal?: boolean): (boolean | Promise<boolean>);
    formatInputPre(): void;
    formatInputPost(): void;
}
