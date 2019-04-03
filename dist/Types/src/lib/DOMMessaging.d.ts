import { VerticalPosition } from '@/enums/Positions';
/**
 * Basic DOMMessaging mixin that supports creating and removing messages from a DOMElement
 *
 * @requires MessageNodePOS - The position (top, bottom) where messages append to the node
 * @requires MessageAnchor - The node where messages are to be appended to
 * @requires ClassName - The name to use as the base class name
 */
export declare class DOMMessaging {
    $MessageClassName: string;
    $MessageNode: HTMLElement | null;
    $MessageAnchor: HTMLElement | null;
    $MessageNodePOS: VerticalPosition;
    DOMCreateElement(innerHTML: string, className: string): HTMLElement;
    generateMessageNode(pos?: VerticalPosition, anchor?: HTMLElement | null): void;
    addMessage(message: string, status: string): void;
    removeMessage(message: string): void;
    clearMessages(): void;
}
