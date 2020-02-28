"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatableOptions_1 = require("./ValidatableOptions");
class ValidatorOptions extends ValidatableOptions_1.ValidatableOptions {
    constructor(options, element = null) {
        super(options, element);
        // ControlFlow
        this.ValidateLazy = true;
        this.ValidateVisible = true;
        Object.assign(this, options);
    }
}
exports.ValidatorOptions = ValidatorOptions;
//# sourceMappingURL=ValidatorOptions.js.map