import { VerticalPosition } from '@/enums/Positions'
import { HTMLValidationRules } from '@/interfaces/validation/HTMLValidationRules'
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule'
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy'
import { InputFormatters } from '@/interfaces/inputFormatters'

export interface VPOptions {
  // ControlFlow
  Watch: boolean, // Emit upwards if anything changes
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
    [index: string]: boolean,
    blur: boolean, // When we lose focus
    input: boolean, // Element changed
    change: boolean, // When the element is updated
    mouseleave: boolean // When the element loses the mouse (For visual controls)
  },

  DirtyOn: {
    [index: string]: boolean,
    blur: boolean, // When we lose focus
    input: boolean, // Element changed
    change: boolean, // When the element is updated
    mouseleave: boolean // When the element loses the mouse (For visual controls)
  },

  FormatOn: {
    [index: string]: boolean,
    blur: boolean, // When we lose focus
    input: boolean, // Element changed
    change: boolean, // When the element is updated
    mouseleave: boolean // When the element loses the mouse (For visual controls)
  },

  // ValidationOptions
  ForceRules: boolean,
  InputFormatter: InputFormatters,
  InputRules: HTMLValidationRules,
  CustomRules: CustomValidationRule[],
  ValidateAsyncResolved: boolean,

  // Messaging
  ShowFieldRuleErrors: boolean,
  ShowCustomRuleErrors: boolean,
  ValidateLazyFieldRules: boolean,
  ValidateLazyCustomRules: boolean
}
