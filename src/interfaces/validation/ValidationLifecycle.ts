import {Validatable} from 'src/Validatable'
import {ValidatableOptions} from 'src/models/VPOptions/ValidatableOptions'

export type ValidationCB<T extends ValidatableOptions<T>> = (VPInstance: (Validatable<T>)) => null
export interface ValidationLifecycle<T extends ValidatableOptions<T>> {
  Valid: {
    Message?: string,
    CB?: Array<ValidationCB<T>>
  },
  Invalid: {
    Message?: string,
    CB?: Array<ValidationCB<T>>
  }
}
