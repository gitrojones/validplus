import { VerticalPosition } from 'src/enums/Positions'

/**
 * Basic DOMMessaging mixin that supports creating and removing messages from a DOMElement
 *
 * @category Lib
 * @prop $MessageAnchor - The anchor element where the $MessageNode will be rigged to
 * @prop $MessageContainerClassName - The $MessageNode default class name
 * @prop $MessageClassName - The individual message nodes default class name
 * @prop $MessageNode - The node where messages will be appended
 */
export class DOMMessaging {
  $MessageContainerClassName: string = 'DOMMessages'
  $MessageClassName: string = 'DOMMessage'
  $MessageNode: HTMLElement | null = null
  $MessageAnchor: HTMLElement | null = null

  /**
   * Internal helper for generating an element
   * @param innerHTML - InnerHTML content
   * @param [classes] - Default classes to append to the element
   * @private
   */
  private DOMCreateElement (innerHTML: string, classes: (string|string[])): HTMLElement {
    let el = document.createElement('div')
    el.innerHTML = innerHTML

    if (!Array.isArray(classes)) classes = [classes];
    classes.forEach((className) => {
      if (className.length > 0) el.classList.add(className);
    })

    return el
  }

  /**
   * Internal helper for appending children to a parent node based on the provided POS
   * @param parent
   * @param children
   * @param pos
   * @throws If the pos isn't valid (top/bottom)
   * @private
   */
  private appendNodeChildrenPOS (
    parent: HTMLElement,
    children: (HTMLElement|HTMLElement[]),
    pos: VerticalPosition = VerticalPosition.bottom) {
    let strategy: ('prepend'|'appendChild');
    if (pos === VerticalPosition.top) strategy = 'prepend';
    else if (pos === VerticalPosition.bottom) strategy = 'appendChild';
    else throw new Error('[DOMMessaging] Unknown anchor position specified');

    if (!Array.isArray(children)) children = [children];
    children.forEach((child) => {
      if (pos === VerticalPosition.top) parent[strategy](child)
      else if (pos === VerticalPosition.bottom) parent[strategy](child)
    });
  }

  /**
   * Generate a messageNode where messages can be added and removed in a managed way.
   * @param [anchor] - The anchor to use for the $MessageNode (Defaults to $MessageAnchor)
   * @param [pos] - The position to set $MessageNode inside the $MessageAnchor
   * @throws If anchor isn't an Element
   * @throws If pos isn't a valid {VerticalPosition}
   */
  generateMessageNode (
    anchor: (HTMLElement | null) = this.$MessageAnchor,
    pos: VerticalPosition = VerticalPosition.bottom): void {
    if (!anchor) anchor = this.$MessageAnchor;
    if (!(anchor instanceof HTMLElement)) {
      throw new Error('[DOMMessaging] MessageNode anchor must be an HTMLElement')
    }

    // Remove Previous Message Node
    if (this.$MessageNode instanceof HTMLElement) this.$MessageNode.remove()

    // Set the MessageAnchor
    if (this.$MessageAnchor !== anchor) this.$MessageAnchor = anchor

    // Create the new $MessageNode on the anchor (if it doesnt exist)
    const messageNodeExists = Array.from(this.$MessageAnchor.children)
      .some((m: Element) => m.className.indexOf(this.$MessageContainerClassName) !== -1);
    if (!messageNodeExists) {
      this.$MessageNode = this.DOMCreateElement('',
        this.$MessageContainerClassName);

      this.appendNodeChildrenPOS(anchor, this.$MessageNode, pos);
    }
  }

  /**
   * Removes the $MessageNode from the $MessageAnchor
   * @throws If the $MessageNode isn't set or isn't an HTMLElement
   */
  removeMessageNode () {
    if (this.$MessageNode instanceof HTMLElement) this.$MessageNode.remove()
    else throw new Error('[DOMMessaging] MessageNode does not exist')
  }

  /**
   * Adds a unique message to the $MessageNode
   * @param message - The message to append
   * @param [status] - An optional class to append indicating message status
   * @throws If the $MessageNode isn't set or isn't an HTMLElement
   */
  addMessage (message: string, status: string = ''): void {
    if (!(this.$MessageNode instanceof HTMLElement)) {
      throw new Error('[DOMMessaging] MessageNode must be an HTMLElement')
    }

    // De-dupe messages
    const messageDoesNotExist: boolean = Array.from(this.$MessageNode.children)
      .every((m: Element) => m.innerHTML !== message);

    if (messageDoesNotExist) {
      let DOMMessage: HTMLElement = this.DOMCreateElement(message, [
        this.$MessageClassName,
        status
      ]);

      this.appendNodeChildrenPOS(this.$MessageNode, DOMMessage);
    }
  }

  /**
   * Batch append messages
   * @param messages - The messages to append
   * @param [status] - An optional class to append indicating message status
   * @throws If the $MessageNode isn't set or isn't an HTMLElement
   */
  addMessages (messages: string[], status: string = ''): void {
    messages.forEach((message) => {
      this.addMessage(message, status)
    })
  }

  /**
   * Remove a message
   * @param message - The message to remove
   * @throws If the $MessageNode isn't set or isn't an HTMLElement
   */
  removeMessage (message: string): void {
    if (!(this.$MessageNode instanceof HTMLElement)) {
      throw new Error('[DOMMessaging] MessageNode must be an HTMLElement')
    }

    Array.from(this.$MessageNode.children)
      .forEach((child) => {
        if (child.innerHTML === message) child.remove();
      })
  }

  /** Clear all messages from the $MessageNode (If set) */
  clearMessages (): void {
    if (!(this.$MessageNode instanceof HTMLElement)) return;

    Array.from(this.$MessageNode.children)
      .forEach((child) => child.remove());
  }
}
