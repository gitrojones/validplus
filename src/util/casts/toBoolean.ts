export function toBoolean (param: string | number | null, _default: (boolean | null)): (boolean | null) {
  if (param === null) return _default

  switch (typeof param) {
  case 'string':
    if (param.toLowerCase() === 'false') return false
    else return true
  }

  return !!param
}
