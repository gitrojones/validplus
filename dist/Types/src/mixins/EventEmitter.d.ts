import { Constructor } from "../types/Constructor";
import { EventListener } from "../interfaces/events/EventListener";
import { EventCallback } from "../interfaces/events/EventCallback";
import { EventOptions } from "../interfaces/events/EventOptions";
export declare function EventEmitter<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        $listeners: EventListener;
        addEventListener(type: string, callback: EventCallback): void;
        removeEventListener(type: string, callback: EventCallback): (EventCallback | null);
        /**
         * Include support for passing data along event
         * @param event - the Event object to dispatch
         * @param data - Data to be passed to the callback
         */
        dispatchEvent(event: Event, data?: unknown): boolean;
        createEvent(eventName: string, options?: EventOptions | undefined): Event;
    };
} & TBase;
