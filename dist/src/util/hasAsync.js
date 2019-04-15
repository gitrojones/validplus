"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAsync = (collection) => {
    return collection.some((item) => {
        return item && typeof item.then === 'function';
    });
};
//# sourceMappingURL=hasAsync.js.map