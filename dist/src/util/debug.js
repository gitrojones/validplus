"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = (process.env.NODE_ENV === 'development')
    ? (...msg) => console.log('[Debug]', ...msg)
    : () => null;
//# sourceMappingURL=debug.js.map