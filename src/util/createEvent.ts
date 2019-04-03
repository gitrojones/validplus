/**
 * Helper for supporting old browsers (IE8+)
 */

export function createEvent (eventName: string): Event {
  let event
  // Support older browsers which don't have
  // Event as a constructor
  // tslint:disable-next-line: strict-type-predicates
  if (typeof(Event) === 'function') {
    event = new Event(eventName)
  } else {
    event = document.createEvent('Event')
    event.initEvent(eventName, true, true)
  }

  return event
}
