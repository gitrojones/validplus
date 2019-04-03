export function toNumber (value: any): (Number | null) {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string') {
    return +value
  }

  return null
}
