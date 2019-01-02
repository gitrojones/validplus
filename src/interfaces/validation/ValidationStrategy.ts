export default interface ValidationStrategy {
  (fieldstatus: boolean[]): boolean
}

export interface ValidationStrategies {
  [strategy: string]: ValidationStrategy,

  all: ValidationStrategy,
  some: ValidationStrategy,
  one: ValidationStrategy,
  none: ValidationStrategy
}
