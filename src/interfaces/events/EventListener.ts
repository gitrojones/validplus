import { EventCallback } from '@/interfaces/events/EventCallback'

export interface EventListener {
  [eventName: string]: EventCallback[]
}
