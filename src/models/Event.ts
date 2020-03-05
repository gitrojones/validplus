// tslint:disable-next-line:class-name
export class pEvent extends Event {
  _stopPropagation: (() => void) | null = null
  propagationStopped: boolean = false
}
