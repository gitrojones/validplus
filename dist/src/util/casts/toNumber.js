"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toNumber(value) {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string') {
        return +value;
    }
    return null;
}
exports.toNumber = toNumber;
//# sourceMappingURL=toNumber.js.map