"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toBoolean(param, _default) {
    if (param === null)
        return _default;
    switch (typeof param) {
        case 'string':
            if (param.toLowerCase() === 'false')
                return false;
            else
                return true;
    }
    return !!param;
}
exports.toBoolean = toBoolean;
//# sourceMappingURL=toBoolean.js.map