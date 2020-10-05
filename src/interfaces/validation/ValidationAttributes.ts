import { HTMLValidationRules } from 'src/interfaces/validation/HTMLValidationRules'

export interface ValidationAttributes {
  value: string,
  checked: boolean,
  type: string | null,
  name: string,
  rules: HTMLValidationRules
}
