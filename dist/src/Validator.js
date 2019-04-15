"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("@/util/debug");
const mergeDeep_1 = require("@/util/mergeDeep");
const hasAsync_1 = require("@/util/hasAsync");
const isAsync_1 = require("@/util/isAsync");
const Validatable_1 = require("@/Validatable");
const Fieldset_1 = require("@/Fieldset");
/**
 * ValidPlus Validator instance, the container
 * responsible for firing off the validation cycle
 *
 * @name VPValidator
 */
class VPValidator extends Validatable_1.Validatable {
    /**
     * @param options - Configuration for the Validator
     * @param element - Validator Anchor Element (Typically a form)
     */
    constructor(options, element) {
        super(options, element);
        this.$options = this.$options;
        this.$emitFieldsets = [];
        this.$fieldsets = [];
        mergeDeep_1.mergeDeep(this.$options, {
            ValidateLazy: true,
            ValidateVisible: true,
            ValidationInputs: ['input', 'select', 'textarea']
        }, options);
        this.setLifecycle(this.$options.Lifecycle);
    }
    get $visibleFieldsets() {
        return this.$fieldsets.filter((fieldset) => {
            return this.isElementVisible(fieldset.$element);
        });
    }
    isValid() {
        this.clearMessages();
        let fieldsets = this.$options.ValidateVisible ? this.$visibleFieldsets : this.$fieldsets;
        // Bad practice to mutate outwards, but exception for now
        let isValid = true;
        let resolvedIsValid = fieldsets
            .reduce((resolved, fieldset, index) => {
            if (isValid === false && this.$options.ValidateLazy)
                return resolved;
            let valid;
            if (this.$emitFieldsets.indexOf(fieldset) !== -1 && typeof fieldset.$valid === 'boolean') {
                debug_1.debug('[VPValidator] Cached Valid', index);
                valid = fieldset.$valid;
            }
            else {
                let originalWatchValue = fieldset.$options.Watch;
                // Concat to the emitFieldsets watch to prevent
                // further loops of validation as they trigger
                this.$emitFieldsets.push(fieldset);
                fieldset.$options.Watch = false;
                valid = fieldset.isValid();
                if (isAsync_1.isAsync(valid)) {
                    valid = new Promise((resolve, reject) => {
                        return valid.then((isValid) => {
                            fieldset.$options.Watch = originalWatchValue;
                            resolve(isValid);
                        }).catch((err) => {
                            fieldset.$options.Watch = originalWatchValue;
                            reject(err);
                        });
                    });
                }
                else {
                    fieldset.$options.Watch = originalWatchValue;
                }
            }
            if (this.$options.ValidateLazy && valid === false) {
                isValid = valid;
            }
            resolved.push(valid);
            return resolved;
        }, []);
        if (hasAsync_1.hasAsync(resolvedIsValid)) {
            let promises;
            let asyncIsValid = resolvedIsValid
                .filter(isAsync_1.isAsync);
            if (this.$options.ValidateLazy) {
                // Return early if we're already invalid and lazy
                if (!isValid) {
                    this.$isValid = isValid;
                    return isValid;
                }
                promises = asyncIsValid
                    .map((promise) => {
                    return new Promise((resolve, reject) => {
                        promise.then((isValid) => {
                            // We reject since we want execution to stop at first error
                            if (isValid)
                                resolve(true);
                            else
                                reject(false);
                        }).catch((err) => {
                            debug_1.debug('[VPValidator] Caught Fieldset Exception');
                            reject(err);
                        });
                    });
                });
            }
            else {
                promises = asyncIsValid;
            }
            // Return the promise for async
            return new Promise((resolve) => {
                Promise.all(promises).then((isValid) => {
                    this.$isValid = isValid.every((valid) => valid === true);
                    this.$emitFieldsets = [];
                    return resolve(this.$isValid);
                }).catch((err) => {
                    debug_1.debug('[VPValidator] Async Validation failed: ' + err.message, err);
                    this.$isValid = false;
                    this.$emitFieldsets = [];
                    return resolve(this.$isValid);
                });
            });
        }
        else {
            // Only if we're not already false
            if (isValid) {
                isValid = resolvedIsValid.every((valid) => valid === true);
            }
            // Otherwise business as usual
            this.$isValid = isValid;
            this.$emitFieldsets = [];
            return isValid;
        }
    }
    // TODO: Child state checks
    // TODO: Add MutationObserver on children
    addFieldset(fieldset) {
        if (!(fieldset instanceof Fieldset_1.VPFieldset)) {
            throw new Error('[Validator] Fieldset must be an instanceof VPFieldset');
        }
        this.$fieldsets.push(fieldset);
        this.watchFieldset(fieldset);
    }
    // TODO: method to remove watchers
    watchFieldset(fieldset) {
        if (!(fieldset instanceof Fieldset_1.VPFieldset))
            return;
        // TODO: Optimize by tracking state and only revalidating
        // if internal state changes. Currently wasteful
        fieldset.addEventListener('onValidate', (_e, trigger) => {
            _e.stopPropagation();
            this.$emitFieldsets.push(trigger);
            this.isValid();
        });
    }
    removeFieldset(fieldset) {
        const index = this.$fieldsets.indexOf(fieldset);
        if (index !== -1) {
            this.$fieldsets.splice(index, 1);
            // TODO: Remove MutationObserver
        }
    }
    // TODO: Append Predefined Fields w/ CB logic
    // TODO: Validate onValidate structure
    // TODO: Add MutationObserver on children
    createFieldset(fs, strategy, options, fields, onValidate) {
        const fieldset = new Fieldset_1.VPFieldset(fs, strategy, options, onValidate);
        fields.forEach(field => {
            fieldset.addField(field);
        });
        this.$fieldsets.push(fieldset);
        this.watchFieldset(fieldset);
        return fieldset;
    }
}
exports.VPValidator = VPValidator;
//# sourceMappingURL=Validator.js.map