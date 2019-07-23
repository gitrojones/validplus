import { VPValidatorOptions } from "../../interfaces/VPOptions";
import { ValidatableOptions } from './ValidatableOptions';
export declare class ValidatorOptions extends ValidatableOptions implements VPValidatorOptions {
    ValidateLazy: boolean;
    ValidateVisible: boolean;
    constructor(options: VPValidatorOptions, element?: (HTMLElement | null));
}
