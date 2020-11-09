import {VerticalPosition} from 'src/enums/Positions'
import {HTMLValidationRules} from 'src/interfaces/validation/HTMLValidationRules'
import {CustomValidationRule} from 'src/interfaces/validation/CustomValidationRule'
import {ValidationLifecycle} from 'src/interfaces/validation/ValidationLifecycle'
import {ValidationOption} from 'src/interfaces/validation/ValidationStrategy'
import {InputFormatters} from 'src/interfaces/InputFormatters'
import {ChangeActions} from 'src/interfaces/events/ChangeActions'
import {ValidInput} from 'src/types/ValidInput'
import {ValidatorOptions} from 'src/models/VPOptions/ValidatorOptions'
import {FieldsetOptions} from 'src/models/VPOptions/FieldsetOptions'
import {FieldOptions} from 'src/models/VPOptions/FieldOptions'
import {ValidatableOptions} from 'src/models/VPOptions/ValidatableOptions'

export interface VPOptions<T extends ValidatableOptions<T>> {
  // ControlFlow
  Watch?: boolean, // Emit upwards if anything changes
  Lifecycle?: ValidationLifecycle<T>,
  Validator?: (Element|null),

  // ClassNames
  ErrorClassName?: string,
  ValidClassName?: string

  // Messaging
  MessageClassName?: string,
  MessageContainerClassName?: string,
  MessageAnchor?: (HTMLElement | null),
  MessagePOS?: VerticalPosition,
  ScrollTo?: boolean,
  ScrollAnchor?: (HTMLElement | null)
  ScrollOptions?: (ScrollIntoViewOptions|boolean)
}

export interface VPValidatorOptions extends VPOptions<ValidatorOptions> {
  // Setup
  FindFieldsets?: boolean,
  FieldsetClass?: string;

  // ControlFlow
  ValidateLazy?: boolean,
  ValidateVisible?: boolean,
}
export interface VPFieldsetOptions extends VPOptions<FieldsetOptions> {
  // Setup
  FindFields?: boolean,
  FieldClass?: string,
  // ControlFlow
  ValidateVisible?: boolean,
  // ValidationOptions
  ValidationStrategy?: ValidationOption,
}
export interface VPFieldOptions extends VPOptions<FieldOptions> {
  // ControlFlow
  ValidateOn?: ChangeActions,
  DirtyOn?: ChangeActions,
  FormatOn?: ChangeActions,

  // ValidationOptions
  ForceRules?: boolean,
  InputFormatter?: InputFormatters,
  InputRules?: HTMLValidationRules,
  CustomRules?: CustomValidationRule[],
  ValidateAsyncResolved?: boolean,

  // Input Controller
  PrimaryInput?: (null | ValidInput),
  PrimaryInputIndex?: number,
  PrimaryInputType?: (null | string),
  InputTypes?: ('select' | 'input' | 'textarea')[],

  // Messaging
  ShowFieldRuleErrors?: boolean,
  ShowCustomRuleErrors?: boolean,
  ValidateLazyFieldRules?: boolean,
  ValidateLazyCustomRules?: boolean
}
