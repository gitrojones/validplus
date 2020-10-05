import merge from 'lodash/merge'
import { debug } from 'src/util/debug'
import { hasAsync } from 'src/util/hasAsync'
import { isAsync } from 'src/util/isAsync'
import { isValidInput } from 'src/util/isValidInput'
import { toBoolean } from 'src/util/casts/toBoolean'
import { toNumber } from 'src/util/casts/toNumber'
import { toRegexp } from 'src/util/casts/toRegexp'
import { filterNullObject } from 'src/util/filterNullObject'
import { isSet } from 'src/util/isSet'

import { VPFieldOptions } from 'src/interfaces/VPOptions'
import { CustomValidationRule } from 'src/interfaces/validation/CustomValidationRule'
import { ValidationAttributes } from 'src/interfaces/validation/ValidationAttributes'
import { HTMLValidationRules } from 'src/interfaces/validation/HTMLValidationRules'

import { ValidInput } from 'src/types/ValidInput'
import { Validatable } from 'src/Validatable'
import { FieldOptions } from 'src/models/VPOptions/FieldOptions'

const InputFormatter = function InputFormatter(self: VPField, type: ('pre'|'post')) {
  const formatter = self.$options.InputFormatter[type];
  if (self.$input === null) {
    throw new Error('[VPField] Cannot format Input as it is unset.')
  }

  if (typeof formatter === 'function') {
    formatter(self.$input, (eventName: string) => {
      if (self.$input instanceof HTMLElement) {
        self.$formatterEvent[type] = true
        self.$input.dispatchEvent(self.createEvent(eventName))
      }
    })
  }
}

export class VPField extends Validatable {
  static Options = FieldOptions

  $Input: (ValidInput | null) = null
  $dirty = false
  $canValidate = true
  $formatterEvent: { pre: boolean, post: boolean } = {
    pre: false,
    post: false
  }

  constructor (element: HTMLElement, options: VPFieldOptions = {} as VPFieldOptions) {
    super(element, new VPField.Options(merge({
      DirtyOn: {
        blur: toBoolean(element.getAttribute('vp-dirty-blur'), false),
        input: toBoolean(element.getAttribute('vp-dirty-input'), true),
        change: toBoolean(element.getAttribute('vp-dirty-change'), false),
        mouseleave: toBoolean(element.getAttribute('vp-dirty-mouseleave'), false)
      },
      FormatOn: {
        blur: toBoolean(element.getAttribute('vp-format-blur'), false),
        input: toBoolean(element.getAttribute('vp-format-input'), true),
        change: toBoolean(element.getAttribute('vp-format-change'), false),
        mouseleave: toBoolean(element.getAttribute('vp-format-mouseleave'), false)
      },
      ValidateOn: {
        blur: toBoolean(element.getAttribute('vp-blur'), false),
        input: toBoolean(element.getAttribute('vp-input'), true),
        change: toBoolean(element.getAttribute('vp-change'), false),
        mouseleave: toBoolean(element.getAttribute('vp-mouseleave'), false)
      }
    }, options) as VPFieldOptions, element))

    if (!(element instanceof HTMLElement)) {
      throw new Error('[VPField] Expected element')
    }

    this.setInput(this.$options.PrimaryInput)
  }

  get $input (): ValidInput { return this.$Input as ValidInput }
  set $input (input: ValidInput) {
    const handleEventDefault = (e: Event) => {
      const eventType: string = e.type

      const format: boolean = this.$options.FormatOn[eventType] || false
      const validate: boolean = this.$options.ValidateOn[eventType] || false
      const dirty: boolean = this.$options.DirtyOn[eventType] || false

      if (dirty) this.$dirty = true;
      const formatterEvent = this.$formatterEvent.pre || this.$formatterEvent.post

      // We alias this for our purposes
      if (format && !formatterEvent) this.formatInputPre()
      if (this.$canValidate && this.$dirty && validate) {
        this.isValid(true)
      }
      if (format && !formatterEvent) this.formatInputPost()

      this.$formatterEvent.pre = false
      this.$formatterEvent.post = false
    }

    if (input && isValidInput(input)) {
      this.$Input = input
      this.$lifecycleElements.push(input);

      input.addEventListener('input', handleEventDefault)
      input.addEventListener('change', handleEventDefault)
      input.addEventListener('blur', handleEventDefault)
      input.addEventListener('mouseleave', handleEventDefault)
    } else {
      console.warn('[VPField] Input is missing')
    }
  }

  parseInput (): ValidationAttributes {
    if (this.$input && !isValidInput(this.$input)) {
      throw new Error('[VPField] Input must be Input/Select/TextArea')
    }

    const inputRules: HTMLValidationRules = filterNullObject({
      min: toNumber(this.$input.getAttribute('min')),
      minlength: toNumber(this.$input.getAttribute('minlength')),
      max: toNumber(this.$input.getAttribute('max')),
      maxlength: toNumber(this.$input.getAttribute('maxlength')),
      pattern: toRegexp(this.$input.getAttribute('pattern')),
      required: this.$input.required || toBoolean(this.$input.getAttribute('required'), null)
    })

    const rules = this.$options.ForceRules
      ? Object.assign({}, inputRules, this.$options.InputRules)
      : Object.assign({}, this.$options.InputRules, inputRules)

    return {
      value: this.$input.value,
      checked: (this.$input instanceof HTMLSelectElement)
        ? false
        : (this.$input as HTMLInputElement).checked,
      type: this.$input.getAttribute('type'),
      name:
        this.$input.getAttribute('data-name') ||
        this.$input.getAttribute('name') ||
        this.$input.tagName,
      rules
    }
  }

  setInput (input: ValidInput | null): void {
    interface FilteredControllerTypes { [type: string]: ValidInput[] }
    const flipflop = () => {
      ['ValidateOn', 'DirtyOn', 'FormatOn'].forEach((property) => {
        const options = this.$options[property]
        if (options.input && !options.change) {
          options.input = false
          options.change = true
        }
      })
    }

    const parseInput = (items: ValidInput[], item: ValidInput, index: number) => {
        // Primary Input, force accept
      if (items.length === 0 || item.getAttribute('vp-primary')) return [item]
      if (index === this.$options.PrimaryInputIndex) return [item]
      return items
    }

    let _input: (ValidInput | null) = input
    if (_input === null) {
      debug('[VPField] Querying controllers')
      const controllers: FilteredControllerTypes = this.$options.InputTypes
        .reduce((items: FilteredControllerTypes, type: string) => {
          items[type] = ((Array.from(this.$element.getElementsByTagName(type)) || []) as ValidInput[]).reduce(parseInput, []) as ValidInput[]
          debug(`[VPField] Fetched ${type} controllers`, items[type])
          return items
        }, {} as FilteredControllerTypes)

      const primaryInputType = this.$options.PrimaryInputType
      if (primaryInputType !== null && controllers[primaryInputType].length > 0) {
        debug(`[VPField] Picking primary ${primaryInputType} controllers`)
        _input = controllers[primaryInputType].shift() as ValidInput
      } else {
        debug(`[VPField] Picking first found controller`)
          // Get the first element in the list
        _input = Object.keys(controllers)
          .reduce((elements: ValidInput[], type: string) => elements.concat(controllers[type]), [])
          .shift() || null
      }
    } else {
      debug('[VPField] Using provided input')
    }

    if (_input instanceof HTMLInputElement) {
      if (['radio', 'checkbox'].includes(_input.getAttribute('type') || '')) {
        flipflop()
      }
    } else if (_input instanceof HTMLSelectElement) {
      flipflop()
    }

    if (_input !== null) {
      this.$input = _input
    } else {
      throw new Error('[VP] Failed to find input dynamically.')
    }
  }

  isValid (formattedExternal = false): (boolean | Promise<boolean>) {
    this.$canValidate = false
    if (!formattedExternal) this.formatInputPre()
    // TODO: Diff messages
    this.clearMessages()

    // Main validation loop
    const attributes = this.parseInput()
    const { value, checked, type, name, rules } = attributes
    const attributeRules: (() => (boolean | string))[] = [
      () => {
        if (isSet(rules.min)) {
          const numValue = toNumber(value)
          const rule: number = rules.min as number

          if (numValue) {
            return (numValue < +rule)
              ? `${name} must be more than ${rules.min}.`
              : true
          }
        }

        return true
      },
      () => {
        if (isSet(rules.max)) {
          const rule: number = rules.max as number

          return (+value <= +rule)
            ? true
            : `${name} must be less than ${rules.max}.`
        }

        return true
      },
      () => {
        if (isSet(rules.minlength)) {
          const rule: number = rules.minlength as number
          return (value.length >= +rule)
            ? true
            : `${name} must be ${rules.minlength} characters or more.`
        }

        return true
      },
      () => {
        if (isSet(rules.maxlength)) {
          const rule: number = rules.maxlength as number
          return (value.length <= +rule)
            ? true
            : `${name} must be ${rules.maxlength} characters or less.`
        }

        return true
      },
      () => {
        if (isSet(rules.pattern)) {
          const rule: (RegExp | string) = rules.pattern as RegExp

          return (rules.pattern instanceof RegExp)
            ? rules.pattern.test(value)
            : (new RegExp(rule).test(value))
              ? true
              : `${name} is incorrectly formatted.`
        }

        return true
      },
      () => {
        switch (type) {
        case 'radio':
        case 'checkbox':
          // One should always be selected if required
          if (isSet(rules.required) && rules.required) {
            return checked ? true : `${name} is required.`
          }
          break
        default:
          if (isSet(rules.required) && rules.required) {
            return value.length > 0 ? true : `${name} is required.`
          }
        }

        return true
      }
    ]

    let errors: (boolean | string)[]
    let hasErrors = false
    if (this.$options.ValidateLazyFieldRules) {
      debug('ValidateLazyFieldRules')
      errors = attributeRules
        .reduce((errors: (boolean | string)[], rule: () => (boolean | string)) => {
          if (hasErrors) return errors
          const isValid = rule()
          if (isValid !== true) {
            debug('EndEvaluationEarly')
            hasErrors = true
          }

          errors.push(isValid)
          return errors
        }, [])
    } else {
      debug('ValidateFullFieldRules')
      errors = attributeRules
        .map((rule: () => (boolean | string)) => {
          return rule()
        })
    }

    if (this.$options.ShowFieldRuleErrors) {
      debug('ShowFieldRuleErrors')
      const messages: string[] = errors.filter((error) =>
        typeof error === 'string' && error.length > 0) as string[]
      this.addMessages(messages, this.$options.ErrorClassName)
    }

    // Abort early if we have errors
    if (hasErrors) {
      debug('AbortFieldEarly', this.$isValid)
      this.$isValid = false
      this.$canValidate = true

      return this.$isValid
    }

    // Custom validation loop
    const customRules = this.$options.CustomRules
    let customErrors: (boolean | string | Promise<boolean | string>)[]
    let hasCustomErrors = false
    if (this.$options.ValidateLazyCustomRules) {
      debug('ValidateLazyCustomRules')
      customErrors = customRules
        .reduce((errors: (boolean | string | Promise<(boolean | string)>)[], rule: CustomValidationRule) => {
          if (hasCustomErrors) return errors
          const isValid = rule(attributes, this.$element, this.$input as HTMLInputElement)
          if (!isAsync(isValid) && isValid !== true) {
            debug('EndEvaluationEarly')
            hasCustomErrors = true
          }

          errors.push(isValid)
          return errors
        }, [])
    } else {
      debug('ValidateFullCustomRules')
      customErrors = customRules.map((func: CustomValidationRule) => {
        return func(attributes, this.$element, this.$input as HTMLInputElement)
      })
    }

    // Show custom error messages up to this point
    if (this.$options.ShowCustomRuleErrors) {
      debug('ShowCustomRuleErrors')
      const messages: string[] = customErrors
        .filter((error) => typeof error === 'string' && error.length > 0) as string[]
      this.addMessages(messages, this.$options.ErrorClassName)
    }

    // Abort early if we have errors
    if (hasCustomErrors) {
      debug('AbortCustomEarly')
      this.$isValid = false
      this.$canValidate = true

      return this.$isValid
    }

    if (!formattedExternal) this.formatInputPost()
    if (hasAsync(customErrors)) {
      debug('Returning Async')

      // We can validate again if we're going async
      // Requires validation logic to be debounced
      // or we can waterfall a lot of requests
      if (!this.$options.ValidateAsyncResolved) {
        this.$canValidate = true
      }

      return new Promise((resolve) => {
        let promises: Promise<(boolean | string)>[]

        // Abort on first issue, omit existing values
        if (this.$options.ValidateLazyCustomRules) {
          promises = (customErrors.filter(isAsync) as Promise<(boolean | string)>[])
            .map((promise: Promise<(boolean | string)>) => {
              return new Promise((resolve, reject) => {
                promise.then((isValid) => {
                  if (isValid === true) {
                    return resolve(true)
                  }

                  return reject(isValid)
                }).catch((err: Error) => {
                  return reject(err)
                })
              })
            })
        // Resolve everything
        } else {
          promises = customErrors.map((error) => {
            if (isAsync(error)) return error
            else return Promise.resolve(error as (boolean | string))
          }) as Promise<(boolean | string)>[]
        }

        Promise.all(promises)
          .then((isValid) => {
            debug('Resolved Async', isValid)
            const customErrors = isValid.filter((e) => e !== true)

            if (this.$options.ShowCustomRuleErrors) {
              const messages = customErrors.filter((e) => typeof e === 'string' && e.length > 0) as string[]
              this.addMessages(messages, this.$options.ErrorClassName)
            }

            this.$isValid = isValid.every((err) => err === true)
            if (this.$options.ValidateAsyncResolved) {
              this.$canValidate = true
            }

            return resolve(this.$isValid)
          })
          .catch((err: (boolean | string | Error)) => {
            debug('[VPField] Failed CustomRule Validation', err)

            if (this.$options.ShowCustomRuleErrors) {
              if (err instanceof Error && err.message.length > 0) {
                this.addMessage(err.message, this.$options.ErrorClassName)
              } else if (typeof err === 'string' && err.length > 0) {
                this.addMessage(err, this.$options.ErrorClassName)
              }
            }

            this.$isValid = false
            if (this.$options.ValidateAsyncResolved) {
              this.$canValidate = true
            }

            return resolve(this.$isValid)
          })
      })
    } else {
      this.$isValid = [...errors, ...customErrors]
        .every((err) => err === true)
      this.$canValidate = true
      return this.$isValid
    }
  }

  formatInputPre(): void {
    InputFormatter(this, 'pre');
  }

  formatInputPost(): void {
    InputFormatter(this, 'post');
  }
}
