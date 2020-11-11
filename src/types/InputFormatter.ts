import { EventBuilderHelper } from './events/EventBuilderHelper'

/**
 * Input formatter
 * @description
 * Standard interface formatters are provided. Returned value will be applied to the input value.
 *
 * __NOTE:__ We internally dispatch the necessary events to be compatible w/ most libraries.
 * You may alternatively dispatch your own events on the $input using the dispatchEvent helper.
 */
export type InputFormatter = (value: unknown, input: HTMLElement, dispatchEvent: EventBuilderHelper) => string
