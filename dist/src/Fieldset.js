"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("@/util/debug");
const hasAsync_1 = require("@/util/hasAsync");
const isAsync_1 = require("@/util/isAsync");
const mergeDeep_1 = require("@/util/mergeDeep");
const Field_1 = require("@/Field");
const Validatable_1 = require("@/Validatable");
class VPFieldset extends Validatable_1.Validatable {
    constructor(element, strategy, options, onValidate) {
        super(options, element);
        this.$options = this.$options;
        if (!(element instanceof HTMLElement)) {
            throw new Error('[VPFieldset] Expected element');
        }
        let validationStrategy = strategy;
        if (typeof strategy === 'string') {
            validationStrategy = this.$strategies[strategy];
        }
        if (typeof validationStrategy !== 'function') {
            throw new Error('[VPFieldset] Expected ValidationStrategy to be a function.');
        }
        mergeDeep_1.mergeDeep(this.$options, {
            ValidationStrategy: validationStrategy,
            ValidateVisible: true,
            FieldClass: 'VPField',
            Watch: false
        }, options);
        this.setLifecycle(onValidate);
        this.$strategy = this.$options.ValidationStrategy;
        this.$fields = [];
        this.$emitFields = [];
    }
    get $visibleFields() {
        return this.$fields.filter((field) => {
            return this.isElementVisible(field.$element);
        });
    }
    isValid(validateDirty = true) {
        this.clearMessages();
        let fields = (this.$options.ValidateVisible
            ? this.$visibleFields
            : this.$fields).filter((field, index) => {
            let validate = true;
            // Don't validate dirty fields
            if (!validateDirty && field.$dirty === false) {
                debug_1.debug('[VPFieldset] Skip dirty field', index);
                validate = false;
            }
            return validate;
        });
        const fieldsetStatus = fields
            .map((field, index) => {
            debug_1.debug('[VPFieldset] Validating field', index);
            // We already validated this, just take the value
            let valid;
            if (this.$emitFields.indexOf(field) !== -1 && typeof field.$valid === 'boolean') {
                debug_1.debug('[VPFieldset] Cached Valid', index);
                valid = field.$valid;
            }
            else {
                let originalWatchValue = field.$options.Watch;
                // Concat to the emitFields watch to prevent
                // further loops of validation as they trigger
                this.$emitFields.push(field);
                field.$options.Watch = false;
                valid = field.isValid();
                if (isAsync_1.isAsync(valid)) {
                    valid = new Promise((resolve, reject) => {
                        return valid.then((isValid) => {
                            field.$options.Watch = originalWatchValue;
                            resolve(isValid);
                        }).catch((err) => {
                            field.$options.Watch = originalWatchValue;
                            reject(err);
                        });
                    });
                }
                else {
                    field.$options.Watch = originalWatchValue;
                }
            }
            return valid;
        });
        if (hasAsync_1.hasAsync(fieldsetStatus)) {
            let deferredFieldsetStatus = fieldsetStatus.map((status) => {
                if (isAsync_1.isAsync(status))
                    return status;
                else
                    return Promise.resolve(status);
            });
            return new Promise((resolve) => {
                Promise.all(deferredFieldsetStatus)
                    .then((fieldsetStatus) => {
                    debug_1.debug('[VPFieldset] Resolved deferred', fieldsetStatus);
                    this.$isValid = this.$strategy(fieldsetStatus);
                    this.$emitFields = [];
                    return resolve(this.$isValid);
                })
                    .catch((err) => {
                    debug_1.debug('[VPFieldset] Failed to resolve deferred FieldSet Status', err);
                    this.$isValid = false;
                    this.$emitFields = [];
                    return resolve(this.$isValid);
                });
            });
        }
        else {
            this.$isValid = this.$strategy(fieldsetStatus);
            this.$emitFields = [];
            return this.$isValid;
        }
    }
    removeField(field) {
        if (!(field instanceof Field_1.VPField)) {
            throw new Error('[VPFieldset] Field must be an instanceof VPField');
        }
        const index = this.$fields.indexOf(field);
        if (index !== -1) {
            this.$fields = this.$fields.splice(index, 1);
        }
    }
    watchField(field) {
        if (!(field instanceof Field_1.VPField)) {
            throw new Error('Field must be an instance of VPField');
        }
        // TODO: Optimize by tracking state and only revalidating
        // if internal state changes. Currently wasteful
        field.addEventListener('onValidate', (_e, trigger) => {
            _e.stopPropagation();
            this.$emitFields.push(trigger);
            this.isValid(false);
        });
    }
    addField(field) {
        if (!(field instanceof Field_1.VPField)) {
            throw new Error('[VPFieldset] Field must be an instanceof VPField');
        }
        debug_1.debug('[VPFieldset] Adding field');
        this.$fields.push(field);
        this.watchField(field);
    }
    createField(el, options, customRules, onValidate) {
        if (!(el instanceof Element)) {
            throw new Error('[VPFieldset] Field Element must be a valid DOMElement.');
        }
        const field = new Field_1.VPField(el, options, customRules, onValidate);
        this.$fields.push(field);
        this.watchField(field);
        return field;
    }
    findFields(fieldOptions = {}) {
        let fields = Array.from(this.$element.getElementsByClassName(this.$options.FieldClass));
        // TODO: Attribute parsing to fill in the gaps
        this.$fields = fields.map((field, index) => {
            const options = Array.isArray(fieldOptions) ? fieldOptions[index] : fieldOptions;
            const _field = new Field_1.VPField(field, options, [], { Valid: {}, Invalid: {} });
            this.watchField(_field);
            return _field;
        });
    }
}
exports.VPFieldset = VPFieldset;
//# sourceMappingURL=Fieldset.js.map