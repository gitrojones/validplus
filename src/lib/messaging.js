import generateElement from '../util/generateElement'

const clearMessages = function () {
  if (!(this._messageNode instanceof Element)) return

  while(this._messageNode.firstChild) {
    this._messageNode.removeChild(this._messageNode.firstChild)
  }
}

const removeMessage = function (message) {
  if (!(this._messageNode instanceof Element)) return

  Array.from(this._messageNode.children).forEach(child => {
    if (child.innerHTML === message) {
      this._messageNode.removeChild(child)
    }
  })
}

// Externally expects element, messageNode as instance
const addMessage = function (base) {
  return function (message, status) {
    let msg = generateElement(message, `${base} ${status}`)
    let messages = this._messageNode

    if (messages === null) {
      let _messages = generateElement('', `${base}s`)
      let anchor = this.options.messageAnchor instanceof Element
        ? this.options.messageAnchor
        : this.element

      _messages.appendChild(msg)
      switch (this.options.messagePOS) {
        case 'top':
          anchor.prepend(_messages)
          break;
        case 'bottom':
        default:
          anchor.appendChild(_messages)
      }

      this._messageNode = _messages
    } else {
      if (Array.from(this._messageNode.children)
        .every(m => m.innerHTML !== msg.innerHTML)) {
        this._messageNode.appendChild(msg)
      }
    }
  }
}

export default {
  clearMessages,
  removeMessage,
  addMessage
}
