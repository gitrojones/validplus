import { Validatable } from "../../Validatable";
import { ValidatableOptions } from "../../models/VPOptions/ValidatableOptions";
export declare type ValidationCB<T extends ValidatableOptions<T>> = (VPInstance: (Validatable<T>)) => null;
export interface ValidationLifecycle<T extends ValidatableOptions<T>> {
    Valid: {
        Message?: string;
        CB?: Array<ValidationCB<T>>;
    };
    Invalid: {
        Message?: string;
        CB?: Array<ValidationCB<T>>;
    };
}
