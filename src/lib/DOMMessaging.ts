import { VerticalPosition } from '@/enums/Positions'
import { debug } from '@/util/debug'

/**
 * Basic DOMMessaging mixin that supports creating and removing messages from a DOMElement
 *
 * @requires MessageNodePOS - The position (top, bottom) where messages append to the node
 * @requires MessageAnchor - The node where messages are to be appended to
 * @requires ClassName - The name to use as the base class name
 */

export class DOMMessaging {
  $MessageContainerClassName: string = 'DOMMessages'
  $MessageClassName: string = 'DOMMessage'
  $MessageNode: HTMLElement | null = null
  $MessageAnchor: HTMLElement | null = null
  $MessageNodePOS: VerticalPosition = VerticalPosition.bottom

  DOMCreateElement (innerHTML: string, className: string): HTMLElement {
    let el = document.createElement('div')
    el.className = className
    el.innerHTML = innerHTML

    return el
  }

  generateMessageNode (anchor: HTMLElement | null = null,
    pos: VerticalPosition = this.$MessageNodePOS): void {
    if (!(anchor instanceof HTMLElement)) {
      debug('Using existing anchor')
      anchor = this.$MessageAnchor

      if (!(anchor instanceof HTMLElement)) {
        throw new Error('[DOMMessaging] MessageNode anchor must be an HTMLElement')
      }
    } else {
      debug('Appending anchor')
      this.$MessageAnchor = anchor
    }

    // Override POS here
    if (pos !== this.$MessageNodePOS) {
      this.$MessageNodePOS = pos
    }

    if (this.$MessageNode instanceof HTMLElement) {
      debug('Removing MessageNode', this.$MessageNode)
      this.$MessageNode.remove()
    }

    this.$MessageNode = this.DOMCreateElement('', this.$MessageContainerClassName)
    debug('Creating message node', this.$MessageContainerClassName, this.$MessageNode)
    if (pos === VerticalPosition.top) {
      anchor.prepend(this.$MessageNode)
    } else if (pos === VerticalPosition.bottom) {
      anchor.appendChild(this.$MessageNode)
    } else {
      debug('NoPos', pos, this.$MessageNodePOS)
    }
  }

  removeMessageNode () {
    if (this.$MessageNode instanceof HTMLElement) {
      debug('Removing MessageNode', this.$MessageNode)
      this.$MessageNode.remove()
    } else {
      throw new Error('MessageNode does not exist')
    }
  }

  addMessage (message: string, status: string): void {
    if (!(this.$MessageNode instanceof HTMLElement)) {
      throw new Error('[DOMMessaging] MessageNode must be an HTMLElement')
    }

    const MessageDoesNotExist: boolean = Array.from(this.$MessageNode.children)
      .every((m: Element) => m.innerHTML !== message)

    if (MessageDoesNotExist) {
      let DOMMessage: HTMLElement = this.DOMCreateElement(message, `${this.$MessageClassName} ${status}`)

      if (this.$MessageNodePOS === VerticalPosition.top) {
        this.$MessageNode.prepend(DOMMessage)
      } else if (this.$MessageNodePOS === VerticalPosition.bottom) {
        this.$MessageNode.appendChild(DOMMessage)
      }
    } else {
      debug('Message exists', message)
    }
  }

  addMessages (messages: string[], status: string): void {
    messages.forEach((message) => {
      this.addMessage(message, status)
    })
  }

  removeMessage (message: string): void {
    if (!(this.$MessageNode instanceof HTMLElement)) {
      throw new Error('[DOMMessaging] MessageNode must be an HTMLElement')
    }

    const MessageNode: HTMLElement = this.$MessageNode

    Array.from(this.$MessageNode.children)
      .forEach((child: Element) => {
        if (child.innerHTML === message && this.$MessageNode) {
          MessageNode.removeChild(child)
        }
      })
  }

  clearMessages (): void {
    if (!(this.$MessageNode instanceof HTMLElement)) {
      debug('MessageNode', this.$MessageNode)
      throw new Error('[DOMMessaging] MessageNode must be an HTMLElement')
    }

    while (this.$MessageNode.firstChild) {
      this.$MessageNode.removeChild(this.$MessageNode.firstChild)
    }
  }
}
