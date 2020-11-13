import { VerticalPosition } from 'src/enums/Positions';
/**
 * Basic DOMMessaging mixin that supports creating and removing messages from a DOMElement
 *
 * @category Lib
 * @prop $MessageAnchor - The anchor element where the $MessageNode will be rigged to
 * @prop $MessageContainerClassName - The $MessageNode default class name
 * @prop $MessageClassName - The individual message nodes default class name
 * @prop $MessageNode - The node where messages will be appended
 */
export declare class DOMMessaging {
    $MessageContainerClassName: string;
    $MessageClassName: string;
    $MessageNode: HTMLElement | null;
    $MessageAnchor: HTMLElement | null;
    /**
     * Internal helper for generating an element
     * @param innerHTML - InnerHTML content
     * @param [classes] - Default classes to append to the element
     * @private
     */
    private DOMCreateElement;
    /**
     * Internal helper for appending children to a parent node based on the provided POS
     * @param parent
     * @param children
     * @param pos
     * @throws If the pos isn't valid (top/bottom)
     * @private
     */
    private appendNodeChildrenPOS;
    /**
     * Generate a messageNode where messages can be added and removed in a managed way.
     * @param [anchor] - The anchor to use for the $MessageNode (Defaults to $MessageAnchor)
     * @param [pos] - The position to set $MessageNode inside the $MessageAnchor
     * @throws If anchor isn't an Element
     * @throws If pos isn't a valid {VerticalPosition}
     */
    generateMessageNode(anchor?: (HTMLElement | null), pos?: VerticalPosition): void;
    /**
     * Removes the $MessageNode from the $MessageAnchor
     * @throws If the $MessageNode isn't set or isn't an HTMLElement
     */
    removeMessageNode(): void;
    /**
     * Adds a unique message to the $MessageNode
     * @param message - The message to append
     * @param [status] - An optional class to append indicating message status
     * @throws If the $MessageNode isn't set or isn't an HTMLElement
     */
    addMessage(message: string, status?: string): void;
    /**
     * Batch append messages
     * @param messages - The messages to append
     * @param [status] - An optional class to append indicating message status
     * @throws If the $MessageNode isn't set or isn't an HTMLElement
     */
    addMessages(messages: string[], status?: string): void;
    /**
     * Remove a message
     * @param message - The message to remove
     * @throws If the $MessageNode isn't set or isn't an HTMLElement
     */
    removeMessage(message: string): void;
    /** Clear all messages from the $MessageNode (If set) */
    clearMessages(): void;
}
