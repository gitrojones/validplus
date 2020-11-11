export interface HTMLValidationRules {
  required: (boolean | null),
  // All below depend on upon being required
  min?: string,
  max?: string,
  minlength?: number,
  maxlength?: number,
  pattern?: RegExp
}
