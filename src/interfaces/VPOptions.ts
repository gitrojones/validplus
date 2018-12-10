import { VerticalPosition } from '@/enums/Position'
import ValidationRules from '@/interfaces/ValidationRules'
import ValidationLifecycle from '@/interfaces/ValidationLifecycle'
import ValidationStrategy from './ValidationStrategy';

export interface VPOptions {
  // ControlFlow
  Watch: boolean,
  Lifecycle: ValidationLifecycle,

  // ClassNames
  ClassName: string,
  ErrorClassName: string,
  ValidClassName: string

  // Messaging
  MessageAnchor: HTMLElement,
  MessagePOS: VerticalPosition,
  ScrollTo: boolean,
  ScrollAnchor: HTMLElement
}

export interface VPValidatorOptions extends VPOptions {
  // ControlFlow
  ValidateLazy: boolean,
  ValidateVisible: boolean,
  ValidationInputs: string[] // Names of elements to consider Inputs (for supporting custom Elements)
}
export interface VPFieldsetOptions extends VPOptions {
  // ControlFlow
  ValidateVisible: boolean,

  // ValidationOptions
  FieldClass: string,
  ValidationStrategy: ValidationStrategy
}
export interface VPFieldOptions extends VPOptions {
  // ControlFlow
  ValidateOn: {
    blur: boolean, // When we lose focus
    change: boolean, // When the element is updated
    mouseleave: boolean // When the element loses the mouse (For visual controls)
  },

  // ValidationOptions
  ForceRules: boolean,
  InputFormatter: { pre: (innerHTML: string) => string, post: (innerHTML: string) => string },
  InputRules: ValidationRules.Input,
  CustomRules: ValidationRules.Custom[],

  // Messaging
  ShowFieldErrors: boolean
}