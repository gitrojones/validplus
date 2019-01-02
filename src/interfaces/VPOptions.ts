import { VerticalPosition } from '@/enums/Positions'
import ValidationRules from '@/interfaces/HTMLValidationRules'
import CustomValidationRule from '@/interfaces/CustomValidationRule'
import AsyncCustomValidationRule from '@/interfaces/AsyncCustomValidationRule'
import ValidationLifecycle from '@/interfaces/ValidationLifecycle'
import ValidationStrategy from './ValidationStrategy'

export interface VPOptions {
  // ControlFlow
  Watch: boolean,
  Lifecycle: ValidationLifecycle,

  // ClassNames
  ClassName: string,
  ErrorClassName: string,
  ValidClassName: string

  // Messaging
  MessageClassName: string,
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
  InputRules: ValidationRules,
  CustomRules: (CustomValidationRule | AsyncCustomValidationRule)[],

  // Messaging
  ShowFieldErrors: boolean
}