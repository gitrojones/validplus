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
let Fieldset = class Fieldset extends vue_mixin_decorator_1.Mixins(Validatable_1.Validatable) {
    constructor() {
        super(...arguments);
        this.VPFieldset = null;
        this.VPStrategy$ = this.VPStrategy || 'all';
        this.VPFields$ = this.VPFields || [];
        this.VPOptions$ = this.VPOptions || {};
        this.VPValid$ = this.VPValid || {};
    }
    handleFieldsetIsValid(isValid) {
        if (isValid) {
            this.$emit('isValid', this);
        }
        else {
            this.$emit('isInvalid', this);
        }
    }
    mounted() {
        this.VPFieldset = this.VPCreateFieldset(this.$el, this.VPStrategy$, this.VPOptions$, this.VPFields$, this.VPValid$);
        this.VPGatherFields();
    }
    VPChangeAnchor(el) {
        this.VPFieldset.generateMessageNode(el);
    }
    VPGatherFields() {
        Object.keys(this.$slots).forEach((slot) => {
            const data = this.$slots[slot];
            data.forEach((field) => {
                if (field._isVue) {
                    field.$once('VPAddField', (VPField) => {
                        this.VPFieldset.addField(VPField);
                    });
                }
            });
        });
        this.$children.forEach((field) => {
            if (field._isVue) {
                field.$once('VPAddField', (VPField) => {
                    this.VPFieldset.addField(VPField);
                });
            }
        });
    }
};
__decorate([
    vue_property_decorator_1.Prop(Object),
    __metadata("design:type", Object)
], Fieldset.prototype, "VPOptions", void 0);
__decorate([
    vue_property_decorator_1.Prop(Object),
    __metadata("design:type", Object)
], Fieldset.prototype, "VPValid", void 0);
__decorate([
    vue_property_decorator_1.Prop([Function, String]),
    __metadata("design:type", Object)
], Fieldset.prototype, "VPStrategy", void 0);
__decorate([
    vue_property_decorator_1.Prop(Array),
    __metadata("design:type", Array)
], Fieldset.prototype, "VPFields", void 0);
__decorate([
    vue_property_decorator_1.Emit('isValid'),
    vue_property_decorator_1.Emit('isInvalid'),
    vue_property_decorator_1.Watch('VPFieldset._isValid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], Fieldset.prototype, "handleFieldsetIsValid", null);
Fieldset = __decorate([
    vue_mixin_decorator_1.Mixin
], Fieldset);
exports.Fieldset = Fieldset;
exports.default = Fieldset;
//# sourceMappingURL=Fieldset.js.map