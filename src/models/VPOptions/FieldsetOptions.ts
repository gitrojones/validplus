import { VPFieldsetOptions, VPOptions } from '@/interfaces/VPOptions'
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy'

import { ValidatableOptions } from './ValidatableOptions'
import { cloneDeep } from 'lodash'

export class FieldsetOptions extends ValidatableOptions implements VPFieldsetOptions {
  $options: VPOptions

  // ControlFlow
  ValidateVisible: boolean = true
  // ValidationOptions
  FieldClass: string = 'VPField'
  ValidationStrategy: (ValidationStrategy | null) = null
  Watch: boolean = false

  constructor (options: (VPFieldsetOptions | object), element: (HTMLElement | null) = null) {
    super(cloneDeep(options) as VPOptions, element)
    this.$options = options as VPFieldsetOptions

    Object.assign(this, options)
  }
}
