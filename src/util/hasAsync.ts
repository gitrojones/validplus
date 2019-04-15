export const hasAsync = (collection: any[]): boolean => {
  return collection.some((item: any) => {
    return item && typeof item.then === 'function'
  })
}
