import {VPField} from 'src/Field'

/**
 * Validation Strategy interface
 * @category Interfaces
 * @description
 * Strategy interface to determine the validity of a fieldset based on the status of fields being tracked
 */
export interface ValidationStrategy {
  (fieldstatus: boolean[], fields: VPField[]): boolean
}

/**
 * Validation Option type
 * @category Types
 * @description
 * Helper type for ValidationStrategy overloading
 */
export type ValidationOption = ValidationStrategyNames | ValidationStrategy;

/**
 * Validation Strategy Names
 * @category Types
 * @description
 * Internally supported validation strategies
 */
export type ValidationStrategyNames = 'all' | 'some' | 'one' | 'none';

/**
 * Validation Strategies interface
 * @category Interfaces
 * @description
 * Internally supported validation strategies collection interface
 */
export interface ValidationStrategies {
  [strategy: string]: ValidationStrategy,

  all: ValidationStrategy,
  some: ValidationStrategy,
  one: ValidationStrategy,
  none: ValidationStrategy
}
