import { VPOptions } from "../../interfaces/VPOptions";
import { ValidationLifecycle } from "../../interfaces/validation/ValidationLifecycle";
import { ValidInput } from "../../types/ValidInput";
import { VerticalPosition } from "../../enums/Positions";
export declare class ValidatableOptions implements VPOptions {
    $options: VPOptions;
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
    MessagePOS: VerticalPosition;
    ScrollTo: boolean;
    MessageAnchor: (HTMLElement | null);
    ScrollAnchor: (HTMLElement | null);
    constructor(options: VPOptions, element?: (HTMLElement | null));
}
