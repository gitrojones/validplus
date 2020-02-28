"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
"use strict";
const debug_1 = require("@/util/debug");
const isSet_1 = require("@/util/isSet");
const toBoolean_1 = require("@/util/casts/toBoolean");
const DOMMessaging_1 = require("@/lib/DOMMessaging");
const EventEmitter_1 = require("@/mixins/EventEmitter");
const ValidatableOptions_1 = require("@/models/VPOptions/ValidatableOptions");
const isAsync_1 = require("@/util/isAsync");
exports.Validatable = EventEmitter_1.EventEmitter((_a = class extends DOMMessaging_1.DOMMessaging {
        constructor(options, element) {
            super();
            this.$element = element;
            this.$valid = null;
            // Set some logical defaults
            if (!(options instanceof ValidatableOptions_1.ValidatableOptions)) {
                this.$options = new exports.Validatable.Options(options, element);
            }
            else {
                this.$options = options;
            }
            if (element && element instanceof HTMLElement) {
                this.$options.Watch = toBoolean_1.toBoolean(element.getAttribute('vp-watch'), true);
            }
            this.setLifecycle(this.$options.Lifecycle);
            this.$strategies = {
                all: (fieldstatus) => fieldstatus.every((f) => f),
                some: (fieldstatus) => fieldstatus.some((f) => f),
                none: (fieldstatus) => fieldstatus.every((f) => !f),
                one: (fieldstatus) => fieldstatus.filter((f) => f).length === 1
            };
            // DOMMessaging
            this.$MessageClassName = this.$options.MessageClassName;
            this.$MessageContainerClassName = this.$options.MessageContainerClassName;
            this.$MessageNodePOS = this.$options.MessagePOS;
            // Allow for manually calling the messageNodeBuilder if it cannot be accomplished right away
            // Used in Vue Bindings
            if (this.$options.MessageAnchor instanceof HTMLElement) {
                this.generateMessageNode(this.$options.MessageAnchor);
            }
            // END DOMMessaging
        }
        get $isValid() {
            return this.$valid;
        }
        set $isValid(isValid) {
            this.$valid = isValid;
            if (isValid) {
                this.$element.classList.add(this.$options.ValidClassName);
                this.$element.classList.remove(this.$options.ErrorClassName);
                if (this.$Input instanceof HTMLElement) {
                    this.$Input.classList.add(this.$options.ValidClassName);
                    this.$Input.classList.remove(this.$options.ErrorClassName);
                }
                if (Array.isArray(this.$options.Lifecycle.Valid.CB)) {
                    this.$options.Lifecycle.Valid.CB
                        .forEach((CB) => CB.call(null, this));
                }
                let ValidMessage = this.$options.Lifecycle.Valid.Message;
                if (typeof ValidMessage === 'string' && ValidMessage.length > 0) {
                    this.addMessage(this.$options.Lifecycle.Valid.Message, this.$options.ValidClassName);
                }
            }
            else {
                this.$element.classList.remove(this.$options.ValidClassName);
                this.$element.classList.add(this.$options.ErrorClassName);
                if (this.$Input instanceof HTMLElement) {
                    this.$Input.classList.remove(this.$options.ValidClassName);
                    this.$Input.classList.add(this.$options.ErrorClassName);
                }
                if (Array.isArray(this.$options.Lifecycle.Invalid.CB)) {
                    this.$options.Lifecycle.Invalid.CB
                        .forEach((CB) => CB.call(null, this));
                }
                let InvalidMessage = this.$options.Lifecycle.Invalid.Message;
                if (typeof InvalidMessage === 'string' && InvalidMessage.length > 0) {
                    this.addMessage(this.$options.Lifecycle.Invalid.Message, this.$options.ErrorClassName);
                }
                if (this.$options.ScrollTo) {
                    // While always true, we check due to limitations with JSDOM
                    // tslint:disable-next-line: strict-type-predicates
                    if (this.$options.ScrollAnchor && typeof this.$options.ScrollAnchor.scrollIntoView === 'function') {
                        this.$options.ScrollAnchor.scrollIntoView({ behavior: 'smooth' });
                    }
                    else {
                        debug_1.debug('[VP] Element Scrolling failed.');
                    }
                }
            }
            if (this.$options.Watch) {
                debug_1.debug('[Validatable] Emit watch');
                this.dispatchEvent(this.createEvent('onValidate'), this);
            }
        }
        assertValidNoWatch(obj) {
            let originalWatchValue = obj.$options.Watch;
            obj.$options.Watch = false;
            let valid = obj.isValid();
            if (isAsync_1.isAsync(valid)) {
                valid = new Promise((resolve, reject) => {
                    return valid.then((isValid) => {
                        obj.$options.Watch = originalWatchValue;
                        resolve(isValid);
                    }).catch((err) => {
                        obj.$options.Watch = originalWatchValue;
                        reject(err);
                    });
                });
            }
            else {
                obj.$options.Watch = originalWatchValue;
            }
            return valid;
        }
        setLifecycle(lifecycle) {
            const isValidationLifecycle = function (lifecycle) {
                return isSet_1.isSet(lifecycle) &&
                    ('Valid' in lifecycle || 'Invalid' in lifecycle);
            };
            let valid = this.$options.Lifecycle.Valid || {};
            let invalid = this.$options.Lifecycle.Invalid || {};
            this.$options.Lifecycle = {
                Valid: {
                    Message: valid.Message,
                    CB: valid.CB
                },
                Invalid: {
                    Message: invalid.Message,
                    CB: invalid.CB
                }
            };
            if (isValidationLifecycle(lifecycle)) {
                if (lifecycle.Valid) {
                    if (typeof lifecycle.Valid.Message === 'string') {
                        this.$options.Lifecycle.Valid.Message = lifecycle.Valid.Message;
                    }
                    if (Array.isArray(lifecycle.Valid.CB)) {
                        this.$options.Lifecycle.Valid.CB = lifecycle.Valid.CB;
                    }
                    else if (typeof lifecycle.Valid.CB === 'function') {
                        if (!Array.isArray(this.$options.Lifecycle.Valid.CB)) {
                            this.$options.Lifecycle.Valid.CB = [];
                        }
                        this.$options.Lifecycle.Valid.CB.push(lifecycle.Valid.CB);
                    }
                }
                if (lifecycle.Invalid) {
                    if (typeof lifecycle.Invalid.Message === 'string') {
                        this.$options.Lifecycle.Invalid.Message = lifecycle.Invalid.Message;
                    }
                    if (Array.isArray(lifecycle.Invalid.CB)) {
                        this.$options.Lifecycle.Invalid.CB = lifecycle.Invalid.CB;
                    }
                    else if (typeof lifecycle.Invalid.CB === 'function') {
                        if (!Array.isArray(this.$options.Lifecycle.Invalid.CB)) {
                            this.$options.Lifecycle.Invalid.CB = [];
                        }
                        this.$options.Lifecycle.Invalid.CB.push(lifecycle.Invalid.CB);
                    }
                }
            }
        }
        isElementVisible(element) {
            if (element instanceof HTMLElement) {
                return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
            }
            return false;
        }
    },
    _a.Options = ValidatableOptions_1.ValidatableOptions,
    _a));
exports.Validatable.prototype.Options = ValidatableOptions_1.ValidatableOptions;
//# sourceMappingURL=Validatable.js.map