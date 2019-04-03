export interface HTMLValidationRules {
    required: (boolean | null);
    min?: number;
    max?: number;
    minlength?: number;
    maxlength?: number;
    pattern?: RegExp;
}
