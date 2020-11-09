export function toNumber (value: any): (number | null) {
  const cast = +value;
  if (value !== null && !Number.isNaN(cast)) {
    return cast;
  }

  return null
}
