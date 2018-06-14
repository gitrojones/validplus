export default function (msg, className = 'error') {
  let error = document.createElement('div')
  error.className = className
  error.innerHTML = msg

  return error
}
