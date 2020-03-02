import { VPOptions, VPValidatorOptions } from "../../interfaces/VPOptions";
import { ValidatableOptions } from './ValidatableOptions';
export declare class ValidatorOptions extends ValidatableOptions implements VPValidatorOptions {
    $options: VPOptions;
    ValidateLazy: boolean;
    ValidateVisible: boolean;
    constructor(options: (VPValidatorOptions | object), element?: (HTMLElement | null));
}
