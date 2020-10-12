export function toRegexp (value: any): (RegExp | null) {
  if (value instanceof RegExp) return value;
  if (typeof value === 'string' && value.length > 0) {
    if (/^\/.+\/i?g?m?s?u?y?$/.test(value)) {
      const pieces = value.split('/');
      if (pieces.length === 3) {
        return new RegExp(pieces[1], pieces[2]);
      }
    }

    return new RegExp(value)
  }

  return null
}
