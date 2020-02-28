"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("@/util/debug");
const hasAsync_1 = require("@/util/hasAsync");
const isAsync_1 = require("@/util/isAsync");
const isValidInput_1 = require("@/util/isValidInput");
const mergeDeep_1 = require("@/util/mergeDeep");
const toBoolean_1 = require("@/util/casts/toBoolean");
const toNumber_1 = require("@/util/casts/toNumber");
const toRegexp_1 = require("@/util/casts/toRegexp");
const filterNullObject_1 = require("@/util/filterNullObject");
const isSet_1 = require("@/util/isSet");
const Validatable_1 = require("@/Validatable");
const FieldOptions_1 = require("@/models/VPOptions/FieldOptions");
class VPField extends Validatable_1.Validatable {
    constructor(element, options, customRules, onValidate = undefined) {
        super(new VPField.Options(mergeDeep_1.mergeDeep({
            CustomRules: customRules || [],
            DirtyOn: {
                blur: toBoolean_1.toBoolean(element.getAttribute('vp-dirtyBlur'), false),
                input: toBoolean_1.toBoolean(element.getAttribute('vp-dirtyInput'), true),
                change: toBoolean_1.toBoolean(element.getAttribute('vp-dirtyChange'), false),
                mouseleave: toBoolean_1.toBoolean(element.getAttribute('vp-dirtyMouseLeave'), false)
            },
            FormatOn: {
                blur: toBoolean_1.toBoolean(element.getAttribute('vp-formatBlur'), false),
                input: toBoolean_1.toBoolean(element.getAttribute('vp-formatInput'), true),
                change: toBoolean_1.toBoolean(element.getAttribute('vp-formatChange'), false),
                mouseleave: toBoolean_1.toBoolean(element.getAttribute('vp-formatMouseleave'), false)
            },
            ValidateOn: {
                blur: toBoolean_1.toBoolean(element.getAttribute('vp-blur'), false),
                input: toBoolean_1.toBoolean(element.getAttribute('vp-input'), true),
                change: toBoolean_1.toBoolean(element.getAttribute('vp-change'), false),
                mouseleave: toBoolean_1.toBoolean(element.getAttribute('vp-mouseleave'), false)
            }
        }, options), element), element);
        this.$Input = null;
        this.$dirty = false;
        this.$canValidate = true;
        this.$formatterEvent = {
            pre: false,
            post: false
        };
        if (!(element instanceof HTMLElement)) {
            throw new Error('[VPField] Expected element');
        }
        if (onValidate) {
            this.setLifecycle(onValidate);
        }
        this.setInput(this.$options.PrimaryInput);
    }
    get $input() { return this.$Input; }
    set $input(input) {
        const handleEventDefault = (e) => {
            let eventType = e.type;
            const format = this.$options.FormatOn[eventType] || false;
            const validate = this.$options.ValidateOn[eventType] || false;
            const dirty = this.$options.DirtyOn[eventType] || false;
            if (dirty) {
                this.$dirty = true;
            }
            let formatterEvent = this.$formatterEvent.pre || this.$formatterEvent.post;
            // We alias this for our purposes
            if (format && !formatterEvent)
                this.formatInput(this.$options.InputFormatter.pre);
            if (this.$canValidate && this.$dirty && validate) {
                this.isValid(true);
            }
            if (format && !formatterEvent)
                this.formatInput(this.$options.InputFormatter.post);
            this.$formatterEvent.pre = false;
            this.$formatterEvent.post = false;
        };
        if (input && isValidInput_1.isValidInput(input)) {
            this.$Input = input;
            input.addEventListener('input', handleEventDefault);
            input.addEventListener('change', handleEventDefault);
            input.addEventListener('blur', handleEventDefault);
            input.addEventListener('mouseleave', handleEventDefault);
        }
        else {
            console.warn('[VPField] Input is missing');
        }
    }
    parseInput() {
        if (this.$input && !isValidInput_1.isValidInput(this.$input)) {
            throw new Error('[VPField] Input must be Input/Select/TextArea');
        }
        const inputRules = filterNullObject_1.filterNullObject({
            min: toNumber_1.toNumber(this.$input.getAttribute('min')),
            minlength: toNumber_1.toNumber(this.$input.getAttribute('minlength')),
            max: toNumber_1.toNumber(this.$input.getAttribute('max')),
            maxlength: toNumber_1.toNumber(this.$input.getAttribute('maxlength')),
            pattern: toRegexp_1.toRegexp(this.$input.getAttribute('pattern')),
            required: this.$input.required || toBoolean_1.toBoolean(this.$input.getAttribute('required'), null)
        });
        const rules = this.$options.ForceRules
            ? Object.assign({}, inputRules, this.$options.InputRules)
            : Object.assign({}, this.$options.InputRules, inputRules);
        return {
            value: this.$input.value,
            checked: (this.$input instanceof HTMLSelectElement)
                ? false
                : this.$input.checked,
            type: this.$input.getAttribute('type'),
            name: this.$input.getAttribute('data-name') ||
                this.$input.getAttribute('name') ||
                this.$input.tagName,
            rules
        };
    }
    setInput(input) {
        const flipflop = () => {
            ['ValidateOn', 'DirtyOn', 'FormatOn'].forEach((property) => {
                const options = this.$options[property];
                if (options.input === true && options.change === false) {
                    options.input = false;
                    options.change = true;
                }
            });
        };
        const parseInput = (items, item, index) => {
            // Primary Input, force accept
            if (items.length === 0 || item.getAttribute('vp-primary'))
                return [item];
            if (index === this.$options.PrimaryInputIndex)
                return [item];
            return items;
        };
        let _input = input;
        if (_input === null) {
            debug_1.debug('[VPField] Querying controllers');
            let controllers = this.$options.InputTypes
                .reduce((items, type) => {
                items[type] = (Array.from(this.$element.getElementsByTagName(type)) || []).reduce(parseInput, []);
                debug_1.debug(`[VPField] Fetched ${type} controllers`, items[type]);
                return items;
            }, {});
            let primaryInputType = this.$options.PrimaryInputType;
            if (primaryInputType !== null && controllers[primaryInputType].length > 0) {
                debug_1.debug(`[VPField] Picking primary ${primaryInputType} controllers`);
                _input = controllers[primaryInputType].shift();
            }
            else {
                debug_1.debug(`[VPField] Picking first found controller`);
                // Get the first element in the list
                _input = Object.keys(controllers)
                    .reduce((elements, type) => elements.concat(controllers[type]), [])
                    .shift() || null;
            }
        }
        else {
            debug_1.debug('[VPField] Using provided input');
        }
        if (_input instanceof HTMLInputElement) {
            if (['radio', 'checkbox'].includes(_input.getAttribute('type') || '')) {
                flipflop();
            }
        }
        else if (_input instanceof HTMLSelectElement) {
            flipflop();
        }
        if (_input !== null) {
            this.$input = _input;
        }
        else {
            throw new Error('[VP] Failed to find input dynamically.');
        }
    }
    isValid(formattedExternal = false) {
        this.$canValidate = false;
        if (!formattedExternal)
            this.formatInput(this.$options.InputFormatter.pre);
        // TODO: Diff messages
        this.clearMessages();
        // Main validation loop
        let attributes = this.parseInput();
        let { value, checked, type, name, rules } = attributes;
        let attributeRules = [
            () => {
                if (isSet_1.isSet(rules.min)) {
                    const numValue = toNumber_1.toNumber(value);
                    const rule = rules.min;
                    if (numValue) {
                        return (numValue < +rule)
                            ? `${name} must be more than ${rules.min}.`
                            : true;
                    }
                }
                return true;
            },
            () => {
                if (isSet_1.isSet(rules.max)) {
                    const rule = rules.max;
                    return (+value <= +rule)
                        ? true
                        : `${name} must be less than ${rules.max}.`;
                }
                return true;
            },
            () => {
                if (isSet_1.isSet(rules.minlength)) {
                    const rule = rules.minlength;
                    return (value.length >= +rule)
                        ? true
                        : `${name} must be ${rules.minlength} characters or more.`;
                }
                return true;
            },
            () => {
                if (isSet_1.isSet(rules.maxlength)) {
                    const rule = rules.maxlength;
                    return (value.length <= +rule)
                        ? true
                        : `${name} must be ${rules.maxlength} characters or less.`;
                }
                return true;
            },
            () => {
                if (isSet_1.isSet(rules.pattern)) {
                    const rule = rules.pattern;
                    return (rules.pattern instanceof RegExp)
                        ? rules.pattern.test(value)
                        : (new RegExp(rule).test(value))
                            ? true
                            : `${name} is incorrectly formatted.`;
                }
                return true;
            },
            () => {
                switch (type) {
                    case 'radio':
                    case 'checkbox':
                        // One should always be selected if required
                        if (isSet_1.isSet(rules.required) && rules.required) {
                            return checked ? true : `${name} is required.`;
                        }
                        break;
                    default:
                        if (isSet_1.isSet(rules.required) && rules.required) {
                            return value.length > 0 ? true : `${name} is required.`;
                        }
                }
                return true;
            }
        ];
        let errors;
        let hasErrors = false;
        if (this.$options.ValidateLazyFieldRules) {
            debug_1.debug('ValidateLazyFieldRules');
            errors = attributeRules
                .reduce((errors, rule) => {
                if (hasErrors)
                    return errors;
                let isValid = rule();
                if (isValid !== true) {
                    debug_1.debug('EndEvaluationEarly');
                    hasErrors = true;
                }
                errors.push(isValid);
                return errors;
            }, []);
        }
        else {
            debug_1.debug('ValidateFullFieldRules');
            errors = attributeRules
                .map((rule) => {
                return rule();
            });
        }
        if (this.$options.ShowFieldRuleErrors) {
            debug_1.debug('ShowFieldRuleErrors');
            let messages = errors.filter((error) => typeof error === 'string' && error.length > 0);
            this.addMessages(messages, this.$options.ErrorClassName);
        }
        // Abort early if we have errors
        if (hasErrors) {
            debug_1.debug('AbortFieldEarly', this.$isValid);
            this.$isValid = false;
            this.$canValidate = true;
            return this.$isValid;
        }
        // Custom validation loop
        let customRules = this.$options.CustomRules;
        let customErrors;
        let hasCustomErrors = false;
        if (this.$options.ValidateLazyCustomRules) {
            debug_1.debug('ValidateLazyCustomRules');
            customErrors = customRules
                .reduce((errors, rule) => {
                if (hasCustomErrors)
                    return errors;
                let isValid = rule(attributes, this.$element, this.$input);
                if (!isAsync_1.isAsync(isValid) && isValid !== true) {
                    debug_1.debug('EndEvaluationEarly');
                    hasCustomErrors = true;
                }
                errors.push(isValid);
                return errors;
            }, []);
        }
        else {
            debug_1.debug('ValidateFullCustomRules');
            customErrors = customRules.map((func) => {
                return func(attributes, this.$element, this.$input);
            });
        }
        // Show custom error messages up to this point
        if (this.$options.ShowCustomRuleErrors) {
            debug_1.debug('ShowCustomRuleErrors');
            let messages = customErrors
                .filter((error) => typeof error === 'string' && error.length > 0);
            this.addMessages(messages, this.$options.ErrorClassName);
        }
        // Abort early if we have errors
        if (hasCustomErrors) {
            debug_1.debug('AbortCustomEarly');
            this.$isValid = false;
            this.$canValidate = true;
            return this.$isValid;
        }
        if (!formattedExternal)
            this.formatInput(this.$options.InputFormatter.post);
        if (hasAsync_1.hasAsync(customErrors)) {
            debug_1.debug('Returning Async');
            // We can validate again if we're going async
            // Requires validation logic to be debounced
            // or we can waterfall a lot of requests
            if (!this.$options.ValidateAsyncResolved) {
                this.$canValidate = true;
            }
            return new Promise((resolve) => {
                let promises;
                // Abort on first issue, omit existing values
                if (this.$options.ValidateLazyCustomRules) {
                    promises = customErrors.filter(isAsync_1.isAsync)
                        .map((promise) => {
                        return new Promise((resolve, reject) => {
                            promise.then((isValid) => {
                                if (isValid === true) {
                                    return resolve(true);
                                }
                                return reject(isValid);
                            }).catch((err) => {
                                return reject(err);
                            });
                        });
                    });
                    // Resolve everything
                }
                else {
                    promises = customErrors.map((error) => {
                        if (isAsync_1.isAsync(error))
                            return error;
                        else
                            return Promise.resolve(error);
                    });
                }
                Promise.all(promises)
                    .then((isValid) => {
                    debug_1.debug('Resolved Async', isValid);
                    const customErrors = isValid.filter((e) => e !== true);
                    if (this.$options.ShowCustomRuleErrors) {
                        let messages = customErrors.filter((e) => typeof e === 'string' && e.length > 0);
                        this.addMessages(messages, this.$options.ErrorClassName);
                    }
                    this.$isValid = isValid.every((err) => err === true);
                    if (this.$options.ValidateAsyncResolved) {
                        this.$canValidate = true;
                    }
                    return resolve(this.$isValid);
                })
                    .catch((err) => {
                    debug_1.debug('[VPField] Failed CustomRule Validation', err);
                    if (this.$options.ShowCustomRuleErrors) {
                        if (err instanceof Error && err.message.length > 0) {
                            this.addMessage(err.message, this.$options.ErrorClassName);
                        }
                        else if (typeof err === 'string' && err.length > 0) {
                            this.addMessage(err, this.$options.ErrorClassName);
                        }
                    }
                    this.$isValid = false;
                    if (this.$options.ValidateAsyncResolved) {
                        this.$canValidate = true;
                    }
                    return resolve(this.$isValid);
                });
            });
        }
        else {
            this.$isValid = [...errors, ...customErrors]
                .every((err) => err === true);
            this.$canValidate = true;
            return this.$isValid;
        }
    }
    formatInput(formatter) {
        if (!this.$input) {
            throw new Error('[VPField] Cannot format Input as it is unset.');
        }
        if (typeof formatter === 'function') { // tslint:disable-line
            formatter(this.$input, (eventName) => {
                if (this.$input instanceof HTMLElement) {
                    this.$formatterEvent.pre = true;
                    this.$input.dispatchEvent(this.createEvent(eventName));
                }
            });
        }
    }
}
VPField.Options = FieldOptions_1.FieldOptions;
exports.VPField = VPField;
exports.default = VPField;
//# sourceMappingURL=Field.js.map