import debug from './util/debug';
import mergeDeep from './util/mergeDeep';
import toBoolean from './util/toBoolean';

import Validatable from './Validatable'

const filterNullObj = obj => {
  return Object.keys(obj).reduce((newObj, key) => {
    const value = obj[key];

    if (value !== null && typeof value !== 'undefined') {
      newObj[key] = value;
    }

    return newObj;
  }, {});
};
const isValidRule = rule => {
  return typeof rule !== 'undefined' && rule !== null;
};

class VPField extends Validatable {
  $dirty: boolean
  $input: HTMLInputElement
  $canValidate: boolean

  constructor(element, options, customRules, onValidate) {
    super(options, element)

    this.$input = null;
    this.$dirty = false;
    this.$canValidate = true;

    mergeDeep(this.$options, {
      ForceRules: false,
      InputRules: {},
      CustomRules: customRules,
      InputFormatter: {},
      ShowFieldErrors: false,
      DirtyOnBlur: toBoolean(element.getAttribute('vp-dirty'), false),
      ValidateOnBlur: toBoolean(element.getAttribute('vp-blur'), false)
    }, options)
    this.setLifecycle(onValidate)

    this.getInput();
    if (this.$input instanceof Element) {
      if (this.$options.Watch === true) {
        if (['radio', 'checkbox'].includes(this.$input.getAttribute('type'))) {
          this.$input.addEventListener('change', () => {
            if (this.$options.DirtyOnBlur === false) {
              this.$dirty = true;
            }

            if (this.$canValidate === true && this.$dirty === true) {
              const emit = this.$isValid !== null;

              let valid = this.isValid();
              if (emit) {
                console.log('here 1', this.dispatchEvent)
                this.dispatchEvent(this.createEvent('onValidate'), valid);
              }
            }
          });
        } else {
          this.$input.addEventListener('input', () => {
            if (this.$options.DirtyOnBlur === false) {
              this.$dirty = true;
            }

            if (this.$canValidate === true && this.$dirty === true) {
              const emit = this.$isValid !== null;

              let valid = this.isValid();
              if (emit) {
                console.log('here 2', this.dispatchEvent)
                this.dispatchEvent(this.createEvent('onValidate'), valid);
              }
            }
          });
        }
      }

      if (this.$options.ValidateOnBlur) {
        this.$input.addEventListener('blur', () => {
          this.$dirty = true;

          let valid = this.isValid();
          console.log('here 3', this.dispatchEvent)
          this.dispatchEvent(this.createEvent('onValidate'), valid);
        });
      }
    }
  }

  parseInput() {
    if (!(this.$input instanceof Element)) {
      throw new Error('[VPField] Input must be an instance of Element');
    }

    const inputRules = filterNullObj({
      min: this.$input.getAttribute('min'),
      minLength: this.$input.getAttribute('minlength'),
      max: this.$input.getAttribute('max'),
      maxLength: this.$input.getAttribute('maxlength'),
      pattern: this.$input.getAttribute('pattern'),
      required: this.$input.getAttribute('required'),
    });

    const rules = this.$options.ForceRules
      ? Object.assign({}, inputRules, this.$options.InputRules)
      : Object.assign({}, this.$options.InputRules, inputRules);

    return {
      value: this.$input.value,
      checked: this.$input.checked,
      type: this.$input.getAttribute('type'),
      name:
        this.$input.getAttribute('data-name') ||
        this.$input.getAttribute('name') ||
        this.$input.tagName,
      rules,
    };
  }

  getInput() {
    debug('[VPField] Querying inputs');

    let input = this.$element.getElementsByTagName('input');
    let select = this.$element.getElementsByTagName('select');
    let textarea = this.$element.getElementsByTagName('textarea');

    if (input.length > 0) debug('[VPField] Found input', input);
    if (select.length > 0) debug('[VPField] Found select', select);
    if (textarea.length > 0) debug('[VPField] Found textarea', textarea);

    this.$input = [].concat(
      Array.from(input),
      Array.from(select),
      Array.from(textarea)
    )[0];
  }

  isValid() {
    this.$canValidate = false;
    if (typeof this.$options.InputFormatter.pre === 'function') {
      this.$options.InputFormatter.pre(this.$input, (eventName) => {
        this.$input.dispatchEvent(this.createEvent(eventName))
      });
    }

    let attributes = this.parseInput();
    let { value, checked, message, action, type, name, rules } = attributes;

    let errors = [];
    errors.concat(this.$options.CustomRules.map((func) => {
      if (typeof func === 'function') {
        return func(attributes, this.$element, this.$input)
      }

      return true
    }))

    if (isValidRule(rules.min)) {
      errors.push(
        +value >= +rules.min
          ? true
          : `${name} must be more than ${rules.min}.`
      );
    }
    if (isValidRule(rules.max)) {
      errors.push(
        +value <= +rules.max
          ? true
          : `${name} must be less than ${rules.max}.`
      );
    }
    if (isValidRule(rules.minLength)) {
      errors.push(
        value.length >= +rules.minLength
          ? true
          : `${name} must be ${rules.minLength} characters or more.`
      );
    }
    if (isValidRule(rules.maxLength)) {
      errors.push(
        value.length <= +rules.maxLength
          ? true
          : `${name} must be ${rules.maxLength} characters or less.`
      );
    }
    if (isValidRule(rules.pattern)) {
      errors.push(
        (rules.pattern instanceof RegExp
        ? rules.pattern.test(value)
        : new RegExp(rules.pattern).test(value))
          ? true
          : `${name} is incorrectly formatted.`
      );
    }

    switch (type) {
      case 'radio':
      case 'checkbox':
        // One should always be selected if required
        if (isValidRule(rules.required) && rules.required) {
          errors.push(checked ? true : `${name} is required.`);
        }
        break;
      default:
        if (isValidRule(rules.required) && rules.required) {
          errors.push(value.length > 0 ? true : `${name} is required.`);
        }
    }

    this.clearMessages();
    this.$isValid = errors.every(err => err === true);

    if (typeof this.$options.InputFormatter.pre === 'string') {
      this.addMessage(this.$options.InputFormatter.pre, '-isInfo');
    }
    if (typeof this.$options.InputFormatter.post === 'function') {
      this.$options.InputFormatter.post(this.$input, eventName =>
        this.$input.dispatchEvent(this.createEvent(eventName))
      );
    }

    this.$canValidate = true;
    return this.$isValid;
  }
}

export default VPField;
