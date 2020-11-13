import { createEvent } from 'src/util/createEvent'

import { Constructor } from 'src/types/Constructor'

import { BasicEventTarget } from 'src/interfaces/events/BasicEventTarget'
import { EventListener } from 'src/interfaces/events/EventListener'
import { EventCallback } from 'src/interfaces/events/EventCallback'
import { EventOptions } from 'src/interfaces/events/EventOptions'

/**
 * Basic Event Emitter mixin
 * @category Lib
 * @module EventEmitter
 * @description
 * Implements a basic version of the Event interface, allowing for
 * messages and data to be passed between child/parent.
 */
export function EventEmitter<TBase extends Constructor> (Base: TBase) {
  return class extends Base implements BasicEventTarget {
    $listeners: EventListener = {}

    /**
     * Add an event listener
     * @param {string} event_name - Name of the event
     * @param {EventCallback} callback - Event callback to fire
     */
    addEventListener (event_name: string, callback: EventCallback): void {
      if (!Array.isArray(this.$listeners[event_name])) {
        this.$listeners[event_name] = []
      }
      this.$listeners[event_name].push(callback)
    }

    /**
     * Remove an event listener
     * @param {string} event_name - Name of the event
     * @param {EventCallback} callback - The event callback to remove
     * @return {EventCallback|null}
     */
    removeEventListener (event_name: string, callback: EventCallback): (EventCallback | null) {
      if (Array.isArray(this.$listeners[event_name]) && this.$listeners[event_name].length > 0) {
        const stack = this.$listeners[event_name]
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
     * @param {Event} event - the Event object to dispatch
     * @param {any} data - Data to be passed to the callback
     * @returns {boolean}
     */
    dispatchEvent (event: Event, data: unknown = undefined): boolean {
      const listeners = this.$listeners[event.type];
      if (Array.isArray(listeners) && listeners.length > 0) {
        const stack = this.$listeners[event.type].slice()
        const stackLength = stack.length
        for (let i = 0; i < stackLength; i++) {
          stack[i](event, data)
        }

        return !event.defaultPrevented
      }

      return true;
    }

    /**
     * Helper for creating a new event, supporting IE9
     * @param {string} event_name - Name of the event
     * @param {EventOptions} options - Event options
     * @returns {Event}
     */
    createEvent (event_name: string, options?: EventOptions): Event {
      if (typeof options !== 'object') {
        options = { } as EventOptions;
      }
      if (typeof options.bubbles !== 'boolean') options.bubbles = false;
      if (typeof options.cancelable !== 'boolean') options.cancelable = false;
      if (typeof options.composed !== 'boolean') options.composed = false;

      return createEvent(event_name, options)
    }
  }
}
