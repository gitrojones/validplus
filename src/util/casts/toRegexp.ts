import debug from '@/util/debug'

export default function (value: any): (RegExp | null) {
  try {
    if (value instanceof RegExp) return value
    return new RegExp(value)
  } catch (err) {
    debug('(ToRegexp) Value could not be parsed')
    return null
  }
}