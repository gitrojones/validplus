"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("@/util/debug");
const hasAsync_1 = require("@/util/hasAsync");
const isAsync_1 = require("@/util/isAsync");
const Validatable_1 = require("@/Validatable");
const Fieldset_1 = require("@/Fieldset");
const ValidatorOptions_1 = require("@/models/VPOptions/ValidatorOptions");
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
        super(new VPValidator.Options(options, element), element);
        // noinspection ES6ClassMemberInitializationOrder
        this.$options = this.$options;
        this.$fieldsetWatch = (_e, trigger) => {
            _e.stopPropagation();
            this.$emitFieldsets.push(trigger);
            this.isValid();
        };
        this.$emitFieldsets = [];
        this.$fieldsets = [];
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
                // Concat to the emitFieldsets watch to prevent
                // further loops of validation as they trigger
                this.$emitFieldsets.push(fieldset);
                valid = this.assertValidNoWatch(fieldset);
            }
            isValid = valid;
            resolved.push(valid);
            return resolved;
        }, []);
        if (hasAsync_1.hasAsync(resolvedIsValid)) {
            let promises;
            let asyncIsValid = resolvedIsValid.map((result) => {
                if (isAsync_1.isAsync(result))
                    return result;
                else
                    return Promise.resolve(result);
            });
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
                    this.$isValid = isValid.every((valid) => valid);
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
        // noinspection SuspiciousTypeOfGuard
        if (!(fieldset instanceof Fieldset_1.VPFieldset)) {
            throw new Error('[Validator] Fieldset must be an instanceof VPFieldset');
        }
        this.$fieldsets.push(fieldset);
        this.watchFieldset(fieldset);
    }
    // TODO: method to remove watchers
    watchFieldset(fieldset) {
        // noinspection SuspiciousTypeOfGuard
        if (!(fieldset instanceof Fieldset_1.VPFieldset)) {
            throw new Error('[VPFieldset] Field must be an instanceof VPField');
        } // tslint:disable-line
        // TODO: Optimize by tracking state and only revalidating
        // if internal state changes. Currently wasteful
        fieldset.addEventListener('onValidate', this.$fieldsetWatch);
    }
    removeFieldset(fieldset) {
        // noinspection SuspiciousTypeOfGuard
        if (!(fieldset instanceof Fieldset_1.VPFieldset)) { // tslint:disable-line
            throw new Error('[VPFieldset] Field must be an instanceof VPField');
        }
        const index = this.$fieldsets.indexOf(fieldset);
        if (index !== -1) {
            // TODO: Remove MutationObserver
            let fieldset = this.$fieldsets.splice(index, 1).pop();
            if (fieldset) {
                fieldset.clearMessages();
                fieldset.removeMessageNode();
                fieldset.removeEventListener('onValidate', this.$fieldsetWatch);
            }
            return fieldset;
        }
        return null;
    }
    // TODO: Append Predefined Fields w/ CB logic
    // TODO: Validate onValidate structure
    // TODO: Add MutationObserver on children
    createFieldset(fs, strategy, options, fields = [], onValidate = {
        Valid: {}, Invalid: {}
    }) {
        const fieldset = new Fieldset_1.VPFieldset(fs, strategy, options, onValidate);
        fields.forEach(field => {
            fieldset.addField(field);
        });
        this.addFieldset(fieldset);
        return fieldset;
    }
}
VPValidator.Options = ValidatorOptions_1.ValidatorOptions;
exports.VPValidator = VPValidator;
//# sourceMappingURL=Validator.js.map