import merge from 'lodash/merge'
import {VPFieldOptions} from 'src/interfaces/VPOptions'
import {InputFormatters} from 'src/interfaces/InputFormatters'
import {ChangeActions} from 'src/interfaces/events/ChangeActions'
import {HTMLValidationRules} from 'src/interfaces/validation/HTMLValidationRules'
import {CustomValidationRule} from 'src/interfaces/validation/CustomValidationRule'

import {ValidatableOptions} from './ValidatableOptions'
import {ValidInput} from 'src/types/ValidInput'
import {toBoolean} from 'src/util/casts/toBoolean'
import {getAttributeIfSet} from 'src/util/getAttributeIfSet'

/**
 * Field Options instance for VPField
 * @category Options
 * @description
 * Internally created VPField options instance, implementing the VPFieldOptions interface w/
 * standard defaults applied dynamically from the DOM bindings or statically if undefined.
 *
 * __NOTE:__ See property descriptions for DOM binding attribute names, if implemented
 * @prop {boolean} [Notify=true] - vp-notify
 * @prop {boolean} [ShowFieldRuleErrors=false] - vp-field-errors
 * @prop {boolean} [ShowCustomRuleErrors=true] - vp-custom-errors
 * @prop {boolean} [ValidateLazyCustomRules=true] - vp-lazy-custom || vp-lazy
 * @prop {boolean} [ValidateLazyFieldFields=true] - vp-lazy-fields || vp-lazy
 * @prop {boolean} [ValidateAsync=false] - vp-async
 * @prop {boolean} [ValidateAsyncResolved=true] - vp-await
 * @prop {boolean} [DirtyOn.blur=false] - vp-dirty-blur
 * @prop {boolean} [DirtyOn.input=true] - vp-dirty-input
 * @prop {boolean} [DirtyOn.change=false] - vp-dirty-change
 * @prop {boolean} [DirtyOn.mouseleave=false] - vp-dirty-mouseleave
 * @prop {boolean} [FormatOn.blur=false] - vp-format-blur
 * @prop {boolean} [FormatOn.input=true] - vp-format-input
 * @prop {boolean} [FormatOn.change=false] - vp-format-change
 * @prop {boolean} [FormatOn.mouseleave=false] - vp-format-mouseleave
 * @prop {boolean} [ValidateOn.blur=true] - vp-blur || vp-validate-blur
 * @prop {boolean} [ValidateOn.input=false] - vp-input || vp-validate-input
 * @prop {boolean} [ValidateOn.change=false] - vp-change || vp-validate-change
 * @prop {boolean} [ValidateOn.mouseleave=false] - vp-mouseleave || vp-validate-mouseleave
 * @prop {boolean} [ForceRules=false]
 * @prop {HTMLValidationRules} [InputRules={}]
 * @prop {CustomValidationRule[]} [CustomRules=[]]
 * @prop {InputFormatters} [InputFormatter={}]
 * @prop {null|ValidInput} [PrimaryInput=null]
 * @prop {number} [PrimaryInputIndex=0]
 * @prop {null|string} [PrimaryInputType=null]
 * @prop {string[]} [InputTypes=['select','input','textarea']]
 * @see {@link VPFieldOptions} For more information on properties defined
 * @augments ValidatableOptions
 */
export class FieldOptions extends ValidatableOptions<FieldOptions> implements VPFieldOptions {
  Notify = true;
  ValidateAsync = false;
  ValidateAsyncResolved = true;
  ShowFieldRuleErrors = false;
  ShowCustomRuleErrors = true;
  ValidateLazyCustomRules = true;
  ValidateLazyFieldRules = true;
  DirtyOn: ChangeActions = {
    blur: false,
    input: true,
    change: false,
    mouseleave: false
  } as ChangeActions;
  FormatOn: ChangeActions = {
    blur: false,
    input: true,
    change: false,
    mouseleave: false
  } as ChangeActions;
  ValidateOn: ChangeActions = {
    blur: true,
    input: false,
    change: false,
    mouseleave: false
  } as ChangeActions;
  ForceRules = false;
  InputRules: HTMLValidationRules = {} as HTMLValidationRules;
  CustomRules: CustomValidationRule[] = [];
  InputFormatter: InputFormatters = {} as InputFormatters;
  PrimaryInput: (null | ValidInput) = null;
  PrimaryInputIndex = 0;
  PrimaryInputType: (null | string) = null;
  InputTypes: ('select' | 'input' | 'textarea')[] = ['select', 'input', 'textarea'];

  constructor(options: VPFieldOptions, element: HTMLElement) {
    super(options, element);

    // DOM Options merge
    const _options = {
      Notify: toBoolean(getAttributeIfSet(element, 'vp-notify', this.Notify)),
      ValidateAsync: toBoolean(getAttributeIfSet(element, 'vp-async', this.ValidateAsync)),
      ValidateAsyncResolved: toBoolean(getAttributeIfSet(element, 'vp-await', this.ValidateAsyncResolved)),
      DirtyOn: {
        blur: toBoolean(getAttributeIfSet(element, 'vp-dirty-blur', this.DirtyOn.blur)),
        input: toBoolean(getAttributeIfSet(element, 'vp-dirty-input', this.DirtyOn.input)),
        change: toBoolean(getAttributeIfSet(element, 'vp-dirty-change', this.DirtyOn.change)),
        mouseleave: toBoolean(getAttributeIfSet(element, 'vp-dirty-mouseleave', this.DirtyOn.mouseleave))
      },
      FormatOn: {
        blur: toBoolean(getAttributeIfSet(element, 'vp-format-blur', this.FormatOn.blur)),
        input: toBoolean(getAttributeIfSet(element, 'vp-format-input', this.FormatOn.input)),
        change: toBoolean(getAttributeIfSet(element, 'vp-format-change', this.FormatOn.change)),
        mouseleave: toBoolean(getAttributeIfSet(element, 'vp-format-mouseleave', this.FormatOn.mouseleave))
      },
      ValidateOn: {
        blur: toBoolean(getAttributeIfSet(element, 'vp-blur',
          getAttributeIfSet(element, 'vp-validate-blur', this.ValidateOn.blur))),
        input: toBoolean(getAttributeIfSet(element, 'vp-input',
          getAttributeIfSet(element, 'vp-validate-input', this.ValidateOn.input))),
        change: toBoolean(getAttributeIfSet(element, 'vp-change',
          getAttributeIfSet(element, 'vp-validate-change', this.ValidateOn.change))),
        mouseleave: toBoolean(getAttributeIfSet(element, 'vp-mouseleave',
          getAttributeIfSet(element, 'vp-validate-mouseleave', this.ValidateOn.mouseleave)))
      },
      ShowFieldRuleErrors: toBoolean(getAttributeIfSet(element, 'vp-field-errors', this.ShowFieldRuleErrors)),
      ShowCustomRuleErrors: toBoolean(getAttributeIfSet(element, 'vp-custom-errors', this.ShowCustomRuleErrors)),
      ValidateLazyCustomRules: toBoolean(getAttributeIfSet(element, 'vp-lazy-custom',
        getAttributeIfSet(element, 'vp-lazy', this.ValidateLazyCustomRules))),
      ValidateLazyFieldRules: toBoolean(getAttributeIfSet(element, 'vp-lazy-field',
        getAttributeIfSet(element, 'vp-lazy', this.ValidateLazyCustomRules)))
    }

    merge(this, _options, options);
  }
}
