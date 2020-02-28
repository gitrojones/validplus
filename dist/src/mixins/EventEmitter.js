"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createEvent_1 = require("@/util/createEvent");
function EventEmitter(Base) {
    return class extends Base {
        constructor() {
            super(...arguments);
            this.$listeners = {};
        }
        addEventListener(type, callback) {
            if (!(type in this.$listeners)) {
                this.$listeners[type] = [];
            }
            this.$listeners[type].push(callback);
        }
        removeEventListener(type, callback) {
            if (!(type in this.$listeners))
                return;
            let stack = this.$listeners[type];
            let stackLength = stack.length;
            for (let i = 0; i < stackLength; i++) {
                if (stack[i] === callback) {
                    stack.splice(i, 1);
                    return;
                }
            }
        }
        /**
         * Include support for passing data along event
         * @param event - the Event object to dispatch
         * @param data - Data to be passed to the callback
         */
        dispatchEvent(event, data) {
            if (!(event.type in this.$listeners))
                return true;
            let stack = this.$listeners[event.type].slice();
            let stackLength = stack.length;
            for (let i = 0; i < stackLength; i++) {
                stack[i].call(this, event, data);
            }
            return !event.defaultPrevented;
        }
        createEvent(eventName) {
            return createEvent_1.createEvent(eventName);
        }
    };
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map