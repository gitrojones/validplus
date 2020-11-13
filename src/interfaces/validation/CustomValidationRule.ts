import {ValidationAttributes} from 'src/interfaces/validation/ValidationAttributes'
import {ValidInput} from 'src/types/ValidInput'

/**
 * Custom Validation Rule
 * @category Interfaces
 * @description
 * Custom rule interface for creating your own validation rules
 */
export interface CustomValidationRule {
  (
    /** Input attributes, such as value */
    inputAttributes: ValidationAttributes,
    /** Field Element */
    element: HTMLElement,
    /** Input Element */
    input: ValidInput
  ): (boolean | Promise<boolean> | string | Promise<string>),
}
