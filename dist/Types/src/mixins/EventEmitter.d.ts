import { Constructor } from 'src/types/Constructor';
import { EventListener } from 'src/interfaces/events/EventListener';
import { EventCallback } from 'src/interfaces/events/EventCallback';
import { EventOptions } from 'src/interfaces/events/EventOptions';
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
        dispatchEvent(event: Event, data?: any): boolean;
        createEvent(eventName: string, options?: EventOptions | undefined): Event;
    };
} & TBase;
