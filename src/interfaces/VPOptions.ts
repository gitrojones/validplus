import { VerticalPosition } from '@/enums/Positions'
import { HTMLValidationRules } from '@/interfaces/validation/HTMLValidationRules'
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule'
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy'
import { InputFormatters } from '@/interfaces/inputFormatters'

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
  MessageContainerClassName: string,
  MessageAnchor: HTMLElement,
  DeferredMessageAnchor: boolean,
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
  DirtyOnBlur: boolean,

  // ValidationOptions
  ForceRules: boolean,
  InputFormatter: InputFormatters,
  InputRules: HTMLValidationRules,
  CustomRules: CustomValidationRule[],

  // Messaging
  ShowFieldRuleErrors: boolean,
  ShowCustomRuleErrors: boolean,
  ValidateLazyFieldRules: boolean,
  ValidateLazyCustomRules: boolean
}
