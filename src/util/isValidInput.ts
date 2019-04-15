import { ValidInput } from '@/types/ValidInput'

export function isValidInput (input: ValidInput) {
  return input instanceof HTMLInputElement ||
         input instanceof HTMLSelectElement ||
         input instanceof HTMLTextAreaElement
}
