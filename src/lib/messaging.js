import generateElement from '../util/generateElement'

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
const prependPolyfill = (function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
        docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

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
const appendMessage = function (base) {
  return function (message, status) {
    let msg = generateElement(message, `${base} ${status}`)
    let messages = this._messageNode

    if (messages === null) {
      let _messages = generateElement('', `${base}s`)
      _messages.appendChild(msg)

      switch (this.options.messagePOS) {
        case 'top':
          if (typeof this.element.prepend !== 'function') {
            this.element.prepend = prependPolyfill
          }

          this.element.prepend(_messages)
          break;
        case 'bottom':
        default:
          this.element.appendChild(_messages)
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
  appendMessage
}
