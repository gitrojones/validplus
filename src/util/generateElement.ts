export function generateElement (message: string, className: string): HTMLElement {
  let el: HTMLElement = document.createElement('div')
  el.className = className
  el.innerHTML = message

  return el
}
