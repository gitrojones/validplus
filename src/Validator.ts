import Validatable from './Validatable';
import VPFieldset from './Fieldset';

import debug from './util/debug';
import mergeDeep from './util/mergeDeep';

import DOMMessaging from './mixins/DOMMessaging';
import { VPValidatorOptions } from './interfaces/VPOptions'

/**
 * ValidPlus Validator instance, the container
 * responsible for firing off the validation cycle
 *
 * @name VPValidator
 */
class VPValidator extends Validatable {
  private $fieldsets: VPFieldset[];
  private get $visibleFieldsets(): VPFieldset[] {
    return this.$fieldsets.filter((fieldset: VPFieldset) => {
      return this.isElementVisible(fieldset.element)
    })
  }

  /**
   * @param options - Configuration for the Validator
   * @param element - Validator Anchor Element (Typically a form)
   */
  constructor(options: VPValidatorOptions, element: HTMLElement) {
    super(options, element);

    this.$fieldsets = [];
    mergeDeep(this.$options, {
      ValidateLazy: true,
      ValidateVisible: true,
      ValidationInputs: ['input', 'select', 'textarea'],
    }, options)
    this.setLifecycle(this.$options.Lifecycle)
  }

  isValid() {
    let fieldsets = this.$options.ValidateVisible ? this.$visibleFieldsets : this.$fieldsets
    let isValid
    if (this.$options.ValidateLazy) {
      isValid = fieldsets.every(fieldset => {
        return fieldset.isValid();
      });
    } else {
      isValid = fieldsets.reduce((isValid, fieldset) => {
        if (!fieldset.isValid()) {
          isValid = false;
        }

        return isValid;
      }, true);
    }

    this.$isValid = isValid
    return isValid
  }

  // TODO: Child state checks
  // TODO: Add MutationObserver on children
  addFieldset(fieldset: VPFieldset) {
    if (!(fieldset instanceof VPFieldset)) {
      throw new Error('[Validator] Fieldset must be an instanceof VPFieldset');
    }

    this.$fieldsets.push(fieldset);
    if (this.$options.Watch === true) {
      this.watchFieldset(fieldset);
    }
  }

  // TODO: method to remove watchers
  watchFieldset(fieldset) {
    if (!(fieldset instanceof VPFieldset)) return;

    // TODO: Optimize by tracking state and only revalidating
    // if internal state changes. Currently wasteful
    fieldset.addEventListener('onValidate', (e, isValid) => {
      this.isValid();
    });
  }

  removeFieldset(fieldset) {
    const index = this.$fieldsets.indexOf(fieldset);
    if (index !== -1) {
      const removedField = this.$fieldsets.splice(index, 1);
      // TODO: Remove MutationObserver
    }
  }

  // TODO: Append Predefined Fields w/ CB logic
  // TODO: Validate onValidate structure
  // TODO: Add MutationObserver on children
  createFieldset(fs: HTMLElement,
    strategy: VPValidatorStrategy,
    options: VPFieldsetOptions,
    fields: VPField[], onValidate = null) {
    const fieldset = new VPFieldset(fs, strategy, options, onValidate);
    fields.forEach(field => {
      fieldset.addField(field);
    });

    this.$fieldsets.push(fieldset);
    if (this.$options.Watch === true) {
      this.watchFieldset(fieldset);
    }

    return fieldset;
  }
}

export default VPValidator;
