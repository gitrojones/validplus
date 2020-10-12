import { VPOptions } from "./interfaces/VPOptions";
import { ValidationStrategies } from "./interfaces/validation/ValidationStrategy";
import { ValidationLifecycle } from "./interfaces/validation/ValidationLifecycle";
import { DOMMessaging } from "./lib/DOMMessaging";
import { ValidatableOptions } from "./models/VPOptions/ValidatableOptions";
declare const EEMessaging: {
    new (...args: any[]): {
        $listeners: import("./interfaces/events/EventListener").EventListener;
        addEventListener(type: string, callback: import("./interfaces/events/EventCallback").EventCallback): void;
        removeEventListener(type: string, callback: import("./interfaces/events/EventCallback").EventCallback): import("./interfaces/events/EventCallback").EventCallback | null;
        dispatchEvent(event: Event, data?: any): boolean;
        createEvent(eventName: string, options?: import("./interfaces/events/EventOptions").EventOptions | undefined): Event;
    };
} & typeof DOMMessaging;
export declare class Validatable extends EEMessaging {
    static Options: typeof ValidatableOptions;
    $options: VPOptions;
    $element: HTMLElement;
    $lifecycleElements: HTMLElement[];
    $strategies: ValidationStrategies;
    $valid: boolean | null;
    constructor(element: HTMLElement, options: VPOptions);
    get $isValid(): boolean | null;
    set $isValid(isValid: boolean | null);
    setLifecycle(lifecycle: ValidationLifecycle): void;
    isElementVisible(element: HTMLElement): boolean;
}
export {};
