/**
 * Basic EventEmitter Mixin implementing EventTarget API
 */
import { EventListener } from "./EventListener";
export interface BasicEventTarget {
    $listeners: EventListener;
    addEventListener(type: string, callback: () => void): void;
    removeEventListener(type: string, callback: () => void): void;
    dispatchEvent(event: Event, data: any): boolean | void;
    createEvent(eventName: string): Event;
}
