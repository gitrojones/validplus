import { VPOptions } from '@/interfaces/VPOptions'

import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'
import { ValidInput } from '@/types/ValidInput'
import { VerticalPosition } from '@/enums/Positions'
import { cloneDeep } from 'lodash'
import { debug } from '@/util/debug'

export class ValidatableOptions implements VPOptions {
  $options: VPOptions

  // ControlFlow
  Watch: boolean = true
  Lifecycle: ValidationLifecycle = {
    Valid: {
      CB: [],
      Message: ''
    },
    Invalid: {
      CB: [],
      Message: ''
    }
  }

  // ClassNames
  ErrorClassName: string = '-isError'
  ValidClassName: string = '-isValid'

  // Input Controller
  PrimaryInput: (null | ValidInput) = null
  PrimaryInputIndex: number = 0
  PrimaryInputType: (null | string) = null
  InputTypes: ('select' | 'input' | 'textarea')[] = ['select', 'input', 'textarea']

  // Messaging
  MessageClassName: string = 'VPMessage'
  MessageContainerClassName: string = 'VPMessages'
  MessagePOS: VerticalPosition = VerticalPosition.bottom
  ScrollTo: boolean = true
  MessageAnchor: (HTMLElement | null) = null
  ScrollAnchor: (HTMLElement | null) = null

  constructor (options: VPOptions, element: (HTMLElement | null) = null) {
    this.$options = cloneDeep(options)
    Object.assign(this, options)

    if (!(options.MessageAnchor instanceof HTMLElement) && element instanceof HTMLElement) {
      debug('[ValidatableOptions] Setting MessageAnchor to root element')
      this.MessageAnchor = element
    } else if (element instanceof HTMLElement) {
      this.MessageAnchor = element
    }

    if (!(options.ScrollAnchor instanceof HTMLElement) && element instanceof HTMLElement) {
      debug('[ValidatableOptions] Setting ScrollAnchor to root element')
      this.ScrollAnchor = element
    } else if (element instanceof HTMLElement) {
      this.ScrollAnchor = element
    }
  }
}
