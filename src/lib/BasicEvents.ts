interface EventListener {
  [eventName: string]: Array<() => void>
}

export default class BasicEvents {
  $listeners: EventListener

  constructor() {
    this.$listeners = {}
  }

  addEventListener(type: string, callback: () => void): void {
    if (!(type in this.$listeners)) {
      this.$listeners[type] = []
    }
    this.$listeners[type].push(callback)
  }
  removeEventListener(type: string, callback: () => void): void {
    if (!(type in this.$listeners)) return

    let stack = this.$listeners[type]
    for (let i = 0, l = stack.length; i < l; i++) {
      if (stack[i] === callback) {
        stack.splice(i, 1)
        return
      }
    }
  }

  dispatchEvent(event: Event, data: any): boolean | void {
    if (!(event.type in this.$listeners)) return true

    let stack = this.$listeners[event.type].slice()
    for (let i = 0, l = stack.length; i < l; i++) {
      stack[i].call(this, event, data)
    }

    return !event.defaultPrevented
  }
}
