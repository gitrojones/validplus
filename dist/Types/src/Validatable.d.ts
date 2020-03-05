import { VPOptions } from "./interfaces/VPOptions";
import { ValidationStrategies } from "./interfaces/validation/ValidationStrategy";
import { ValidationLifecycle } from "./interfaces/validation/ValidationLifecycle";
import { ValidatableOptions } from "./models/VPOptions/ValidatableOptions";
import { VPField } from "./Field";
import { VPFieldset } from "./Fieldset";
export declare const Validatable: {
    new (...args: any[]): {
        $listeners: import("./interfaces/events/EventListener").EventListener;
        $element: HTMLElement | undefined;
        addEventListener(type: string, callback: import("./interfaces/events/EventCallback").EventCallback): void;
        removeEventListener(type: string, callback: import("./interfaces/events/EventCallback").EventCallback): void;
        dispatchEvent(event: string | import("./models/Event").pEvent, data: any): boolean | void;
        createEvent(eventName: string): import("./models/Event").pEvent;
    };
} & {
    new (options: VPOptions, element: HTMLElement): {
        [index: string]: any;
        dispatchEvent: any;
        createEvent: any;
        $options: VPOptions;
        $element: HTMLElement;
        $valid: boolean | null;
        $strategies: ValidationStrategies;
        $isValid: boolean | null;
        assertValidNoWatch(obj: VPFieldset | VPField): boolean | Promise<boolean>;
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
    Options: typeof ValidatableOptions;
};
