import { debug } from 'src/util/debug'
import { hasAsync } from 'src/util/hasAsync'
import { isAsync } from 'src/util/isAsync'

import { VPFieldsetOptions, VPFieldOptions } from 'src/interfaces/VPOptions'
import { ValidationStrategy } from 'src/interfaces/validation/ValidationStrategy'

import { VPField } from 'src/Field'
import { Validatable } from 'src/Validatable'

import { FieldsetOptions } from 'src/models/VPOptions/FieldsetOptions'

export class VPFieldset extends Validatable {
  static Options = FieldsetOptions;

  $strategy: ValidationStrategy
  $fields: VPField[]
  $emitFields: VPField[]

  get $visibleFields (): VPField[] {
    return this.$fields.filter((field: VPField) => {
      return this.isElementVisible(field.$element)
    })
  }

  constructor (element: HTMLElement, options: VPFieldsetOptions = {} as VPFieldsetOptions) {
    super(element, new VPFieldset.Options(options, element) as VPFieldsetOptions)

    if (!(element instanceof HTMLElement)) {
      throw new Error('[VPFieldset] Expected element')
    }

    let validationStrategy = this.$options.ValidationStrategy;
    if (typeof validationStrategy === 'string') {
      validationStrategy = this.$strategies[validationStrategy];
    }
    if (typeof validationStrategy !== 'function') {
      throw new Error('[VPFieldset] Expected ValidationStrategy to be a function.')
    }
    this.$strategy = validationStrategy;

    this.$fields = []
    this.$emitFields = []
  }

  $fieldWatch (_e: Event, trigger: VPField): void {
    _e.stopPropagation()
    this.$emitFields.push(trigger)

    this.isValid(false)
  }

  isValid (validateDirty = true): (boolean | Promise<boolean>) {
    this.clearMessages()
    const fields = (this.$options.ValidateVisible
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
          const originalWatchValue = field.$options.Watch
          // Concat to the emitFields watch to prevent
          // further loops of validation as they trigger
          this.$emitFields.push(field)
          field.$options.Watch = false
          valid = field.isValid()
          if (isAsync(valid)) {
            valid = new Promise((resolve, reject) => {
              return (valid as Promise<boolean>).then((isValid) => {
                field.$options.Watch = originalWatchValue
                resolve(isValid)
              }).catch((err) => {
                field.$options.Watch = originalWatchValue
                reject(err)
              })
            })
          } else {
            field.$options.Watch = originalWatchValue
          }
        }

        return valid
      })

    if (hasAsync(fieldsetStatus)) {
      const deferredFieldsetStatus = fieldsetStatus.map((status: (boolean | Promise<boolean>)) => {
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

  removeField (field: VPField): (VPField | undefined) {
    debug('[VPFieldset] Removing field', field)

    const index = this.$fields.indexOf(field)
    if (index !== -1) {
      const field = this.$fields.splice(index, 1).pop()
      if (field) {
        field.clearMessages()
        field.removeMessageNode()
        field.removeEventListener('onValidate', this.$fieldWatch)
      }

      return field;
    }

    return;
  }

  watchField (field: VPField): void {
    debug('[VPFieldset] Watching field', field)

    // TODO: Optimize by tracking state and only revalidating
    //       if internal state changes. Currently wasteful.
    field.addEventListener('onValidate', this.$fieldWatch)
  }

  addField (field: VPField): void {
    debug('[VPFieldset] Adding field', field)

    this.$fields.push(field)
    this.watchField(field)
  }

  createField (el: HTMLElement, options: VPFieldOptions): VPField {
    if (!(el instanceof Element)) {
      throw new Error('[VPFieldset] Field Element must be a valid DOMElement.')
    }

    const field = new VPField(el, options)
    this.$fields.push(field)
    this.watchField(field)

    return field
  }

  findFields (fieldOptions: (VPFieldOptions | VPFieldOptions[]) = {} as VPFieldOptions) : void {
    const fields = Array.from(this.$element.getElementsByClassName(this.$options.FieldClass))

    this.$fields = fields.map((field: Element, index: number) => {
      const options: VPFieldOptions = Array.isArray(fieldOptions) ? fieldOptions[index] : fieldOptions
      const _field = new VPField(field as HTMLElement, options);
      this.watchField(_field)

      return _field
    });
  }
}
