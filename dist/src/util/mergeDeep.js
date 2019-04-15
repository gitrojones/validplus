"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isObject_1 = require("@/util/isObject");
/**
 * Deep merge two objects, left most takes priority
 *
 * @param target - The object to merge onto
 * @param sources - The object(s) to merge into the target
 */
exports.mergeDeep = function (target, ...sources) {
    if (!Array.isArray(sources) || sources.length < 1)
        return target;
    const source = sources.shift();
    if (isObject_1.isPlainObject(target) && isObject_1.isPlainObject(source)) {
        for (const key in source) {
            if (isObject_1.isPlainObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                exports.mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return exports.mergeDeep(target, ...sources);
};
//# sourceMappingURL=mergeDeep.js.map