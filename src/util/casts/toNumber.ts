export function toNumber (value: any): (number | null) {
  const cast = +value;
  if (typeof cast === 'number' && !Number.isNaN(cast)) {
    return cast;
  }

  return null
}
