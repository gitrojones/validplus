export function isAsync (item: any): boolean {
  return item && typeof item.then === 'function'
}
