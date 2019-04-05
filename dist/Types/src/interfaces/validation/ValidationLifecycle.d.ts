import { VPField } from '@/Field';
import { VPFieldset } from '@/Fieldset';
import { VPValidator } from '@/Validator';
export declare type ValidationCB = (VPInstance: (VPField | VPFieldset | VPValidator)) => null;
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
