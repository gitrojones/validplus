import { VPFieldOptions } from "./interfaces/VPOptions";
import { CustomValidationRule } from "./interfaces/validation/CustomValidationRule";
import { ValidationAttributes } from "./interfaces/validation/ValidationAttributes";
import Cloneable from "./interfaces/Cloneable";
import { ValidInput } from "./types/ValidInput";
import { Validatable } from "./Validatable";
import { FieldOptions } from "./models/VPOptions/FieldOptions";
export declare class VPField extends Validatable implements Cloneable {
    static Options: typeof FieldOptions;
    $Input: (ValidInput | null);
    $dirty: boolean;
    $canValidate: boolean;
    $formatterEvent: {
        pre: boolean;
        post: boolean;
    };
    constructor(element: HTMLElement, options?: (VPFieldOptions | object), customRules?: CustomValidationRule[]);
    $input: ValidInput;
    clone(element?: HTMLElement, options?: (VPFieldOptions | object)): VPField;
    parseInput(): ValidationAttributes;
    setInput(input: ValidInput | null): void;
    isValid(formattedExternal?: boolean): (boolean | Promise<boolean>);
    formatInput(formatter: Function): void;
}
export default VPField;
