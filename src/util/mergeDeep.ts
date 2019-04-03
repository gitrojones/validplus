import { isObject } from '@/util/isObject'

/**
 * Deep merge two objects, left most takes priority
 *
 * @param target - The object to merge onto
 * @param sources - The object(s) to merge into the target
 */
export const mergeDeep = function (target: any, ...sources: any[]): object {
  if (!Array.isArray(sources) || sources.length < 1) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}
