export default interface HTMLValidationRules {
  required: boolean,
  // All below depend on upon being required
  min?: number,
  max?: number,
  minlength?: number,
  maxlength?: number,
  pattern?: RegExp
}
