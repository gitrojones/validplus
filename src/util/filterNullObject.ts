export function filterNullObject (obj: any): any {
  return Object.keys(obj).reduce((newObj: any, key: string) => {
    const value = obj[key]

    if (value !== null && typeof value !== 'undefined' && !Number.isNaN(value)) {
      newObj[key] = value
    }

    return newObj
  }, {})
}
