/**
 * Helper for supporting old browsers (IE8+)
 */
import { pEvent } from '@/models/Event'

export function createEvent (eventName: string): pEvent {
  let event

  // Support older browsers which don't have
  // Event as a constructor
  // @ts-ignore
  if (window && typeof(window.Event) === 'function') {
    // @ts-ignore
    event = new window.Event(eventName)
  } else {
    event = document.createEvent('Event')
    event.initEvent(eventName, true, true)
  }

  // Track propagation to short-circuit parent loop
  event._stopPropagation = event.stopPropagation
  event.propagationStopped = false
  event.stopPropagation = function () {
    this.propagationStopped = true
    this._stopPropagation()
  }

  return event as pEvent
}
