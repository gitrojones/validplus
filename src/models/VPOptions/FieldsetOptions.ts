import merge from 'lodash/merge'
import {VPFieldsetOptions} from 'src/interfaces/VPOptions'
import {ValidationOption} from 'src/interfaces/validation/ValidationStrategy'

import {ValidatableOptions} from './ValidatableOptions'
import {getAttributeIfSet} from 'src/util/getAttributeIfSet'
import {toBoolean} from 'src/util/casts/toBoolean'

/**
 * Fieldset Options instance for VPFieldset
 * @category Options
 * @description
 * Internally created VPFieldset options instance, implementing the VPFieldsetOptions interface w/
 * standard defaults applied dynamically from the DOM bindings or statically if undefined.
 *
 * __NOTE:__ See property descriptions for DOM binding attribute names, if implemented
 * @prop {boolean} [FindFields=false] - vp-find?
 * @prop {string} [FieldClass='VPField'] - vp-find
 * @prop {boolean} [ValidateVisible=true] - vp-visible
 * @prop {ValidationOption} [ValidationStrategy='all'] - vp-strategy
 * @prop {boolean} [ScrollTo=true] - vp-scroll
 * @see {@link VPFieldsetOptions} For more information on properties defined
 * @augments ValidatableOptions
 */
export class FieldsetOptions extends ValidatableOptions<FieldsetOptions> implements VPFieldsetOptions {
  FieldClass = 'VPField';
  FindFields = false;
  ValidateVisible = true;
  ValidationStrategy: ValidationOption = 'all';
  ScrollTo = true;

  constructor(options: VPFieldsetOptions, element: HTMLElement) {
    super(options, element);

    const Find = getAttributeIfSet<string|boolean>(element, 'vp-find', this.FindFields);
    const _options = {
      FindFields: !!Find,
      FieldClass: Find ? Find : this.FieldClass,
      ValidateVisible: toBoolean(getAttributeIfSet(element, 'vp-visible', this.ValidateVisible)),
      ValidationStrategy: getAttributeIfSet(element, 'vp-strategy', this.ValidationStrategy),
      ScrollTo: toBoolean(getAttributeIfSet(element, 'vp-scroll', this.ScrollTo))
    };

    merge(this, _options, options);
  }
}
