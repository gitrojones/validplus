import { VPFieldsetOptions } from 'src/interfaces/VPOptions';
import { ValidationStrategyNames } from 'src/interfaces/validation/ValidationStrategy';
import { ValidatableOptions } from './ValidatableOptions';
export declare class FieldsetOptions extends ValidatableOptions implements VPFieldsetOptions {
    ValidateVisible: boolean;
    FieldClass: string;
    ValidationStrategy: ValidationStrategyNames;
    constructor(options: VPFieldsetOptions, element?: (HTMLElement | null));
}
