import debug from '@/util/debug'
import mergeDeep from '@/util/mergeDeep'
import toBoolean from '@/util/toBoolean'
import filterNullObj from '@/util/filterNullObject'
import isSet from '@/util/isSet'

import { VPFieldOptions } from '@/interfaces/VPOptions'
import CustomValidationRule from '@/interfaces/validation/CustomValidationRule'
import ValidationLifecycle from '@/interfaces/validation/ValidationLifecycle'
import ValidationAttributes from '@/interfaces/validation/ValidationAttributes'
import HTMLValidationRules from '@/interfaces/validation/HTMLValidationRules'

import Validatable from '@/Validatable'

class VPField extends Validatable {
  $options: VPFieldOptions = this.$options
  $dirty: boolean = false
  $input: (HTMLInputElement | null) = null
  $canValidate: boolean = true

  constructor (
    element: HTMLElement,
    options: VPFieldOptions,
    customRules: CustomValidationRule[],
    onValidate: ValidationLifecycle
  ) {
    super(options, element)

    mergeDeep(this.$options, {
      ForceRules: false,
      InputRules: {},
      CustomRules: customRules,
      InputFormatter: {},
      ShowFieldErrors: false,
      DirtyOnBlur: toBoolean(element.getAttribute('vp-dirty'), false),
      ValidateOn: {
        blur: toBoolean(element.getAttribute('vp-blur'), false),
        change: toBoolean(element.getAttribute('vp-change'), false),
        mouseLeave: toBoolean(element.getAttribute('vp-mouseleave'), false)
      }
    }, options)
    this.setLifecycle(onValidate)
    this.setInput()

    if (this.$input instanceof HTMLInputElement) {
      if (this.$options.Watch === true) {
        if (['radio', 'checkbox'].includes(this.$input.getAttribute('type') || '')) {
          this.$input.addEventListener('change', () => {
            if (this.$options.DirtyOnBlur === false) {
              this.$dirty = true
            }

            if (this.$canValidate === true && this.$dirty === true) {
              const emit = this.$isValid !== null

              let valid = this.isValid()
              if (emit) {
                this.dispatchEvent(this.createEvent('onValidate'), valid)
              }
            }
          })
        } else {
          this.$input.addEventListener('input', () => {
            if (this.$options.DirtyOnBlur === false) {
              this.$dirty = true
            }

            if (this.$canValidate === true && this.$dirty === true) {
              const emit = this.$isValid !== null

              let valid = this.isValid()
              if (emit) {
                this.dispatchEvent(this.createEvent('onValidate'), valid)
              }
            }
          })
        }
      }

      if (this.$options.ValidateOn.blur) {
        this.$input.addEventListener('blur', () => {
          this.$dirty = true

          let valid = this.isValid()
          this.dispatchEvent(this.createEvent('onValidate'), valid)
        })
      }

      if (this.$options.ValidateOn.change) {
        this.$input.addEventListener('change', () => {
          this.$dirty = true

          let valid = this.isValid()
          this.dispatchEvent(this.createEvent('onValidate'), valid)
        })
      }

      if (this.$options.ValidateOn.mouseleave) {
        this.$input.addEventListener('mouseleave', () => {
          this.$dirty = true

          let valid = this.isValid()
          this.dispatchEvent(this.createEvent('onValidate'), valid)
        })
      }
    }
  }

  parseInput (): ValidationAttributes {
    if (!(this.$input instanceof HTMLInputElement)) {
      throw new Error('[VPField] Input must be an instance of Element')
    }

    const inputRules: HTMLValidationRules = filterNullObj({
      min: this.$input.getAttribute('min'),
      minLength: this.$input.getAttribute('minlength'),
      max: this.$input.getAttribute('max'),
      maxLength: this.$input.getAttribute('maxlength'),
      pattern: this.$input.getAttribute('pattern'),
      required: this.$input.getAttribute('required')
    })

    const rules = this.$options.ForceRules
      ? Object.assign({}, inputRules, this.$options.InputRules)
      : Object.assign({}, this.$options.InputRules, inputRules)

    return {
      value: this.$input.value,
      checked: this.$input.checked,
      type: this.$input.getAttribute('type'),
      name:
        this.$input.getAttribute('data-name') ||
        this.$input.getAttribute('name') ||
        this.$input.tagName,
      rules
    }
  }

  setInput () {
    debug('[VPField] Querying inputs')

    let input = this.$element.getElementsByTagName('input')
    let select = this.$element.getElementsByTagName('select')
    let textarea = this.$element.getElementsByTagName('textarea')

    if (input.length > 0) debug('[VPField] Found input', input)
    if (select.length > 0) debug('[VPField] Found select', select)
    if (textarea.length > 0) debug('[VPField] Found textarea', textarea)

    // TODO: Add logic for specifying prefered input type
    this.$input = (input.item(0) || select.item(0) || textarea.item(0)) as HTMLInputElement
  }

  isValid () {
    this.$canValidate = false
    if (typeof this.$options.InputFormatter.pre === 'function') {
      if (this.$input === null) {
        throw new Error('[VPField] Cannot format Input as it is unset.')
      }

      this.$options.InputFormatter.pre(this.$input.innerHTML, (eventName: string) => {
        if (this.$input instanceof HTMLElement) {
          this.$input.dispatchEvent(this.createEvent(eventName))
        }
      })
    }

    let attributes = this.parseInput()
    let { value, checked, type, name, rules } = attributes

    let errors: boolean[] = []
    errors.concat(this.$options.CustomRules.map((func) => {
      if (typeof func === 'function') {
        return func(attributes, this.$element, this.$input)
      }

      return true
    }))

    if (isSet(rules.min)) {
      errors.push(
        +value >= +rules.min
          ? true
          : `${name} must be more than ${rules.min}.`
      );
    }
    if (isSet(rules.max)) {
      errors.push(
        +value <= +rules.max
          ? true
          : `${name} must be less than ${rules.max}.`
      );
    }
    if (isSet(rules.minLength)) {
      errors.push(
        value.length >= +rules.minLength
          ? true
          : `${name} must be ${rules.minLength} characters or more.`
      );
    }
    if (isSet(rules.maxLength)) {
      errors.push(
        value.length <= +rules.maxLength
          ? true
          : `${name} must be ${rules.maxLength} characters or less.`
      );
    }
    if (isSet(rules.pattern)) {
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
        if (isSet(rules.required) && rules.required) {
          errors.push(checked ? true : `${name} is required.`);
        }
        break;
      default:
        if (isSet(rules.required) && rules.required) {
          errors.push(value.length > 0 ? true : `${name} is required.`);
        }
    }

    this.clearMessages();
    this.$isValid = errors.every(err => err === true);

    if (typeof this.$options.InputFormatter.pre === 'string') {
      this.addMessage(this.$options.InputFormatter.pre, '-isInfo');
    }
    if (typeof this.$options.InputFormatter.post === 'function') {
      this.$options.InputFormatter.post(this.$input, eventName => {
        if (this.$input instanceof HTMLElement) {
          this.$input.dispatchEvent(this.createEvent(eventName))
        }
      });
    }

    this.$canValidate = true;
    return this.$isValid;
  }
}

export default VPField;
