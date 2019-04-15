"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("@/util/debug");
function toRegexp(value) {
    try {
        if (value instanceof RegExp)
            return value;
        if (typeof value === 'string' && value.length > 0) {
            return new RegExp(value);
        }
        return null;
    }
    catch (err) {
        debug_1.debug('(ToRegexp) Value could not be parsed');
        return null;
    }
}
exports.toRegexp = toRegexp;
//# sourceMappingURL=toRegexp.js.map