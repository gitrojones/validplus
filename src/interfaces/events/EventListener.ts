import EventCallback from '@/interfaces/events/EventCallback'

export default interface EventListener {
  [eventName: string]: EventCallback[]
}
