"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_mixin_decorator_1 = require("vue-mixin-decorator");
const vue_property_decorator_1 = require("vue-property-decorator");
const Validator_1 = require("@/Validator");
let Validatable = class Validatable extends vue_property_decorator_1.Vue {
    constructor() {
        super(...arguments);
        this.VPNewValidator = function () {
            let providing = {};
            if (this.VPProvideValidator) {
                providing['VPValidator'] = this.validator;
            }
            return providing;
        };
        this.VPProvideValidator = false;
        // Tracking for destroy
        this.VPFieldsets = [];
        this.VPFields = [];
        // Can be either a field or a fieldset
        this.VPField = null;
        this.VPFieldset = null;
        this.VP = null;
    }
    // Events
    beforeMount() {
        // Pull in library externally
        this.VP = require('validplus').ValidPlus;
    }
    mounted() {
        // Fulfill anchor requirements deferred
        // when elements are available
        if (this.VPNewValidator) {
            this.validator.$element = this.$el;
            this.validator.generateMessageNode(this.$el);
        }
    }
    beforeDestroy() {
        this.VPFieldsets.forEach((fs) => {
            console.log('[VPVue] Cleaning up fieldsets', fs);
            this.validator.removeFieldset(fs);
        });
    }
    VPCreateField(el, options, rules, onValidation) {
        const field = new this.VP.Field(el, options, rules, onValidation);
        this.VPFields.push(field);
        return field;
    }
    VPCreateFieldset(el, strategy, options, fields, onValidation) {
        const fieldset = this.validator.createFieldset(el, strategy, options, fields, onValidation);
        this.VPFieldsets.push(fieldset);
        return fieldset;
    }
    VPChangeAnchor(el) {
        this.validator.generateMessageNode(el);
    }
    VPisValid() {
        let isValid;
        if (this.VPField) {
            isValid = this.VPField.isValid();
        }
        else if (this.VPFieldset) {
            isValid = this.VPFieldset.isValid();
        }
        else {
            isValid = this.validator.isValid();
        }
        const dispatchValidationStatus = (isValid) => {
            this.$nextTick(() => {
                if (isValid) {
                    this.$emit('isValid');
                }
                else {
                    this.$emit('isInvalid');
                }
            });
        };
        if (typeof isValid === 'boolean') {
            dispatchValidationStatus(isValid);
            return isValid;
        }
        else if (typeof isValid.then === 'function') {
            return isValid.then((isValid) => {
                dispatchValidationStatus(isValid);
                return isValid;
            });
        }
        else {
            throw new Error('Unknown validation format returned');
        }
    }
};
__decorate([
    vue_property_decorator_1.Prop(Object),
    __metadata("design:type", Object)
], Validatable.prototype, "VPOptions", void 0);
__decorate([
    vue_property_decorator_1.Prop({
        default() {
            if (this.VPNewValidator) {
                this.VPProvideValidator = true;
            }
            return this.VPValidator;
        }
    }),
    __metadata("design:type", Validator_1.VPValidator)
], Validatable.prototype, "validator", void 0);
__decorate([
    vue_property_decorator_1.Inject({ default() {
            this.VPNewValidator = true;
            console.log('[VPVue] Validator not provided, injecting new validator.');
            const VP = require('validplus').ValidPlus;
            return new VP.Validator({
                DeferredMessageAnchor: true
            });
        } }),
    __metadata("design:type", Validator_1.VPValidator)
], Validatable.prototype, "VPValidator", void 0);
__decorate([
    vue_property_decorator_1.Provide('VPValidator'),
    __metadata("design:type", Object)
], Validatable.prototype, "VPNewValidator", void 0);
Validatable = __decorate([
    vue_mixin_decorator_1.Mixin
], Validatable);
exports.Validatable = Validatable;
exports.default = Validatable;
//# sourceMappingURL=Validatable.js.map