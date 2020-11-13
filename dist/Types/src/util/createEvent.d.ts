/**
 * Helper for supporting old browsers (IE8+)
 */
import { EventOptions } from 'src/interfaces/events/EventOptions';
export declare function createEvent(eventName: string, options: EventOptions): Event;
