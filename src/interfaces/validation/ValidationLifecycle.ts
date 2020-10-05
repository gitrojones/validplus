import { Validatable } from 'src/Validatable'

export type ValidationCB = (VPInstance: (Validatable)) => null
export interface ValidationLifecycle {
  Valid: {
    Message?: string,
    CB?: Array<ValidationCB>
  },
  Invalid: {
    Message?: string,
    CB?: Array<ValidationCB>
  }
}
