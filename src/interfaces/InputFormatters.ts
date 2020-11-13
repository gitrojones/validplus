import { InputFormatter } from 'src/types/InputFormatter'

/**
 * Input Formatter Interface
 * @category Interfaces
 * @description
 * Formats input value based on these provided formatters.
 */
export interface InputFormatters {
  /**
   * Pre formatter
   * @description
   * The Pre formatter is called prior to the validation cycle. This formatter
   * is responsible for preparing the visible value for validation. Common use-cases
   * would include stripping special formatting provided by the post formatter for strings,
   * or enforcing a specific value length or bound.
   */
  pre?: InputFormatter,

  /**
   * Post formatter
   * @description
   * The Post formatter is called following the validation cycle. This formatter is responsible for
   * applying pretty formatting for output values. Examples include masking a phone number or currency
   * value w/ helpful formatting, such as "(555) 444-5555" (5554445555) or $3.50 (3.50)
   */
  post?: InputFormatter,
}
