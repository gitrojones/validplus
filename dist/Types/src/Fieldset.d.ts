import { VPFieldsetOptions, VPFieldOptions } from 'src/interfaces/VPOptions';
import { ValidationStrategy } from 'src/interfaces/validation/ValidationStrategy';
import { VPField } from 'src/Field';
import { Validatable } from 'src/Validatable';
import { FieldsetOptions } from 'src/models/VPOptions/FieldsetOptions';
/**
 * VPFieldset Instance
 * @description
 * Fieldset instances are responsible for managing the relationship between fields. Fieldset instances
 * are capable of validating fields based upon a relationship, such as checkbox/radio fields being interdependent.
 * @example
 * // DOM Bindings, All Fields must validate true
 * <div id="sample_fieldset" class="VPFieldset" vp-find>
 *   <div class="VPField" vp-notify="false">
 *     <input id="first-name" aria-label="First Name" name="first-name" type="text" required="required" />
 *   </div>
 *
 *   <div class="VPField" vp-notify="false">
 *     <input id="last-name" aria-label="Last Name" name="last-name" type="text" required="required" />
 *   </div>
 * </div>
 *
 * @example
 * // DOM Bindings, One field must be true
 * <div id="sample_fieldset" class="VPFieldset" vp-strategy="one" vp-find>
 *  <div class="VPField">
 *    <label for="option_one">
 *      <input id="option_one" name="option-one" type="radio" value="one" required="required" />
 *      Option #1
 *    </label>
 *  </div>
 *
 *  <div class="VPField">
 *    <label for="option_two">
 *      <input id="option_two" name="option-two" type="radio" value="two" required="required" />
 *      Option #2
 *    </label>
 *  </div>
 *
 *  <div class="VPField">
 *    <label for="option_three">
 *      <input id="option_three" name="option-three" type="radio" value="three" required="required" />
 *      Option #3
 *    </label>
 *  </div>
 * </div>
 * @example
 * // Programmic bindings
 * const fieldset = new VP.Fieldset(document.getElementById('sample_fieldset'), {
 *    ValidationStrategy: "one"
 * });
 * const option_one_field = new VP.Field(document.getElementsById('field_one'))
 * const option_two_field = new VP.Field(document.getElementsById('field_two'))
 * const option_three_field = new VP.Field(document.getElementsById('field_three'))
 * fieldset.addField(option_one_field);
 * fieldset.addField(option_two_field);
 * fieldset.addField(option_three_field);
 * @augments Validatable
 */
export declare class VPFieldset extends Validatable<FieldsetOptions> {
    static Options: typeof FieldsetOptions;
    $strategy: ValidationStrategy;
    $fields: VPField[];
    $cached: VPField[];
    $canValidate: boolean;
    $observer: MutationObserver | undefined;
    get $visibleFields(): VPField[];
    constructor(element: HTMLElement, options?: VPFieldsetOptions);
    get $isValid(): boolean | null;
    set $isValid(isValid: boolean | null);
    /**
     * If running a modern browser, VP will automatically
     * handle removing tracked nodes which are removed from the DOM.
     * If supporting sub IE11, you must do this yourself using the removeField
     * helpers defined on this instance.
     * @private
     */
    $observe(mutations: MutationRecord[]): void;
    $fieldWatch(_e: Event, trigger: VPField): void;
    $fieldRemove(_e: Event, field: VPField): void;
    /**
     * Validation Cycle
     * @description
     * Standard Validation cycle for the Fieldset instance.
     *
     * + Validation will validate all tracked Fields
     * + Validation will return as either synchronous validation or asynchronous based on field responses.
     * + If Lazy, validation will stop at the first error
     * @returns (boolean|Promise.<boolean>)
     */
    isValid(): (boolean | Promise<boolean>);
    /**
     * Remove a tracked field from this fieldset
     * @param {VPField} field - Field instance to remove
     */
    removeField(field: VPField): (VPField | undefined);
    /**
     * Add a field instance to be tracked
     * @param {VPField} field - Field to track
     * @param {number} [index] - Indicate the field order to track by
     */
    addField(field: VPField, index?: number): void;
    /**
     * Helper method for creating a new Field to automatically track
     * @param {HTMLElement} el - Field Element
     * @param {VPFieldOptions} options - Options to apply to the field instance
     */
    createField(el: HTMLElement, options: VPFieldOptions): VPField;
    /**
     * Helper for automatically parsing child elements for Fields
     * @param {VPFieldOptions|VPFieldOptions[]} [fieldOptions] - Options to apply to the found fields. If array, options will apply based on index
     */
    findFields(fieldOptions?: (VPFieldOptions | VPFieldOptions[])): void;
}
