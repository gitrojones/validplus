import { VPFieldOptions } from 'src/interfaces/VPOptions';
import { ValidationAttributes } from 'src/interfaces/validation/ValidationAttributes';
import { ValidInput } from 'src/types/ValidInput';
import { Validatable } from 'src/Validatable';
import { FieldOptions } from 'src/models/VPOptions/FieldOptions';
/**
 * VPField Instance
 * @description
 * Field instances are responsible for managing the internal state of individual fields. Field instances
 * are capable of formatting input and validating input based on various events. See examples for more information.
 * @example
 * // Simple DOM Binding, Field will be required
 * <div class="VPField">
 *   <input id="full-name" aria-label="Full Name" name="name" type="text" required="required" />
 * </div>
 * @example
 * // Simple DOM Binding, pattern matching an email
 * <div class="VPField">
 *   <label for="email">Email Address</label>
 *   <input id="email" name="email" type="text" pattern="/.+@.+\..+/" />
 * </div>
 * @example
 * // Programmic bindings, phone number w/ input formatter
 * const field = new VP.Field(document.getElementById('phone'), {
 *    InputFormatter: {
 *      pre: (input, dispatchEven) => {
 *        input.value = input.value.replace(/[^0-9]/g, ''));
 *        input.value = input.value.substr(0, 5);
 *        dispatchEvent('input');
 *      },
 *      post: (input, dispatchEvent) => {
 *        let value = input.value
 *        const areaCode = value.substr(0, 3)
 *        const local = value.substr(3, 3)
 *        const number = value.substr(6, 4)
 *
 *        let mask = '('
 *        if (areaCode.length > 0) mask += areaCode
 *        if (local.length > 0) mask += ') ' + local
 *        if (number.length > 0) mask += '-' + number
 *        input.value = mask
 *        dispatchEvent('input')
 *      }
 *    }
 * });
 */
export declare class VPField extends Validatable<FieldOptions> {
    static Options: typeof FieldOptions;
    $input: (ValidInput | null);
    $dirty: boolean;
    $canValidate: boolean;
    $observer: MutationObserver | undefined;
    $formatterEvent: {
        pre: boolean;
        post: boolean;
    };
    constructor(element: HTMLElement, options?: VPFieldOptions);
    get $isValid(): boolean | null;
    set $isValid(isValid: boolean | null);
    /**
     * Field Observer
     * @description
     * If running a modern browser, VP will automatically
     * handle bubbling the removal of tracked fields if inputs have been removed from the DOM.
     * If supporting sub IE11, you must do this yourself using the remove helpers defined on this instance.
     * @see {@link VPField.remove}
     * @private
     */
    $observe(mutations: MutationRecord[]): void;
    /**
     * Standard Input Handler
     * @description
     * Binds to standard input lifecycle hooks and handles how/when validation occurs based
     * up on the event type fired and the internal state of the Field instance.
     * @private
     */
    $inputHandler(e: Event): void;
    /**
     * Set the input to be tracked
     * @throws If input is unable to be parsed
     * @description
     * Sets an input for the Field based upon the options passed. If no input is specified
     * explicitly, input will be automatically parsed from child elements. If no input can be
     * found this method will throw and emit itself for removal from parent tracking.
     * @private
     */
    $setInput(): void;
    /**
     * Remove Field
     * @description
     * Notify parent that this field should be removed from tracking. This is handled automatically
     * if using a modern browser where MutationObservers are support (IE11+). For most use-cases,
     * this can be safely ignored; This method is provided for very specific edge cases where
     * the internally tracked input may be removed after initialization.
     */
    remove(): void;
    /**
     * Parse Input
     * @description
     * Parses the internally tracked input and returns a standard interface used internally for
     * the validation cycle.
     */
    parseInput(): ValidationAttributes;
    /**
     * Validation Cycle
     * @description
     * Standard Validation cycle for the Field instance.
     *
     * + Validation can occur as either synchronous validation or asynchronous validation.
     * + Validation emulates standard DOM validation
     * + Validation consumes custom validation rules
     *    - If Validation rules are all synchronous, isValid will be synchronous
     *    - If Validation rules are async, isValid will be asynchronous
     *    - If ValidateAsync option is enabled, isValid will *ALWAYS* be asynchronous
     *
     * This method applies the necessary formatting for input values, if defined.
     * @returns (boolean|Promise.<boolean>)
     */
    isValid(): (boolean | Promise<boolean>);
    formatInputPre(): void;
    formatInputPost(): void;
}
