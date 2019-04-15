"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validatable_1 = require("./mixins/Validatable");
const Validator_vue_1 = require("@/vue/components/Validator.vue");
const Fieldset_1 = require("./mixins/Fieldset");
const Fieldset_vue_1 = require("./components/Fieldset.vue");
const Field_1 = require("./mixins/Field");
const Field_vue_1 = require("./components/Field.vue");
const VP = {
    mixins: {
        Validatable: Validatable_1.Validatable,
        Fieldset: Fieldset_1.Fieldset,
        Field: Field_1.Field
    },
    VPValidator: Validator_vue_1.VPValidator,
    VPFieldset: Fieldset_vue_1.VPFieldset,
    VPField: Field_vue_1.VPField
};
const VP_SSR = {
    mixins: {
        Validatable: {},
        Fieldset: {},
        Field: {}
    },
    VPValidator: Validator_vue_1.VPValidator,
    VPFieldset: Fieldset_vue_1.VPFieldset,
    VPField: Field_vue_1.VPField
};
exports.VPVue = (env) => {
    return (env === 'client')
        ? VP
        : VP_SSR;
};
exports.default = exports.VPVue;
//# sourceMappingURL=index.ssr.js.map