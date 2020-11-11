import merge from 'lodash/merge'
import {debug} from 'src/util/debug'
import {hasAsync} from 'src/util/hasAsync'
import {isAsync} from 'src/util/isAsync'
import {isValidInput} from 'src/util/isValidInput'
import {toBoolean} from 'src/util/casts/toBoolean'
import {toNumber} from 'src/util/casts/toNumber'
import {toRegexp} from 'src/util/casts/toRegexp'
import {filterNullObject} from 'src/util/filterNullObject'
import {isSet} from 'src/util/isSet'

import {VPFieldOptions} from 'src/interfaces/VPOptions'
import {CustomValidationRule} from 'src/interfaces/validation/CustomValidationRule'
import {ValidationAttributes} from 'src/interfaces/validation/ValidationAttributes'
import {HTMLValidationRules} from 'src/interfaces/validation/HTMLValidationRules'

import {ValidInput} from 'src/types/ValidInput'
import {Validatable} from 'src/Validatable'
import {FieldOptions} from 'src/models/VPOptions/FieldOptions'
import {getAttributeIfSet} from 'src/util/getAttributeIfSet'
import IEVersion from 'src/util/IEVersion'

const InputFormatter = function InputFormatter(self: VPField, type: ('pre'|'post')) {
  const formatter = self.$options.InputFormatter[type];
  if (self.$input === null) {
    throw new Error('[VPField] Cannot format Input as it is unset.')
  }

  if (typeof formatter === 'function') {
    self.$input.value = formatter(self.$input.value, self.$input, (event_name) =>
      (self.$input as ValidInput).dispatchEvent(self.createEvent(event_name)));

    let event_type = 'input';
    if (self.$input instanceof HTMLInputElement) {
      const input_type = ''+getAttributeIfSet<string>(self.$input, 'type', '');
      // Select/Radio/Checkbox/Date/File inputs validate on change. This is a helper to make this
      // distinction a bit less cumbersome for users
      if (['radio', 'checkbox', 'date', 'file'].includes(input_type)) event_type = 'change';
    } else if (self.$input instanceof HTMLSelectElement) event_type = 'change';

    self.$input.dispatchEvent(self.createEvent(event_type));
  }
}

/**
 * VPField Instance
 * @description
 * Field instances are responsible for managing the internal state of individual fields. Field instances
 * are capable of formatting input and validating input based on various events. See examples for more information.
 * @example
 * // Simple DOM Binding, Field will be required
 * <div class="VPField">
 *   <input id="full-name" aria-label="Full Name" name="name" type="text" required="required" />
 * </div>
 * @example
 * // Simple DOM Binding, pattern matching an email
 * <div class="VPField">
 *   <label for="email">Email Address</label>
 *   <input id="email" name="email" type="text" pattern="/.+@.+\..+/" />
 * </div>
 * @example
 * // Programmic bindings, phone number w/ input formatter
 * const field = new VP.Field(document.getElementById('phone'), {
 *    InputFormatter: {
 *      pre: (input, dispatchEven) => {
 *        input.value = input.value.replace(/[^0-9]/g, ''));
 *        input.value = input.value.substr(0, 5);
 *        dispatchEvent('input');
 *      },
 *      post: (input, dispatchEvent) => {
 *        let value = input.value
 *        const areaCode = value.substr(0, 3)
 *        const local = value.substr(3, 3)
 *        const number = value.substr(6, 4)
 *
 *        let mask = '('
 *        if (areaCode.length > 0) mask += areaCode
 *        if (local.length > 0) mask += ') ' + local
 *        if (number.length > 0) mask += '-' + number
 *        input.value = mask
 *        dispatchEvent('input')
 *      }
 *    }
 * });
 */
export class VPField extends Validatable<FieldOptions> {
  static Options = FieldOptions
  $input: (ValidInput | null)
  $dirty: boolean
  $canValidate: boolean
  $observer: MutationObserver | undefined
  $formatterEvent: { pre: boolean, post: boolean }

  constructor (element: HTMLElement, options: VPFieldOptions = {}) {
    if (!(element instanceof HTMLElement)) throw new Error('[VPField] Expected element')
    super(element, new VPField.Options(options, element))

    this.$input = null
    this.$dirty = false
    this.$canValidate = true
    this.$formatterEvent = { pre: false, post: false }
    this.$setInput()

    if (IEVersion === false || IEVersion >= 11) {
      this.$observer = new MutationObserver(this.$observe.bind(this));
      this.$observer.observe(element, {
        childList: true
      });
    }
  }

  get $isValid (): boolean | null { return super.$isValid; }
  set $isValid (isValid: boolean | null) {
    super.$isValid = isValid;
    this.$canValidate = true;

    if (this.$options.Notify) {
      debug('[VPField] Notify parent')
      this.dispatchEvent(this.createEvent('VPValidate'), this)
    }
  }

  /**
   * Field Observer
   * @description
   * If running a modern browser, VP will automatically
   * handle bubbling the removal of tracked fields if inputs have been removed from the DOM.
   * If supporting sub IE11, you must do this yourself using the remove helpers defined on this instance.
   * @see {@link VPField.remove}
   * @private
   */
  $observe (mutations: MutationRecord[]) {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const nodes = Array.from(mutation.removedNodes);
        const input = this.$input;
        while (nodes.length > 0) {
          const node = nodes.pop();
          if (!node) break;
          if (node === input) {
            this.remove();
            break;
          }
          if (node.hasChildNodes()) nodes.push(...Array.from(node.childNodes));
        }
      }
    }
  }

  /**
   * Standard Input Handler
   * @description
   * Binds to standard input lifecycle hooks and handles how/when validation occurs based
   * up on the event type fired and the internal state of the Field instance.
   * @private
   */
  $inputHandler(e: Event): void {
    const eventType: string = e.type

    const format: boolean = this.$options.FormatOn[eventType] || false
    const validate: boolean = this.$options.ValidateOn[eventType] || false
    const dirty: boolean = this.$options.DirtyOn[eventType] || false

    if (dirty) this.$dirty = true;
    if (this.$canValidate && this.$dirty && validate) {
      this.isValid()
    }
    else if (format) {
      this.formatInputPre();
      this.formatInputPost()
    }
  }

  /**
   * Set the input to be tracked
   * @throws If input is unable to be parsed
   * @description
   * Sets an input for the Field based upon the options passed. If no input is specified
   * explicitly, input will be automatically parsed from child elements. If no input can be
   * found this method will throw and emit itself for removal from parent tracking.
   * @private
   */
  $setInput (): void {
    interface FilteredControllerTypes { [type: string]: ValidInput[] }
    const flipflopAttrs = () => {
      [this.$options.ValidateOn, this.$options.DirtyOn, this.$options.FormatOn]
        .forEach((options) => {
          if (options.input && !options.change) {
            options.input = false
            options.change = true
          }
        });
    }

    let inputs;
    debug('[VPField] Querying controllers')
    const controllers: FilteredControllerTypes = this.$options.InputTypes
      .reduce((items: FilteredControllerTypes, type: string) => {
        items[type] = Array.from(this.$element.getElementsByTagName(type)) as ValidInput[];
        debug(`[VPField] Fetched ${type} controllers`, items[type])
        return items
      }, {} as FilteredControllerTypes)

    const primaryInputType = this.$options.PrimaryInputType
    if (primaryInputType !== null && controllers[primaryInputType].length > 0) {
      debug(`[VPField] Picking primary ${primaryInputType} controller`)
      inputs = controllers[primaryInputType];
    } else {
      debug('[VPField] Picking from all controllers')
      inputs = Object.keys(controllers)
        .reduce((elements: ValidInput[], type: string) => elements.concat(controllers[type]), []);
    }

    let input: (ValidInput | null);
    if (!this.$options.PrimaryInput) {
      input = inputs
        .reduce((_input: (ValidInput|null), input, index) => {
          if (getAttributeIfSet(input, 'vp-primary', false)) return input;
          if (index === this.$options.PrimaryInputIndex) return input;
          if (index === 0) return input
          return _input;
        }, null)
    }
    else {
      debug('[VPField] Using provided input')
      input = this.$options.PrimaryInput;
    }

    if (input instanceof HTMLInputElement) {
      const input_type = ''+getAttributeIfSet<string>(input, 'type', '');
      // Select/Radio/Checkbox/Date/File inputs validate on change. This is a helper to make this
      // distinction a bit less cumbersome for users
      if (['radio', 'checkbox', 'date', 'file'].includes(input_type)) flipflopAttrs();
    } else if (input instanceof HTMLSelectElement) flipflopAttrs();


    if (input && isValidInput(input)) {
      this.$input = input
      this.$lifecycleElements.push(input);

      const handler = this.$inputHandler.bind(this);
      input.addEventListener('input', handler);
      input.addEventListener('change', handler);
      input.addEventListener('blur', handler);
      input.addEventListener('mouseleave', handler);
    } else {
      this.remove();
      throw new Error('[VPField] Failed to find input.')
    }
  }

  /**
   * Remove Field
   * @description
   * Notify parent that this field should be removed from tracking. This is handled automatically
   * if using a modern browser where MutationObservers are support (IE11+). For most use-cases,
   * this can be safely ignored; This method is provided for very specific edge cases where
   * the internally tracked input may be removed after initialization.
   */
  remove (): void {
    this.dispatchEvent(this.createEvent('VPRemove'), this);
  }

  /**
   * Parse Input
   * @description
   * Parses the internally tracked input and returns a standard interface used internally for
   * the validation cycle.
   */
  parseInput (): ValidationAttributes {
    if (!this.$input || !isValidInput(this.$input)) {
      throw new Error('[VPField] Input must be Input/Select/TextArea')
    }

    const required = getAttributeIfSet<string|boolean>(this.$input, 'required', false);
    const inputRules: HTMLValidationRules = filterNullObject({
      min: toNumber(getAttributeIfSet(this.$input, 'min', null)),
      minlength: toNumber(getAttributeIfSet(this.$input, 'minlength', null)),
      max: toNumber(getAttributeIfSet(this.$input, 'max', null)),
      maxlength: toNumber(getAttributeIfSet(this.$input, 'maxlength', null)),
      pattern: toRegexp(getAttributeIfSet(this.$input, 'pattern', null)),
      required: required === 'required' ? true : toBoolean<null>(required, null)
    })

    const rules = this.$options.ForceRules
      ? merge({}, inputRules, this.$options.InputRules)
      : merge({}, this.$options.InputRules, inputRules)

    return {
      value: this.$input.value,
      checked: (this.$input instanceof HTMLSelectElement)
        ? false
        : (this.$input as HTMLInputElement).checked,
      type: this.$input.getAttribute('type'),
      name: ''+getAttributeIfSet<string|boolean>(this.$input, 'data-name',
        getAttributeIfSet<string>(this.$input, 'name', this.$input.tagName)),
      rules
    }
  }

  /**
   * Validation Cycle
   * @description
   * Standard Validation cycle for the Field instance.
   *
   * + Validation can occur as either synchronous validation or asynchronous validation.
   * + Validation emulates standard DOM validation
   * + Validation consumes custom validation rules
   *    - If Validation rules are all synchronous, isValid will be synchronous
   *    - If Validation rules are async, isValid will be asynchronous
   *    - If ValidateAsync option is enabled, isValid will *ALWAYS* be asynchronous
   *
   * This method applies the necessary formatting for input values, if defined.
   * @returns (boolean|Promise.<boolean>)
   */
  isValid (): (boolean | Promise<boolean>) {
    this.$canValidate = false
    this.formatInputPre();
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
      return this.$isValid
    }

    this.formatInputPost();
    if (hasAsync(customErrors)) {
      debug('Returning Async')

      // NOTE: If skipping asyncResolved, validation will waterfall the promise.
      // It is the developers responsibility to manage the behavior on their custom rules
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
            return resolve(this.$isValid)
          })
      })
    } else {
      this.$isValid = [...errors, ...customErrors]
        .every((err) => err === true)
      return this.$isValid
    }
  }

  formatInputPre(): void {
    if (this.$formatterEvent.pre) {
      debug('[VPField] Skipping pre formatter',
        this.$formatterEvent.pre, this.$formatterEvent.post)
      return
    }
    console.log('FORMAT PRE');

    this.$formatterEvent.pre = true
    InputFormatter(this, 'pre')
    this.$formatterEvent.post = false
  }

  formatInputPost(): void {
    if (this.$formatterEvent.post || !this.$formatterEvent.pre) {
      debug('[VPField] Skipping post formatter',
        this.$formatterEvent.pre, this.$formatterEvent.post)
      return
    }
    console.log('FORMAT POST');

    this.$formatterEvent.post = true
    InputFormatter(this, 'post')
    this.$formatterEvent.pre = false
  }
}
