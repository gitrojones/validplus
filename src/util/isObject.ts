/**
 * Simple object check.
 */
export function isObject (item: any): boolean {
  const exception: boolean = Array.isArray(item)
    || item instanceof RegExp

  return (item && typeof item === 'object' && !exception)
}
