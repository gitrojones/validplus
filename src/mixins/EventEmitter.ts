import EventListener from '@/interfaces/events/EventListener'
import EventCallback from '@/interfaces/events/EventCallback'

/**
 * Basic EventEmitter Mixin implementing EventTarget API
 */

interface BasicEventTarget {
  addEventListener (type: string, callback: () => void): void,
  removeEventListener (type: string, callback: () => void): void,
  dispatchEvent (event: Event, data: any): boolean | void,
  createEvent (eventName: string): Event
}

type Constructor<T = {}> = new (...args: any[]) => T

export default function EventEmitter<TBase extends Constructor> (Base: TBase) {
  return class extends Base implements BasicEventTarget {
    $listeners: EventListener = {}

    addEventListener (type: string, callback: EventCallback): void {
      if (!(type in this.$listeners)) {
        this.$listeners[type] = []
      }
      this.$listeners[type].push(callback)
    }
    removeEventListener (type: string, callback: () => void): void {
      if (!(type in this.$listeners)) return

      let stack = this.$listeners[type]
      let stackLength = stack.length
      for (let i = 0; i < stackLength; i++) {
        if (stack[i] === callback) {
          stack.splice(i, 1)
          return
        }
      }
    }

    /**
     * Include support for passing data along event
     * @param event - the Event object to dispatch
     * @param data - Data to be passed to the callback
     */
    dispatchEvent (event: Event, data: any): boolean | void {
      if (!(event.type in this.$listeners)) return true

      let stack = this.$listeners[event.type].slice()
      let stackLength = stack.length
      for (let i = 0; i < stackLength; i++) {
        stack[i].call(this, event, data)
      }

      return !event.defaultPrevented
    }
    /**
     * Helper for supporting old browsers (IE8+)
     */
    createEvent (eventName: string): Event {
      let event
      if (typeof(Event) === 'function') {
        event = new Event(eventName)
      } else {
        event = document.createEvent('Event')
        event.initEvent(eventName, true, true)
      }

      return event
    }
  }
}
