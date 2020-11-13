import { HTMLValidationRules } from 'src/interfaces/validation/HTMLValidationRules'

/**
 * Standard attributes interface for Validation
 * @category Interfaces
 * @description
 * A standard collection of attributes consumed on input validation
 */
export interface ValidationAttributes {
  /** The current input value */
  value: string,
  /** Indicates if the input has been checked */
  checked: boolean,
  /** The input type name */
  type: string | null,
  /** The title attribute, if present */
  title: string,
  /** The input name, parsed via label, data-name attribute, or "Field" */
  name: string,
  /** The rule attributes to validate against */
  rules: HTMLValidationRules
}
