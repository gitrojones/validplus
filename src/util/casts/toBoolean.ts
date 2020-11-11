export function toBoolean<T extends unknown> (param: any, _default: boolean | T = false): (boolean | T) {
  switch (typeof param) {
  case 'boolean':
    return param;
  case 'string':
    if (param.toLowerCase() === 'false') return false
    else if (param.toLowerCase() === 'true') return true
    else return _default;
  case 'number':
    return !!param;
  }

  return _default;
}
