import { VPOptions } from 'src/interfaces/VPOptions';
import { ValidationStrategies } from 'src/interfaces/validation/ValidationStrategy';
import { ValidationLifecycle } from 'src/interfaces/validation/ValidationLifecycle';
import { DOMMessaging } from 'src/lib/DOMMessaging';
import { ValidatableOptions } from 'src/models/VPOptions/ValidatableOptions';
declare const EEMessaging: {
    new (...args: any[]): {
        $listeners: import("./interfaces/events/EventListener").EventListener;
        addEventListener(event_name: string, callback: import("./interfaces/events/EventCallback").EventCallback): void;
        removeEventListener(event_name: string, callback: import("./interfaces/events/EventCallback").EventCallback): import("./interfaces/events/EventCallback").EventCallback | null;
        dispatchEvent(event: Event, data?: unknown): boolean;
        createEvent(event_name: string, options?: import("./interfaces/events/EventOptions").EventOptions | undefined): Event;
    };
} & typeof DOMMessaging;
/**
 * VPValidatable Generic
 * @description
 * Generic instance all Validatable instances inherit from. Defines default shared logic and interfaces.
 * @augments module:EventEmitter
 * @augments DOMMessaging
 */
export declare class Validatable<T extends ValidatableOptions<T>> extends EEMessaging {
    $options: T;
    $element: HTMLElement;
    $lifecycleElements: HTMLElement[];
    $strategies: ValidationStrategies;
    $valid: boolean | null;
    constructor(element: HTMLElement, options: (VPOptions<T> | ValidatableOptions<T>));
    get $isValid(): boolean | null;
    set $isValid(isValid: boolean | null);
    /**
     * Scroll to the tracked element
     */
    scrollTo(): void;
    setLifecycle(lifecycle: ValidationLifecycle<T>): void;
    /**
     * Helper method to determine if the element is visible within the DOM
     * @param {HTMLElement} element - Element to test
     * @returns boolean
     */
    isElementVisible(element: HTMLElement): boolean;
}
export {};
