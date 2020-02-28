"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatableOptions_1 = require("./ValidatableOptions");
class FieldOptions extends ValidatableOptions_1.ValidatableOptions {
    constructor(options, element = null) {
        super(options, element);
        this.ForceRules = false;
        this.InputRules = {};
        this.CustomRules = [];
        this.InputFormatter = {};
        this.ShowFieldRuleErrors = false;
        this.ShowCustomRuleErrors = true;
        this.ValidateLazyCustomRules = true;
        this.ValidateLazyFieldRules = true;
        this.ValidateAsyncResolved = true;
        this.ScrollTo = false;
        this.DirtyOn = {};
        this.FormatOn = {};
        this.ValidateOn = {};
        Object.assign(this, options);
    }
}
exports.FieldOptions = FieldOptions;
//# sourceMappingURL=FieldOptions.js.map