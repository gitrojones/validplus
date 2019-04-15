"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Positions_1 = require("@/enums/Positions");
const debug_1 = require("@/util/debug");
/**
 * Basic DOMMessaging mixin that supports creating and removing messages from a DOMElement
 *
 * @requires MessageNodePOS - The position (top, bottom) where messages append to the node
 * @requires MessageAnchor - The node where messages are to be appended to
 * @requires ClassName - The name to use as the base class name
 */
class DOMMessaging {
    constructor() {
        this.$MessageContainerClassName = 'DOMMessages';
        this.$MessageClassName = 'DOMMessage';
        this.$MessageNode = null;
        this.$MessageAnchor = null;
        this.$MessageNodePOS = Positions_1.VerticalPosition.bottom;
    }
    DOMCreateElement(innerHTML, className) {
        let el = document.createElement('div');
        el.className = className;
        el.innerHTML = innerHTML;
        return el;
    }
    generateMessageNode(anchor = null, pos = this.$MessageNodePOS) {
        if (!(anchor instanceof HTMLElement)) {
            debug_1.debug('Using existing anchor');
            anchor = this.$MessageAnchor;
            if (!(anchor instanceof HTMLElement)) {
                throw new Error('[DOMMessaging] MessageNode anchor must be an HTMLElement');
            }
        }
        else {
            debug_1.debug('Appending anchor');
            this.$MessageAnchor = anchor;
        }
        // Override POS here
        if (pos !== this.$MessageNodePOS) {
            this.$MessageNodePOS = pos;
        }
        if (this.$MessageNode instanceof HTMLElement) {
            debug_1.debug('Removing MessageNode', this.$MessageNode);
            this.$MessageNode.remove();
        }
        this.$MessageNode = this.DOMCreateElement('', this.$MessageContainerClassName);
        debug_1.debug('Creating message node', this.$MessageContainerClassName, this.$MessageNode);
        if (pos === Positions_1.VerticalPosition.top) {
            anchor.prepend(this.$MessageNode);
        }
        else if (pos === Positions_1.VerticalPosition.bottom) {
            anchor.appendChild(this.$MessageNode);
        }
        else {
            console.log('NoPos', pos, this.$MessageNodePOS);
        }
    }
    addMessage(message, status) {
        if (!(this.$MessageNode instanceof HTMLElement)) {
            throw new Error('[DOMMessaging] MessageNode must be an HTMLElement');
        }
        const MessageDoesNotExist = Array.from(this.$MessageNode.children)
            .every((m) => m.innerHTML !== message);
        if (MessageDoesNotExist) {
            let DOMMessage = this.DOMCreateElement(message, `${this.$MessageClassName} ${status}`);
            if (this.$MessageNodePOS === Positions_1.VerticalPosition.top) {
                this.$MessageNode.prepend(DOMMessage);
            }
            else if (this.$MessageNodePOS === Positions_1.VerticalPosition.bottom) {
                this.$MessageNode.appendChild(DOMMessage);
            }
        }
        else {
            debug_1.debug('Message exists', message);
        }
    }
    addMessages(messages, status) {
        messages.forEach((message) => {
            this.addMessage(message, status);
        });
    }
    removeMessage(message) {
        if (!(this.$MessageNode instanceof HTMLElement)) {
            throw new Error('[DOMMessaging] MessageNode must be an HTMLElement');
        }
        const MessageNode = this.$MessageNode;
        Array.from(this.$MessageNode.children)
            .forEach((child) => {
            if (child.innerHTML === message && this.$MessageNode) {
                MessageNode.removeChild(child);
            }
        });
    }
    clearMessages() {
        if (!(this.$MessageNode instanceof HTMLElement)) {
            debug_1.debug('MessageNode', this.$MessageNode);
            throw new Error('[DOMMessaging] MessageNode must be an HTMLElement');
        }
        while (this.$MessageNode.firstChild) {
            this.$MessageNode.removeChild(this.$MessageNode.firstChild);
        }
    }
}
exports.DOMMessaging = DOMMessaging;
//# sourceMappingURL=DOMMessaging.js.map