import { HTMLValidationRules } from 'src/interfaces/validation/HTMLValidationRules';
export interface ValidationAttributes {
    value: string;
    checked: boolean;
    type: string | null;
    title: string;
    name: string;
    rules: HTMLValidationRules;
}
