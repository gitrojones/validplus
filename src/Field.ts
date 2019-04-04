import { debug } from '@/util/debug'
import { hasAsync } from '@/util/hasAsync'
import { mergeDeep } from '@/util/mergeDeep'
import { toBoolean } from '@/util/casts/toBoolean'
import { toNumber } from '@/util/casts/toNumber'
import { toRegexp } from '@/util/casts/toRegexp'
import { filterNullObject } from '@/util/filterNullObject'
import { isSet } from '@/util/isSet'

import { VPFieldOptions } from '@/interfaces/VPOptions'
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule'
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'
import { ValidationAttributes } from '@/interfaces/validation/ValidationAttributes'
import { HTMLValidationRules } from '@/interfaces/validation/HTMLValidationRules'

import { Validatable } from '@/Validatable'

export class VPField extends Validatable {
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
      ShowCustomRuleErrors: true,
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

    const inputRules: HTMLValidationRules = filterNullObject({
      min: toNumber(this.$input.getAttribute('min')),
      minlength: toNumber(this.$input.getAttribute('minlength')),
      max: toNumber(this.$input.getAttribute('max')),
      maxlength: toNumber(this.$input.getAttribute('maxlength')),
      pattern: toRegexp(this.$input.getAttribute('pattern')),
      required: toBoolean(this.$input.getAttribute('required'), null)
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

  isValid (): (boolean | Promise<boolean>) {
    this.$canValidate = false
    // Clear last cycle messages
    this.clearMessages()

    // tslint:disable-next-line: strict-type-predicates
    if (typeof this.$options.InputFormatter.pre === 'function') {
      if (this.$input === null) {
        throw new Error('[VPField] Cannot format Input as it is unset.')
      }

      this.$options.InputFormatter.pre(this.$input, (eventName: string) => {
        if (this.$input instanceof HTMLElement) {
          this.$input.dispatchEvent(this.createEvent(eventName))
        }
      })
    }

    // Main validation loop
    let attributes = this.parseInput()
    let { value, checked, type, name, rules } = attributes
    let errors: (boolean | string)[] = []

    if (isSet(rules.min)) {
      const numValue = toNumber(value)
      const rule: number = rules.min as number

      if (numValue) {
        errors.push(numValue < +rule
          ? `${name} must be more than ${rules.min}.`
          : true)
      }
    }

    if (isSet(rules.max)) {
      const rule: number = rules.max as number

      errors.push(
        +value <= +rule
          ? true
          : `${name} must be less than ${rules.max}.`
      )
    }

    if (isSet(rules.minlength)) {
      const rule: number = rules.minlength as number
      errors.push(
        value.length >= +rule
          ? true
          : `${name} must be ${rules.minlength} characters or more.`
      )
    }

    if (isSet(rules.maxlength)) {
      const rule: number = rules.maxlength as number
      errors.push(
        value.length <= +rule
          ? true
          : `${name} must be ${rules.maxlength} characters or less.`
      )
    }

    if (isSet(rules.pattern)) {
      const rule: (RegExp | string) = rules.pattern as RegExp

      errors.push(
      (rules.pattern instanceof RegExp
      ? rules.pattern.test(value)
      : new RegExp(rule).test(value))
        ? true
        : `${name} is incorrectly formatted.`
      )
    }

    switch (type) {
    case 'radio':
    case 'checkbox':
      // One should always be selected if required
      if (isSet(rules.required) && rules.required) {
        errors.push(checked ? true : `${name} is required.`)
      }
      break
    default:
      if (isSet(rules.required) && rules.required) {
        errors.push(value.length > 0 ? true : `${name} is required.`)
      }
    }

    if (this.$options.ShowFieldErrors) {
      errors.forEach((error) => {
        if (typeof error === 'string' && error.length > 0) {
          this.addMessage(error, '-isError')
        }
      })
    }

    // tslint:disable-next-line: strict-type-predicates
    if (typeof this.$options.InputFormatter.post === 'string') {
      this.addMessage(this.$options.InputFormatter.post, '-isInfo')
    }

    // tslint:disable-next-line: strict-type-predicates
    if (typeof this.$options.InputFormatter.post === 'function') {
      if (this.$input instanceof HTMLInputElement) {
        this.$options.InputFormatter.post(this.$input, (eventName: string) => {
          if (this.$input instanceof HTMLElement) {
            this.$input.dispatchEvent(this.createEvent(eventName))
          }
        })
      }
    }

    // Custom validation loop
    let resolvedCustomRules = this.$options.CustomRules.map((func) => {
      return func(attributes, this.$element, this.$input as HTMLInputElement)
    })

    if (hasAsync(resolvedCustomRules)) {
      return new Promise((resolve) => {
        let customRulesAsPromise = resolvedCustomRules.map((rule) => {
          // Check if value
          if (typeof rule === 'string' || typeof rule === 'boolean') {
            return Promise.resolve(rule)
          // Check if promise
          // tslint:disable-next-line: strict-type-predicates
          } else if (typeof rule.then === 'function') {
            return rule
          } else {
            throw new Error('[VPField] Unknown customRule format')
          }
        })

        Promise.all(customRulesAsPromise)
          .then((errors) => {
            const customErrors = errors.filter((e) => e !== true)
            this.$isValid = errors.every((err) => err === true)

            if (this.$options.ShowCustomRuleErrors) {
              customErrors.forEach((error) => {
                if (typeof error === 'string' && error.length > 0) {
                  this.addMessage(error, '-isError')
                }
              })
            }

            this.$canValidate = true
            return resolve(this.$isValid)
          })
          .catch((err) => {
            console.error('[VPField] Failed CustomRule Validation', err)
            this.$isValid = false
            this.$canValidate = true
            return resolve(this.$isValid)
          })
      })
    } else {
      this.$isValid = [...errors, ...resolvedCustomRules]
        .every((err) => err === true)
      this.$canValidate = true
      return this.$isValid
    }
  }
}
