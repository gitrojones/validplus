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

const VPField = class VPField extends Validatable {
  $dirty: boolean
  $inputs: boolean

  constructor(element, options) {
    super(element, options)

    this.$inputs = null;
    this.$dirty = false;

    mergeDeep(this.$options, {
      ForceRules: false,
      InputRules: {},
      CustomRules: [],
      InputFormatter: {},
      ShowFieldErrors: false,
      DirtyOnBlur: toBoolean(element.getAttribute('vp-dirty'), false),
      ValidateOnBlur: toBoolean(element.getAttribute('vp-blur'), false)
    }, options)
    this.setLifecycle(this.$options.Lifecycle)

    this.getInput();
    if (this.input instanceof Element) {
      if (this.options.watch === true) {
        if (['radio', 'checkbox'].includes(this.input.getAttribute('type'))) {
          this.input.addEventListener('change', () => {
            if (this.options.dirtyOnBlur === false) {
              this._dirty = true;
            }

            if (this.canValidate === true && this._dirty === true) {
              const emit = this._isValid !== null;

              let valid = this.isValid();
              if (emit) {
                this.dispatchEvent(this.createEvent('onValidate'), valid);
              }
            }
          });
        } else {
          this.input.addEventListener('input', () => {
            if (this.options.dirtyOnBlur === false) {
              this._dirty = true;
            }

            if (this.canValidate === true && this._dirty === true) {
              const emit = this._isValid !== null;

              let valid = this.isValid();
              if (emit) {
                this.dispatchEvent(this.createEvent('onValidate'), valid);
              }
            }
          });
        }
      }

      if (this.options.validateOnBlur) {
        this.input.addEventListener('blur', () => {
          this._dirty = true;

          let valid = this.isValid();
          this.dispatchEvent(this.createEvent('onValidate'), valid);
        });
      }
    }
  }

  parseInput() {
    if (!(this.input instanceof Element)) {
      throw new Error('[VPField] Input must be an instance of Element');
    }

    const inputRules = filterNullObj({
      min: this.input.getAttribute('min'),
      minLength: this.input.getAttribute('minlength'),
      max: this.input.getAttribute('max'),
      maxLength: this.input.getAttribute('maxlength'),
      pattern: this.input.getAttribute('pattern'),
      required: this.input.getAttribute('required'),
    });

    const rules = this.options.forceRules
      ? Object.assign({}, inputRules, this.options.rules)
      : Object.assign({}, this.options.rules, inputRules);

    return {
      value: this.input.value,
      checked: this.input.checked,
      type: this.input.getAttribute('type'),
      name:
        this.input.getAttribute('data-name') ||
        this.input.getAttribute('name') ||
        this.input.tagName,
      rules,
    };
  }

  getInput() {
    debug('[VPField] Querying inputs');

    let input = this.element.getElementsByTagName('input');
    let select = this.element.getElementsByTagName('select');
    let textarea = this.element.getElementsByTagName('textarea');

    if (input.length > 0) debug('[VPField] Found input', input);
    if (select.length > 0) debug('[VPField] Found select', select);
    if (textarea.length > 0) debug('[VPField] Found textarea', textarea);

    this.input = [].concat(
      Array.from(input),
      Array.from(select),
      Array.from(textarea)
    )[0];
  }

  isValid() {
    this.canValidate = false;
    if (typeof this.options.formatter.pre === 'function') {
      this.options.formatter.pre(this.input, eventName =>
        this.input.dispatchEvent(this.createEvent(eventName))
      );
    }

    let attributes = this.parseInput();
    let { value, checked, message, action, type, name, rules } = attributes;

    let errors = [];
    if (typeof this._customRules === 'function') {
      errors.push(this._customRules(attributes, this.element, this.input));
    } else if (Array.isArray(this._customRules)) {
      errors = errors.concat(
        this._customRules.map(rule => {
          if (typeof rule === 'function') {
            return rule(attributes, this.element, this.input);
          }

          return true;
        })
      );
    }

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
    this._isValid = errors.every(err => err === true);

    if (typeof this.options.formatter.pre === 'string') {
      this.addMessage(this.options.formatter.pre, '-isInfo');
    }

    if (this._isValid) {
      this.element.classList.remove(this.options.errorClass);
      this.element.classList.add(this.options.validClass);

      if (typeof this._onValidation.isValid.cb === 'function') {
        this._onValidation.isValid.cb();
      }
      if (typeof this._onValidation.isValid.message === 'string') {
        this.addMessage(
          this._onValidation.isValid.message,
          this.options.validClass
        );
      }
    } else {
      this.element.classList.remove(this.options.validClass);
      this.element.classList.add(this.options.errorClass);

      if (typeof this._onValidation.isInvalid.cb === 'function') {
        this._onValidation.isInvalid.cb();
      }

      if (this.options.showFieldErrors) {
        errors.filter(err => typeof err === 'string').forEach(err => {
          this.addMessage(err, this.options.errorClass);
        });
      }

      if (typeof this._onValidation.isInvalid.message === 'string') {
        this.addMessage(
          this._onValidation.isInvalid.message,
          this.options.errorClass
        );
      }
    }

    if (typeof this.options.formatter.post === 'function') {
      this.options.formatter.post(this.input, eventName =>
        this.input.dispatchEvent(this.createEvent(eventName))
      );
    }

    this.canValidate = true;
    return this._isValid;
  }
}

export default VPField;
