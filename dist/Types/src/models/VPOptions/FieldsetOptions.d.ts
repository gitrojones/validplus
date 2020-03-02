import { VPFieldsetOptions, VPOptions } from "../../interfaces/VPOptions";
import { ValidationStrategy } from "../../interfaces/validation/ValidationStrategy";
import { ValidatableOptions } from './ValidatableOptions';
export declare class FieldsetOptions extends ValidatableOptions implements VPFieldsetOptions {
    $options: VPOptions;
    ValidateVisible: boolean;
    FieldClass: string;
    ValidationStrategy: (ValidationStrategy | null);
    Watch: boolean;
    constructor(options: (VPFieldsetOptions | object), element?: (HTMLElement | null));
}
