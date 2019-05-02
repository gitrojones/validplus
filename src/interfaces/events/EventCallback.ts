export interface EventCallback {
  (event: Event, data: any): void
}

export interface EventCallbackObject {
  name: string,
  handler: EventCallback
}
