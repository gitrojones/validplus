import { createEvent } from 'src/util/createEvent'

import { Constructor } from 'src/types/Constructor'

import { BasicEventTarget } from 'src/interfaces/events/BasicEventTarget'
import { EventListener } from 'src/interfaces/events/EventListener'
import { EventCallback } from 'src/interfaces/events/EventCallback'

export function EventEmitter<TBase extends Constructor> (Base: TBase) {
  return class extends Base implements BasicEventTarget {
    $listeners: EventListener = {}

    addEventListener (type: string, callback: EventCallback): void {
      if (!(type in this.$listeners)) {
        this.$listeners[type] = []
      }
      this.$listeners[type].push(callback)
    }

    removeEventListener (type: string, callback: EventCallback): void {
      if (!(type in this.$listeners)) return

      const stack = this.$listeners[type]
      const stackLength = stack.length
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

      const stack = this.$listeners[event.type].slice()
      const stackLength = stack.length
      for (let i = 0; i < stackLength; i++) {
        stack[i].call(this, event, data)
      }

      return !event.defaultPrevented
    }

    createEvent (eventName: string): Event {
      return createEvent(eventName)
    }
  }
}
