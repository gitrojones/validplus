import {VPField} from 'src/Field'

export interface ValidationStrategy {
  (fieldstatus: boolean[], fields: VPField[]): boolean
}

export type ValidationOption = ValidationStrategyNames | ValidationStrategy;
export type ValidationStrategyNames = 'all' | 'some' | 'one' | 'none';
export interface ValidationStrategies {
  [strategy: string]: ValidationStrategy,

  all: ValidationStrategy,
  some: ValidationStrategy,
  one: ValidationStrategy,
  none: ValidationStrategy
}
