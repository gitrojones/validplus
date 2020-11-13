import { EventBuilderHelper } from './events/EventBuilderHelper';
/**
 * Input formatter
 * @category Types
 * @description
 * Standard interface formatters are provided. Returned value will be applied to the input value.
 *
 * __NOTE:__ We internally dispatch the necessary events to be compatible w/ most libraries.
 * You may alternatively dispatch your own events on the $input using the dispatchEvent helper.
 */
export declare type InputFormatter = (
/** The current value of the input */
value: unknown, 
/** The input element being formatted */
input: HTMLElement, 
/** Helper for dispatching events on the input */
dispatchEvent: EventBuilderHelper) => string;
