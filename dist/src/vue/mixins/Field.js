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
const Validatable_1 = require("./Validatable");
let Field = class Field extends vue_mixin_decorator_1.Mixins(Validatable_1.Validatable) {
    constructor() {
        super(...arguments);
        this.VPField = null;
        this.VPOptions$ = this.VPOptions || {};
        this.VPRules$ = this.VPRules || [];
        this.VPValid$ = this.VPValid || {};
    }
    onValidChange(isValid) {
        if (isValid) {
            this.$emit('isvalid', this);
        }
        else {
            this.$emit('isInvalid', this);
        }
    }
    mounted() {
        this.VPField = this.VPCreateField(this.$el, this.VPOptions$, this.VPRules$, this.VPValid$);
        this.$nextTick(() => {
            this.$emit('VPAddField', this.VPField);
        });
    }
    VPChangeAnchor(el) {
        this.VPField.generateMessageNode(el);
    }
    VPAddRule(rule) {
        if (typeof rule === 'function') {
            this.VPField.$options.CustomRules.push(rule);
        }
        else {
            console.error('[VPField] Rule must be a function that resolves to a promise');
        }
    }
    // TODO: No clue which type to import for internal properties
    VPGatherFields() {
        const self = this;
        Object.keys(this.$slots).forEach((slot) => {
            const data = this.$slots[slot];
            data.forEach((field) => {
                if (field._isVue) {
                    field.$once('AddField', function (field) {
                        self.VPFields.push(field);
                    });
                }
            });
        });
        this.$children.forEach((field) => {
            if (field._isVue) {
                field.$once('AddField', function (field) {
                    self.VPFields.push(field);
                });
            }
        });
    }
};
__decorate([
    vue_property_decorator_1.Prop(Object),
    __metadata("design:type", Object)
], Field.prototype, "VPOptions", void 0);
__decorate([
    vue_property_decorator_1.Prop(Array),
    __metadata("design:type", Array)
], Field.prototype, "VPRules", void 0);
__decorate([
    vue_property_decorator_1.Prop(Object),
    __metadata("design:type", Object)
], Field.prototype, "VPValid", void 0);
__decorate([
    vue_property_decorator_1.Emit('isValid'),
    vue_property_decorator_1.Watch('VPField.$valid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], Field.prototype, "onValidChange", null);
__decorate([
    vue_property_decorator_1.Emit('VPAddField'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Field.prototype, "mounted", null);
Field = __decorate([
    vue_mixin_decorator_1.Mixin
], Field);
exports.Field = Field;
exports.default = Field;
//# sourceMappingURL=Field.js.map