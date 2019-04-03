/**
 * Basic EventEmitter Mixin implementing EventTarget API
 */
export interface BasicEventTarget {
  addEventListener (type: string, callback: () => void): void,
  removeEventListener (type: string, callback: () => void): void,
  dispatchEvent (event: Event, data: any): boolean | void,
  createEvent (eventName: string): Event
}