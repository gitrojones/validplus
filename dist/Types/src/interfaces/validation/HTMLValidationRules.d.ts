export interface HTMLValidationRules {
    required: (boolean | null);
    min?: string;
    max?: string;
    minlength?: number;
    maxlength?: number;
    pattern?: RegExp;
}
