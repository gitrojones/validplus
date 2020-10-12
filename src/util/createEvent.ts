/**
 * Helper for supporting old browsers (IE8+)
 */
import {EventOptions} from 'src/interfaces/events/EventOptions'

export function createEvent (eventName: string, options: EventOptions): Event {
  let event
  // Support older browsers which don't have
  // Event as a constructor
  // tslint:disable-next-line: strict-type-predicates
  if (typeof(Event) === 'function') {
    event = new Event(eventName, options)
  }
  /* ignore coverage */
  else {
    event = document.createEvent('Event')
    event.initEvent(eventName, options.bubbles, options.cancelable)
  }

  return event
}
