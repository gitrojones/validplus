import ValidationAttributes from '@/interfaces/validation/ValidationAttributes'

export default interface CustomValidationRule {
  (
    inputAttributes: ValidationAttributes,
    element: HTMLElement,
    input: HTMLInputElement
  ): boolean | Promise<boolean>,
}
