import { debug } from '@/util/debug'

export function toRegexp (value: any): (RegExp | null) {
  try {
    if (value instanceof RegExp) return value
    if (typeof value === 'string' && value.length > 0) {
      return new RegExp(value)
    }

    return null
  } catch (err) {
    debug('(ToRegexp) Value could not be parsed')
    return null
  }
}
