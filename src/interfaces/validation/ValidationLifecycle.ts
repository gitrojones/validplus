import {Validatable} from 'src/Validatable'
import {ValidatableOptions} from 'src/models/VPOptions/ValidatableOptions'

/**
 * Validation Callback
 * @category Types
 * @description
 * Validation callback type definition
 */
export type ValidationCB<T extends ValidatableOptions<T>> = (VPInstance: (Validatable<T>)) => null

/**
 * Validation Lifecycle interface
 * @category Interfaces
 * @description
 * Provide messaging or actions to dispatch based on the lifecycle of the
 * instance being validated
 */
export interface ValidationLifecycle<T extends ValidatableOptions<T>> {
  /** isValid === true */
  Valid: {
    /** Message to display if valid */
    Message?: string,
    /** Actions to fire if valid */
    CB?: Array<ValidationCB<T>>
  },
  /** isValid === false */
  Invalid: {
    /** Message to display if invalid */
    Message?: string,
    /** Actions to fire if invalid */
    CB?: Array<ValidationCB<T>>
  }
}
