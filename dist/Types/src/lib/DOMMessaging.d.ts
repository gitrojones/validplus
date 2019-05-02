import { VerticalPosition } from "../enums/Positions";
/**
 * Basic DOMMessaging mixin that supports creating and removing messages from a DOMElement
 *
 * @requires MessageNodePOS - The position (top, bottom) where messages append to the node
 * @requires MessageAnchor - The node where messages are to be appended to
 * @requires ClassName - The name to use as the base class name
 */
export declare class DOMMessaging {
    $MessageContainerClassName: string;
    $MessageClassName: string;
    $MessageNode: HTMLElement | null;
    $MessageAnchor: HTMLElement | null;
    $MessageNodePOS: VerticalPosition;
    DOMCreateElement(innerHTML: string, className: string): HTMLElement;
    generateMessageNode(anchor?: HTMLElement | null, pos?: VerticalPosition): void;
    removeMessageNode(): void;
    addMessage(message: string, status: string): void;
    addMessages(messages: string[], status: string): void;
    removeMessage(message: string): void;
    clearMessages(): void;
}
