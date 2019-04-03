import { VerticalPosition } from '@/enums/Positions'

/**
 * Basic DOMMessaging mixin that supports creating and removing messages from a DOMElement
 *
 * @requires MessageNodePOS - The position (top, bottom) where messages append to the node
 * @requires MessageAnchor - The node where messages are to be appended to
 * @requires ClassName - The name to use as the base class name
 */

export class DOMMessaging {
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

  generateMessageNode (pos: VerticalPosition = this.$MessageNodePOS,
    anchor: HTMLElement | null = this.$MessageAnchor): void {
    if (!(anchor instanceof HTMLElement)) {
      throw new Error('[DOMMessaging] MessageNode anchor must be an HTMLElement')
    }

    this.$MessageNode = this.DOMCreateElement('', `${this.$MessageClassName}s`)
    if (pos === VerticalPosition.top) {
      anchor.prepend(this.$MessageNode)
    } else if (pos === VerticalPosition.bottom) {
      anchor.appendChild(this.$MessageNode)
    } else {
      console.log('NoPos', pos, this.$MessageNodePOS)
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
    }
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
      throw new Error('[DOMMessaging] MessageNode must be an HTMLElement')
    }

    while (this.$MessageNode.firstChild) {
      this.$MessageNode.removeChild(this.$MessageNode.firstChild)
    }
  }
}
