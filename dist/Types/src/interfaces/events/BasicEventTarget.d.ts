/**
 * Basic EventEmitter Mixin implementing EventTarget API
 */
import { EventListener } from "./EventListener";
import { pEvent } from "../../models/Event";
export interface BasicEventTarget {
    $listeners: EventListener;
    addEventListener(type: string, callback: () => void): void;
    removeEventListener(type: string, callback: () => void): void;
    dispatchEvent(event: pEvent, data: any): boolean | void;
    createEvent(eventName: string): pEvent;
}
