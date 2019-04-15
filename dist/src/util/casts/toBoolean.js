"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toBoolean(param, _default) {
    if (param === null)
        return _default;
    switch (typeof param) {
        case 'string':
            if (param.length === 0)
                return _default;
            if (param.toLowerCase() === 'true')
                return true;
            if (param.toLowerCase() === 'false')
                return false;
            break;
    }
    return !!param;
}
exports.toBoolean = toBoolean;
//# sourceMappingURL=toBoolean.js.map