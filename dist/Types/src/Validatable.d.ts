import { VPOptions } from "./interfaces/VPOptions";
import { ValidationStrategies } from "./interfaces/validation/ValidationStrategy";
import { ValidationLifecycle } from "./interfaces/validation/ValidationLifecycle";
export declare const Validatable: {
    new (...args: any[]): {
        $listeners: import("./interfaces/events/EventListener").EventListener;
        addEventListener(type: string, callback: import("./interfaces/events/EventCallback").EventCallback): void;
        removeEventListener(type: string, callback: import("./interfaces/events/EventCallback").EventCallback): void;
        dispatchEvent(event: Event, data: any): boolean | void;
        createEvent(eventName: string): Event;
    };
} & {
    new (options: VPOptions, element: HTMLElement): {
        dispatchEvent: any;
        createEvent: any;
        $options: VPOptions;
        $element: HTMLElement;
        $Input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
        $strategies: ValidationStrategies;
        $valid: boolean | null;
        $isValid: boolean | null;
        setLifecycle(lifecycle: ValidationLifecycle): void;
        isElementVisible(element: HTMLElement): boolean;
        $MessageContainerClassName: string;
        $MessageClassName: string;
        $MessageNode: HTMLElement | null;
        $MessageAnchor: HTMLElement | null;
        $MessageNodePOS: import("./enums/Positions").VerticalPosition;
        DOMCreateElement(innerHTML: string, className: string): HTMLElement;
        generateMessageNode(anchor?: HTMLElement | null, pos?: import("./enums/Positions").VerticalPosition): void;
        removeMessageNode(): void;
        addMessage(message: string, status: string): void;
        addMessages(messages: string[], status: string): void;
        removeMessage(message: string): void;
        clearMessages(): void;
    };
};
