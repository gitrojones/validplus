import { EventCallback } from 'src/interfaces/events/EventCallback'

export interface EventListener {
  [eventName: string]: EventCallback[]
}
