export function toBoolean (param: string | number | null, _default: boolean): boolean {
  if (param === null) return _default

  switch (typeof param) {
  case 'string':
    if (param.length === 0) return _default
    if (param.toLowerCase() === 'true') return true
    if (param.toLowerCase() === 'false') return false
    break
  }

  return !!param
}
