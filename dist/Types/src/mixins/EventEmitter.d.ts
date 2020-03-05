import { Constructor } from "../types/Constructor";
import { EventListener } from "../interfaces/events/EventListener";
import { EventCallback } from "../interfaces/events/EventCallback";
import { pEvent } from "../models/Event";
export declare function EventEmitter<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        $listeners: EventListener;
        $element: HTMLElement | undefined;
        addEventListener(type: string, callback: EventCallback): void;
        removeEventListener(type: string, callback: EventCallback): void;
        /**
         * Include support for passing data along event
         * @param event - the Event object to dispatch
         * @param data - Data to be passed to the callback
         */
        dispatchEvent(event: string | pEvent, data: any): boolean | void;
        createEvent(eventName: string): pEvent;
    };
} & TBase;
