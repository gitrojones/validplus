import { debug } from '@/util/debug'
import { hasAsync } from '@/util/hasAsync'
import { isAsync } from '@/util/isAsync'

import { VPFieldsetOptions, VPFieldOptions } from '@/interfaces/VPOptions'
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy'
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule'

import { VPField } from '@/Field'
import { Validatable } from '@/Validatable'

import { FieldsetOptions } from '@/models/VPOptions/FieldsetOptions'

export class VPFieldset extends Validatable {
  static Options = FieldsetOptions

  // noinspection ES6ClassMemberInitializationOrder
  $options: VPFieldsetOptions = this.$options
  $strategy: ValidationStrategy
  $fields: VPField[]
  $emitFields: VPField[]
  $fieldWatch = (_e: Event, trigger: VPField) => {
    _e.stopPropagation()
    this.$emitFields.push(trigger)

    this.isValid(false)
  }

  get $visibleFields (): VPField[] {
    return this.$fields.filter((field: VPField) => {
      return this.isElementVisible(field.$element)
    })
  }

  constructor (
    element: HTMLElement,
    strategy: (string | ValidationStrategy),
    options: (VPFieldsetOptions | object),
    onValidate: (ValidationLifecycle | undefined) = undefined
  ) {
    super(new VPFieldset.Options(options, element), element)

    if (!(element instanceof HTMLElement)) {
      throw new Error('[VPFieldset] Expected element')
    }

    let validationStrategy = strategy
    if (typeof strategy === 'string') {
      validationStrategy = this.$strategies[strategy]
    }
    if (typeof validationStrategy !== 'function') {
      throw new Error('[VPFieldset] Expected ValidationStrategy to be a function.')
    }

    this.$options.ValidationStrategy = this.$strategy = validationStrategy

    if (onValidate) {
      this.setLifecycle(onValidate)
    }

    this.$fields = []
    this.$emitFields = []
  }

  isValid (validateDirty: boolean = true): (boolean | Promise<boolean>) {
    this.clearMessages()
    let fields = (this.$options.ValidateVisible
      ? this.$visibleFields
      : this.$fields).filter((field, index) => {
        let validate = true

        // Don't validate dirty fields
        if (!validateDirty && !field.$dirty) {
          debug('[VPFieldset] Skip dirty field', index)
          validate = false
        }

        return validate
      })

    const fieldsetStatus: (boolean | Promise<boolean>)[] = fields
      .map((field: VPField, index: number) => {
        debug('[VPFieldset] Validating field', index)

        // We already validated this, just take the value
        let valid: (boolean | Promise<boolean>)
        if (this.$emitFields.indexOf(field) !== -1 && typeof field.$valid === 'boolean') {
          debug('[VPFieldset] Cached Valid', index)
          valid = field.$valid
        } else {
          // Concat to the emitFields watch to prevent
          // further loops of validation as they trigger
          this.$emitFields.push(field)
          valid = this.assertValidNoWatch(field)
        }

        return valid
      })

    if (hasAsync(fieldsetStatus)) {
      let deferredFieldsetStatus = fieldsetStatus.map((status: (boolean | Promise<boolean>)) => {
        if (isAsync(status)) return status
        else return Promise.resolve(status as boolean)
      })

      return new Promise((resolve) => {
        Promise.all(deferredFieldsetStatus)
          .then((fieldsetStatus) => {
            debug('[VPFieldset] Resolved deferred', fieldsetStatus)
            this.$isValid = this.$strategy(fieldsetStatus)
            this.$emitFields = []
            return resolve(this.$isValid)
          })
          .catch((err) => {
            debug('[VPFieldset] Failed to resolve deferred FieldSet Status', err)
            this.$isValid = false
            this.$emitFields = []
            return resolve(this.$isValid)
          })
      })
    } else {
      this.$isValid = this.$strategy(fieldsetStatus as boolean[])
      this.$emitFields = []
      return this.$isValid
    }
  }

  removeField (field: VPField) {
    // noinspection SuspiciousTypeOfGuard
    if (!(field instanceof VPField)) {
      throw new Error('[VPFieldset] Field must be an instanceof VPField')
    }

    const index = this.$fields.indexOf(field)
    if (index !== -1) {
      let field = this.$fields.splice(index, 1).pop()
      if (field) {
        field.clearMessages()
        field.removeMessageNode()
        field.removeEventListener('onValidate', this.$fieldWatch)
      }

      return field
    }

    return null
  }

  watchField (field: VPField) {
    // noinspection SuspiciousTypeOfGuard
    if (!(field instanceof VPField)) {
      throw new Error('Field must be an instance of VPField')
    }

    // TODO: Optimize by tracking state and only revalidating
    // if internal state changes. Currently wasteful
    field.addEventListener('onValidate', this.$fieldWatch)
  }

  addField (field: VPField) {
    // noinspection SuspiciousTypeOfGuard
    if (!(field instanceof VPField)) {
      throw new Error('[VPFieldset] Field must be an instanceof VPField')
    }
    debug('[VPFieldset] Adding field')

    this.$fields.push(field)
    this.watchField(field)
  }

  createField (
    el: HTMLElement,
    options: (VPFieldOptions | object),
    customRules: CustomValidationRule[],
    onValidate: (ValidationLifecycle | undefined) = undefined
  ) {
    if (!(el instanceof Element)) {
      throw new Error('[VPFieldset] Field Element must be a valid DOMElement.')
    }

    const field = new VPField(el, options, customRules || [], onValidate)
    this.$fields.push(field)
    this.watchField(field)

    return field
  }

  findFields (fieldOptions: (VPFieldOptions | VPFieldOptions[]) = {} as VPFieldOptions) {
    let fields = Array.from(
      this.$element.getElementsByClassName(this.$options.FieldClass)
    )

    // TODO: Attribute parsing to fill in the gaps
    this.$fields = fields.map((field: Element, index: number) => {
      const options: VPFieldOptions = Array.isArray(fieldOptions) ? fieldOptions[index] : fieldOptions
      const _field = new VPField(
        field as HTMLElement, options,
        [] as CustomValidationRule[],
        { Valid: {}, Invalid: {} } as ValidationLifecycle)
      this.watchField(_field)

      return _field
    })
  }
}
