export default function (message, className) {
  let el = document.createElement('div')
  el.className = className
  el.innerHTML = message

  return el
}
