import { VPOptions } from 'src/interfaces/VPOptions';
import { ValidationStrategies } from 'src/interfaces/validation/ValidationStrategy';
import { ValidationLifecycle } from 'src/interfaces/validation/ValidationLifecycle';
import { DOMMessaging } from 'src/lib/DOMMessaging';
import { ValidatableOptions } from 'src/models/VPOptions/ValidatableOptions';
declare const EEMessaging: {
    new (...args: any[]): {
        $listeners: import("./interfaces/events/EventListener").EventListener;
        addEventListener(type: string, callback: import("./interfaces/events/EventCallback").EventCallback): void;
        removeEventListener(type: string, callback: import("./interfaces/events/EventCallback").EventCallback): import("./interfaces/events/EventCallback").EventCallback | null;
        dispatchEvent(event: Event, data?: unknown): boolean;
        createEvent(eventName: string, options?: import("./interfaces/events/EventOptions").EventOptions | undefined): Event;
    };
} & typeof DOMMessaging;
export declare class Validatable<T extends ValidatableOptions<T>> extends EEMessaging {
    $options: T;
    $element: HTMLElement;
    $lifecycleElements: HTMLElement[];
    $strategies: ValidationStrategies;
    $valid: boolean | null;
    constructor(element: HTMLElement, options: (VPOptions<T> | ValidatableOptions<T>));
    get $isValid(): boolean | null;
    set $isValid(isValid: boolean | null);
    scrollTo(): void;
    setLifecycle(lifecycle: ValidationLifecycle<T>): void;
    isElementVisible(element: HTMLElement): boolean;
}
export {};
