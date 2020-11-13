import { Constructor } from 'src/types/Constructor';
import { EventListener } from 'src/interfaces/events/EventListener';
import { EventCallback } from 'src/interfaces/events/EventCallback';
import { EventOptions } from 'src/interfaces/events/EventOptions';
/**
 * Basic Event Emitter mixin
 * @category Lib
 * @module EventEmitter
 * @description
 * Implements a basic version of the Event interface, allowing for
 * messages and data to be passed between child/parent.
 */
export declare function EventEmitter<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        $listeners: EventListener;
        /**
         * Add an event listener
         * @param {string} event_name - Name of the event
         * @param {EventCallback} callback - Event callback to fire
         */
        addEventListener(event_name: string, callback: EventCallback): void;
        /**
         * Remove an event listener
         * @param {string} event_name - Name of the event
         * @param {EventCallback} callback - The event callback to remove
         * @return {EventCallback|null}
         */
        removeEventListener(event_name: string, callback: EventCallback): (EventCallback | null);
        /**
         * Include support for passing data along event
         * @param {Event} event - the Event object to dispatch
         * @param {any} data - Data to be passed to the callback
         * @returns {boolean}
         */
        dispatchEvent(event: Event, data?: unknown): boolean;
        /**
         * Helper for creating a new event, supporting IE9
         * @param {string} event_name - Name of the event
         * @param {EventOptions} options - Event options
         * @returns {Event}
         */
        createEvent(event_name: string, options?: EventOptions | undefined): Event;
    };
} & TBase;
