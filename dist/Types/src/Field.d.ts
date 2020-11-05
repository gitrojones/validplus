import { VPFieldOptions } from 'src/interfaces/VPOptions';
import { ValidationAttributes } from 'src/interfaces/validation/ValidationAttributes';
import { ValidInput } from 'src/types/ValidInput';
import { Validatable } from 'src/Validatable';
import { FieldOptions } from 'src/models/VPOptions/FieldOptions';
export declare class VPField extends Validatable {
    static Options: typeof FieldOptions;
    $Input: (ValidInput | null);
    $dirty: boolean;
    $canValidate: boolean;
    $formatterEvent: {
        pre: boolean;
        post: boolean;
    };
    constructor(element: HTMLElement, options?: VPFieldOptions);
    get $input(): ValidInput;
    set $input(input: ValidInput);
    parseInput(): ValidationAttributes;
    setInput(input: ValidInput | null): void;
    isValid(formattedExternal?: boolean): (boolean | Promise<boolean>);
    formatInputPre(): void;
    formatInputPost(): void;
}
