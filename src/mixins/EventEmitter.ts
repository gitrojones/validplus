import { createEvent } from 'src/util/createEvent'

import { Constructor } from 'src/types/Constructor'

import { BasicEventTarget } from 'src/interfaces/events/BasicEventTarget'
import { EventListener } from 'src/interfaces/events/EventListener'
import { EventCallback } from 'src/interfaces/events/EventCallback'
import { EventOptions } from 'src/interfaces/events/EventOptions'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function EventEmitter<TBase extends Constructor> (Base: TBase) {
  return class extends Base implements BasicEventTarget {
    $listeners: EventListener = {}

    addEventListener (type: string, callback: EventCallback): void {
      if (!Array.isArray(this.$listeners[type])) {
        this.$listeners[type] = []
      }
      this.$listeners[type].push(callback)
    }

    removeEventListener (type: string, callback: EventCallback): (EventCallback | null) {
      if (Array.isArray(this.$listeners[type]) && this.$listeners[type].length > 0) {
        const stack = this.$listeners[type]
        const stackLength = stack.length
        for (let i = 0; i < stackLength; i++) {
          if (stack[i] === callback) {
            return stack.splice(i, 1)[0];
          }
        }
      }

      return null;
    }

    /**
     * Include support for passing data along event
     * @param event - the Event object to dispatch
     * @param data - Data to be passed to the callback
     */
    dispatchEvent (event: Event, data: unknown = undefined): boolean {
      const listeners = this.$listeners[event.type];
      if (Array.isArray(listeners) && listeners.length > 0) {
        const stack = this.$listeners[event.type].slice()
        const stackLength = stack.length
        for (let i = 0; i < stackLength; i++) {
          stack[i].call(this, event, data)
        }

        return !event.defaultPrevented
      }

      return true;
    }

    createEvent (eventName: string, options?: EventOptions): Event {
      if (typeof options !== 'object') {
        options = { } as EventOptions;
      }
      if (typeof options.bubbles !== 'boolean') options.bubbles = false;
      if (typeof options.cancelable !== 'boolean') options.cancelable = false;
      if (typeof options.composed !== 'boolean') options.composed = false;

      return createEvent(eventName, options)
    }
  }
}
