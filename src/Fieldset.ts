import VPField from './Field';

import debug from './util/debug';
import mergeDeep from './util/mergeDeep';

import { VPFieldsetOptions } from './interfaces/VPOptions'
import ValidationStrategy from './interfaces/ValidationStrategy'
import Validatable from './Validatable'

const VPFieldset = class VPFieldset extends Validatable {
  $strategy: ValidationStrategy
  $fields: VPField[]
  get $visibleFields(): VPField[] {
    return this.$fields.filter((field: VPField) => {
      return this.isElementVisible(field.element)
    })
  }

  constructor(element: HTMLElement, strategy, options: VPFieldsetOptions, onValidate = {}) {
    super(options, element)

    let validationStrategy = strategy;
    if (typeof strategy === 'string') {
      validationStrategy = this.$strategies[strategy];
    }
    if (typeof validationStrategy !== 'function') {
      throw new Error(
        '[VPFieldset] Expected ValidationStrategy to be a function.'
      );
    }

    // TODO: Legacy support for onValidate
    mergeDeep(this.$options, {
      ValidationStrategy: validationStrategy,
      ValidateVisible: true,
      FieldClass: 'VPField'
    }, options)
    this.setLifecycle(onValidate)
    this.$strategy = this.$options.ValidationStrategy
    this.$fields = []
  }

  isValid() {
    const fields = this.$options.ValidateVisible ? this.$visibleFields : this.$fields
    const fieldSetStatus = fields.reduce((status, field, index) => {
      debug('[VPFieldset] Validating field', index);
      status.push(field.isValid());

      return status;
    }, []);

    this.$isValid = this.$strategy(fieldSetStatus);
    return this.$isValid;
  }

  removeField(field) {
    if (!(field instanceof VPField)) {
      throw new Error('[VPFieldset] Field must be an instanceof VPField');
    }

    const index = this.$fields.indexOf(field);
    if (index !== -1) {
      this.$fields = this.$fields.splice(index, 1);
    }
  }

  watchField(field) {
    if (!(field instanceof VPField)) {
      throw new Error('Field must be an instance of VPField');
    }

    // TODO: Optimize by tracking state and only revalidating
    // if internal state changes. Currently wasteful
    field.addEventListener('onValidate', (e, isValid) => {
      const valid = this.isValid();
      const emit = this.$isValid !== null;

      if (emit) {
        this.dispatchEvent(this.createEvent('onValidate'), valid);
      }
    });
  }

  addField(field) {
    if (!(field instanceof VPField)) {
      throw new Error('[VPFieldset] Field must be an instanceof VPField');
    }
    debug('[VPFieldset] Adding field');

    this.$fields.push(field);
    if (this.$options.Watch === true) {
      this.watchField(field);
    }
  }

  // TODO: Enforce onValidate structure
  createField(el, options, customRules, onValidate) {
    if (!(el instanceof Element)) {
      throw new Error(
        '[VPFieldset] Field Element must be a valid DOMElement.'
      );
    }

    const field = new VPField(el, options, customRules, onValidate);
    this.$fields.push(field);
    if (this.$options.Watch === true) {
      this.watchField(field);
    }

    return field;
  }

  findFields() {
    const vm = this;
    let fields = Array.from(
      this.$element.getElementsByClassName(this.$options.fieldClass)
    );

    // TODO: Attribute parsing to fill in the gaps
    this.$fields = fields.map(field => {
      const _field = new VPField(field, {});
      if (this.$options.Watch === true) {
        this.watchField(_field);
      }

      return _field;
    });
  }
}

export default VPFieldset;