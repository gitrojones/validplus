export interface HTMLValidationRules {
  required: (boolean | null),
  // All below depend on upon being required
  min?: number,
  max?: number,
  minlength?: number,
  maxlength?: number,
  pattern?: RegExp
}
