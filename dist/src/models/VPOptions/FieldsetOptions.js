"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatableOptions_1 = require("./ValidatableOptions");
class FieldsetOptions extends ValidatableOptions_1.ValidatableOptions {
    constructor(options, element = null) {
        super(options, element);
        // ControlFlow
        this.ValidateVisible = true;
        // ValidationOptions
        this.FieldClass = 'VPField';
        this.ValidationStrategy = null;
        Object.assign(this, {
            Watch: false
        }, options);
    }
}
exports.FieldsetOptions = FieldsetOptions;
//# sourceMappingURL=FieldsetOptions.js.map