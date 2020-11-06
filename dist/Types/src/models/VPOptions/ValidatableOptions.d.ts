import { VPOptions } from "../../interfaces/VPOptions";
import { ValidationLifecycle } from "../../interfaces/validation/ValidationLifecycle";
import { ValidInput } from "../../types/ValidInput";
import { VerticalPosition } from "../../enums/Positions";
export declare class ValidatableOptions implements VPOptions {
    Watch: boolean;
    Lifecycle: ValidationLifecycle;
    ErrorClassName: string;
    ValidClassName: string;
    PrimaryInput: (null | ValidInput);
    PrimaryInputIndex: number;
    PrimaryInputType: (null | string);
    InputTypes: ('select' | 'input' | 'textarea')[];
    MessageClassName: string;
    MessageContainerClassName: string;
    MessageAnchor: (HTMLElement | null);
    MessagePOS: VerticalPosition;
    ScrollTo: boolean;
    ScrollAnchor: (HTMLElement | null);
    constructor(options: VPOptions, element?: (HTMLElement | null));
}
