export interface ValidationStrategy {
    (fieldstatus: boolean[]): boolean;
}
export declare type ValidationOption = ValidationStrategyNames | ValidationStrategy;
export declare type ValidationStrategyNames = 'all' | 'some' | 'one' | 'none';
export interface ValidationStrategies {
    [strategy: string]: ValidationStrategy;
    all: ValidationStrategy;
    some: ValidationStrategy;
    one: ValidationStrategy;
    none: ValidationStrategy;
}
