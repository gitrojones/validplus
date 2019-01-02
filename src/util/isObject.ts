/**
 * Simple object check.
 */
export default function (item: any): boolean {
  const exception = Array.isArray(item)
    || item instanceof RegExp

  return (item && typeof item === 'object' && !exception)
}
