import { VPOptions } from '@/interfaces/VPOptions';
import { ValidationStrategies } from '@/interfaces/validation/ValidationStrategy';
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle';
export declare const Validatable: {
    new (...args: any[]): {
        $listeners: import("./interfaces/events/EventListener").EventListener;
        addEventListener(type: string, callback: import("./interfaces/events/EventCallback").EventCallback): void;
        removeEventListener(type: string, callback: () => void): void;
        dispatchEvent(event: Event, data: any): boolean | void;
        createEvent(eventName: string): Event;
    };
} & {
    new (options: VPOptions, element: HTMLElement): {
        $options: VPOptions;
        $element: HTMLElement;
        $strategies: ValidationStrategies;
        $valid: boolean | null;
        $isValid: boolean | null;
        setLifecycle(lifecycle: ValidationLifecycle): void;
        isElementVisible(element: HTMLElement): boolean;
        $MessageClassName: string;
        $MessageNode: HTMLElement | null;
        $MessageAnchor: HTMLElement | null;
        $MessageNodePOS: import("./enums/Positions").VerticalPosition;
        DOMCreateElement(innerHTML: string, className: string): HTMLElement;
        generateMessageNode(pos?: import("./enums/Positions").VerticalPosition, anchor?: HTMLElement | null): void;
        addMessage(message: string, status: string): void;
        addMessages(messages: string[], status: string): void;
        removeMessage(message: string): void;
        clearMessages(): void;
    };
};
