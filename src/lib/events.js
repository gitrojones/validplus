const addEventListener = function (type, callback) {
  if (!(type in this.listeners)) {
    this.listeners[type] = []
  }
  this.listeners[type].push(callback)
}
const removeEventListener = function (type, callback) {
  if (!(type in this.listeners)) return

  let stack = this.listeners[type]
  for (let i = 0, l = stack.length; i < l; i++) {
    if (stack[i] === callback) {
      stack.splice(i, 1)
      return
    }
  }
}
const dispatchEvent = function (event, data) {
  if (!(event.type in this.listeners)) return true

  let stack = this.listeners[event.type].slice()
  for (let i = 0, l = stack.length; i < l; i++) {
    stack[i].call(this, event, data)
  }

  return !event.defaultPrevented
}

export default {
  addEventListener,
  removeEventListener,
  dispatchEvent
}
