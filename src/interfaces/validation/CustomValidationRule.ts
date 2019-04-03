import { ValidationAttributes } from '@/interfaces/validation/ValidationAttributes'

export interface CustomValidationRule {
  (
    inputAttributes: ValidationAttributes,
    element: HTMLElement,
    input: HTMLInputElement
  ): boolean | Promise<boolean>,
}
