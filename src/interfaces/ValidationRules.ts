export interface Input {
  required: boolean,
  // All below depend on upon being required
  min?: number,
  max?: number,
  minlength?: number,
  maxlength?: number,
  pattern?: RegExp
}

// Async
export interface Custom {
  (innerHTML: string): Promise<boolean>
}

// Sync
export interface Custom {
  (InnerHTML: string) : boolean
}