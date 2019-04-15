"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@lib/polyfills");
const Validator_1 = require("@/Validator");
const Fieldset_1 = require("@/Fieldset");
const Field_1 = require("@/Field");
/**
  * Main export
  * @param {VPValidator} Validator - ValidPlus Validator
  * @param {VPFieldset} Fieldset - ValidPlus Fieldset
  * @param {VPField} Field - ValidPlus Field
  */
exports.ValidPlus = {
    Validator: Validator_1.VPValidator,
    Fieldset: Fieldset_1.VPFieldset,
    Field: Field_1.VPField
};
exports.default = exports.ValidPlus;
//# sourceMappingURL=validplus.js.map