import { VerticalPosition } from '@/enums/Positions'
/**
 * Basic DOMMessaging mixin that supports creating and removing messages from a DOMElement
 *
 * @requires MessageNodePOS - The position (top, bottom) where messages append to the node
 * @requires MessageAnchor - The node where messages are to be appended to
 * @requires ClassName - The name to use as the base class name
 */
export default function DOMMessaging<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    $MessageClassName: string
    private $MessageAnchor: HTMLElement
    private $MessageNode: HTMLElement
    private $MessageNodePOS: VerticalPosition

    constructor(...args: any[]) {
      super(...args);

      if (!(this.$MessageAnchor instanceof HTMLElement)) {
        throw new Error('[DOMMessaging] MessageAnchor must be set.')
      }
      if (typeof this.$MessageNodePOS !== 'string') {
        throw new Error('[DOMMessaging] Unknown MessageNodePOS')
      }
      if (typeof this.$MessageClassName !== 'string') {
        throw new Error('[DOMMessaging] Unknown ClassName')
      }

      this.generateMessageNode()
    }

    private DOMCreateElement(innerHTML: string, className: string): HTMLElement {
      let el = document.createElement('div')
      el.className = className
      el.innerHTML = innerHTML

      return el
    }

    generateMessageNode(pos: VerticalPosition = this.$MessageNodePOS,
      anchor: HTMLElement = this.$MessageAnchor) {
      if (!(anchor instanceof HTMLElement)) {
        throw new Error('[DOMMessaging] MessageNode anchor must be an HTMLElement')
      }

      this.$MessageNode = this.DOMCreateElement('', `${this.$MessageClassName}s`)
      this.$MessageAnchor.appendChild(this.$MessageNode)
    }

    addMessage(message: string, status: string) {
      let DOMMessage: HTMLElement = this.DOMCreateElement(message, `${this.$MessageClassName} ${status}`)
      let AnchorMethod: string = this.$MessageNodePOS === VerticalPosition.top ? 'prepend' : 'appendChild'

      if (Array.from(this.$MessageNode.children)
        .every((m: HTMLElement) => m.innerHTML !== DOMMessage.innerHTML)) {
          this.$MessageNode[AnchorMethod](DOMMessage)
      }
    }

    removeMessage(message: string) {
      Array.from(this.$MessageNode.children)
        .forEach((child: HTMLElement) => {
        if (child.innerHTML === message) {
          this.$MessageNode.removeChild(child)
        }
      })
    }

    clearMessages() {
      while(this.$MessageNode.firstChild) {
        this.$MessageNode.removeChild(this.$MessageNode.firstChild)
      }
    }
  }
}
