"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterNullObject(obj) {
    return Object.keys(obj).reduce((newObj, key) => {
        const value = obj[key];
        if (value !== null && typeof value !== 'undefined') {
            newObj[key] = value;
        }
        return newObj;
    }, {});
}
exports.filterNullObject = filterNullObject;
//# sourceMappingURL=filterNullObject.js.map