import { VPFieldsetOptions } from "../../interfaces/VPOptions";
import { ValidationStrategy } from "../../interfaces/validation/ValidationStrategy";
import { ValidatableOptions } from './ValidatableOptions';
export declare class FieldsetOptions extends ValidatableOptions implements VPFieldsetOptions {
    ValidateVisible: boolean;
    FieldClass: string;
    ValidationStrategy: (ValidationStrategy | null);
    constructor(options: VPFieldsetOptions, element?: (HTMLElement | null));
}
