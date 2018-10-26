export default (event_type) => {
  let event
  if (typeof(Event) === 'function') {
    event = new Event(event_type)
  } else {
    event = document.createEvent('Event');
    event.initEvent(event_type, true, true);
  }

  return event
}
