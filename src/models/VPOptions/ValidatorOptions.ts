import merge from 'lodash/merge'
import { VPValidatorOptions } from 'src/interfaces/VPOptions'
import { ValidatableOptions } from './ValidatableOptions'
import {getAttributeIfSet} from 'src/util/getAttributeIfSet'
import {toBoolean} from 'src/util/casts/toBoolean'

/**
 * Validator Options instance for VPValidator
 * @category Options
 * @description
 * Internally created VPValidator options instance, implementing the VPValidatorOptions interface w/
 * standard defaults applied dynamically from the DOM bindings or statically if undefined.
 *
 * __NOTE:__ See property descriptions for DOM binding attribute names, if implemented
 * @prop {boolean} [FindFieldsets=false] - vp-find?
 * @prop {string} [FieldsetClass=VPFieldset]  - vp-find
 * @prop {boolean} [ValidateLazy=true] - vp-lazy
 * @prop {boolean} [ValidateVisible=true] - vp-visible
 *
 * @see {@link VPOptions} For more information on properties defined
 * @augments ValidatableOptions
 */
export class ValidatorOptions extends ValidatableOptions<ValidatorOptions> implements VPValidatorOptions {
  // Setup
  FindFieldsets = false;
  FieldsetClass = 'VPFieldset';

  // ControlFlow
  ValidateLazy = true;
  ValidateVisible = true;

  constructor(options: VPValidatorOptions, element: HTMLElement) {
    super(options, element);

    const Find = getAttributeIfSet<string|boolean>(element, 'vp-find', this.FindFieldsets);
    const _options = {
      FindFieldsets: !!Find,
      FieldsetClass: typeof Find === 'string' ? Find : this.FieldsetClass,
      ValidateLazy: toBoolean(getAttributeIfSet(element, 'vp-lazy', this.ValidateLazy)),
      ValidateVisible: toBoolean(getAttributeIfSet(element, 'vp-visible', this.ValidateVisible))
    }

    merge(this, _options, options);
  }
}
