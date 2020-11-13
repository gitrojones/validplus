import { VPOptions } from "../../interfaces/VPOptions";
import { ValidationLifecycle } from "../../interfaces/validation/ValidationLifecycle";
import { VerticalPosition } from "../../enums/Positions";
/**
 * Validatable Options generic for VPOptions
 * @category Options
 * @description
 * Base generic ValidatableOption class all VPOption instances extend from. Implements the generic
 * VPOptions interface and applies standard defaults sourced from the DOM bindings or statically defined.
 *
 * __NOTE:__ See property descriptions for DOM binding attribute names, if implemented
 * @prop {string} [Lifecycle.Valid.Message=''] - vp-valid
 * @prop {string} [Lifecycle.Invalid.Message=''] - vp-invalid
 * @prop {string} [ErrorClassName='-isError'] - vp-error-class
 * @prop {string} [ValidClassName='-isValid'] - vp-valid-class
 * @prop {string} [MessageClassName='VPMessage'] - vp-msg-class
 * @prop {string} [MessageContainerClassName='VPMessages'] - vp-msgs-class
 * @prop {string} [MessagePos=VerticalPosition.bottom] - vp-msg-top || vp-msg-bottom
 * @prop {boolean} [ScrollTo=false] - vp-scroll
 * @prop {HTMLElement|null} [MessageAnchor]
 * @prop {HTMLElement|null} [ScrollAnchor]
 * @prop {ValidationLifecycle} [Lifecycle]
 * @prop {ScrollIntoViewOptions|boolean} [ScrollOptions]
 *
 * @see {@link VPOptions} For more information on properties defined
 */
export declare class ValidatableOptions<T extends ValidatableOptions<T>> implements VPOptions<T> {
    Lifecycle: ValidationLifecycle<T>;
    ErrorClassName: string;
    ValidClassName: string;
    MessageClassName: string;
    MessageContainerClassName: string;
    MessageAnchor: (HTMLElement | null);
    MessagePOS: VerticalPosition;
    ScrollTo: boolean;
    ScrollAnchor: (HTMLElement | null);
    ScrollOptions: (ScrollIntoViewOptions | boolean);
    constructor(options: VPOptions<T>, element: HTMLElement);
}
