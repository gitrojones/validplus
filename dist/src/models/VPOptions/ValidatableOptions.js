"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Positions_1 = require("@/enums/Positions");
class ValidatableOptions {
    constructor(options, element = null) {
        // ControlFlow
        this.Watch = true;
        this.Lifecycle = {
            Valid: {
                CB: [],
                Message: ''
            },
            Invalid: {
                CB: [],
                Message: ''
            }
        };
        // ClassNames
        this.ErrorClassName = '-isError';
        this.ValidClassName = '-isValid';
        // Input Controller
        this.PrimaryInput = null;
        this.PrimaryInputIndex = 0;
        this.PrimaryInputType = null;
        this.InputTypes = ['select', 'input', 'textarea'];
        // Messaging
        this.MessageClassName = 'VPMessage';
        this.MessageContainerClassName = 'VPMessages';
        this.MessageAnchor = null;
        this.MessagePOS = Positions_1.VerticalPosition.bottom;
        this.ScrollTo = true;
        this.ScrollAnchor = null;
        if (!(options.MessageAnchor instanceof HTMLElement)) {
            options.MessageAnchor = element;
        }
        if (!(options.ScrollAnchor instanceof HTMLElement)) {
            options.ScrollAnchor = element;
        }
        Object.assign(this, options);
    }
}
exports.ValidatableOptions = ValidatableOptions;
//# sourceMappingURL=ValidatableOptions.js.map