import { VerticalPosition } from 'src/enums/Positions'
import { HTMLValidationRules } from 'src/interfaces/validation/HTMLValidationRules'
import { CustomValidationRule } from 'src/interfaces/validation/CustomValidationRule'
import { ValidationLifecycle } from 'src/interfaces/validation/ValidationLifecycle'
import {ValidationStrategy, ValidationStrategyNames} from 'src/interfaces/validation/ValidationStrategy'
import { InputFormatters } from 'src/interfaces/InputFormatters'
import { ChangeActions } from 'src/interfaces/events/ChangeActions'
import { ValidInput } from 'src/types/ValidInput'

import { ValidatableOptions } from 'src/models/VPOptions/ValidatableOptions';

export interface VPOptions {
  [property: string]: any,

  // ControlFlow
  Watch: boolean, // Emit upwards if anything changes
  Lifecycle: ValidationLifecycle,

  // ClassNames
  ErrorClassName: string,
  ValidClassName: string

  // Input Controller
  PrimaryInput: (null | ValidInput),
  PrimaryInputIndex: number,
  PrimaryInputType: (null | string),
  InputTypes: ('select' | 'input' | 'textarea')[],

  // Messaging
  MessageClassName: string,
  MessageContainerClassName: string,
  MessageAnchor: (HTMLElement | null),
  MessagePOS: VerticalPosition,
  ScrollTo: boolean,
  ScrollAnchor: (HTMLElement | null)
}

export interface VPValidatorOptions extends ValidatableOptions, VPOptions {
  // ControlFlow
  ValidateLazy: boolean,
  ValidateVisible: boolean,
}
export interface VPFieldsetOptions extends ValidatableOptions, VPOptions {
  // ControlFlow
  ValidateVisible: boolean,

  // ValidationOptions
  FieldClass: string,
  ValidationStrategy: (ValidationStrategyNames|ValidationStrategy)
}
export interface VPFieldOptions extends ValidatableOptions, VPOptions {
  // ControlFlow
  ValidateOn: ChangeActions,
  DirtyOn: ChangeActions,
  FormatOn: ChangeActions,

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
