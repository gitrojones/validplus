// JQuery $(element).is(':visible')
export default function (element) {
  if (element instanceof Element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)
  } else {
    return null
  }
}
