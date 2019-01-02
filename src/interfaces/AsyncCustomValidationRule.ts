export default interface AsyncCustomValidationRule {
  (innerHTML: string): Promise<boolean>
}
