import { EventCallback } from "./EventCallback";
export interface EventListener {
    [eventName: string]: EventCallback[];
}
