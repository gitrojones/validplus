// JQuery $(element).is(':visible')
export function isElemVisible (element: HTMLElement) {
  if (element instanceof HTMLElement) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)
  } else {
    return null
  }
}
