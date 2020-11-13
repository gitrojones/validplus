/**
 * Standard HTML Validation Rules
 * @category Interfaces
 * @description
 * The standard HTML5 validation rules we support for basic validation
 */
export interface HTMLValidationRules {
    /** Input is required */
    required: (boolean | null);
    /** Input must be at least this */
    min?: string;
    /** Input must be at most this */
    max?: string;
    /** Input must be at least this long */
    minlength?: number;
    /** Input must be at most this long */
    maxlength?: number;
    /** Input must match this pattern */
    pattern?: RegExp;
}
