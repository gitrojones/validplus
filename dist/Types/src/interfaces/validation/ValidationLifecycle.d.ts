import { Validatable } from "../../Validatable";
export declare type ValidationCB = (VPInstance: (Validatable)) => null;
export interface ValidationLifecycle {
    Valid: {
        Message?: string;
        CB?: Array<ValidationCB>;
    };
    Invalid: {
        Message?: string;
        CB?: Array<ValidationCB>;
    };
}
