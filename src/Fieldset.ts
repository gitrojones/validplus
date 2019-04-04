import { debug } from '@/util/debug'
import { hasAsync } from '@/util/hasAsync'
import { mergeDeep } from '@/util/mergeDeep'

import { VPFieldsetOptions, VPFieldOptions } from '@/interfaces/VPOptions'
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy'
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle'
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule'

import { VPField } from '@/Field'
import { Validatable } from '@/Validatable'

export class VPFieldset extends Validatable {
  $options: VPFieldsetOptions = this.$options
  $strategy: ValidationStrategy
  $fields: VPField[]
  get $visibleFields (): VPField[] {
    return this.$fields.filter((field: VPField) => {
      return this.isElementVisible(field.$element)
    })
  }

  constructor (
    element: HTMLElement,
    strategy: string | ValidationStrategy,
    options: VPFieldsetOptions,
    onValidate: ValidationLifecycle
  ) {
    super(options, element)

    let validationStrategy = strategy
    if (typeof strategy === 'string') {
      validationStrategy = this.$strategies[strategy]
    }
    if (typeof validationStrategy !== 'function') {
      throw new Error('[VPFieldset] Expected ValidationStrategy to be a function.')
    }

    mergeDeep(this.$options, {
      ValidationStrategy: validationStrategy,
      ValidateVisible: true,
      FieldClass: 'VPField'
    }, options)

    this.setLifecycle(onValidate)
    this.$strategy = this.$options.ValidationStrategy
    this.$fields = []
  }

  isValid (): (boolean | Promise<boolean>) {
    const fields = this.$options.ValidateVisible
      ? this.$visibleFields
      : this.$fields

    const fieldsetStatus = fields.reduce((status: (boolean | Promise<boolean>)[], field: VPField, index: number) => {
      debug('[VPFieldset] Validating field', index)
      status.push(field.isValid())

      return status
    }, [])

    if (hasAsync(fieldsetStatus)) {
      let deferredFieldsetStatus = fieldsetStatus.map((status: (boolean | Promise<boolean>)) => {
        if (typeof status === 'boolean') {
          return Promise.resolve(status)
        // tslint:disable-next-line: strict-type-predicates
        } else if (typeof status.then === 'function') {
          return status
        } else {
          throw new Error('[VPFieldset] Unexpected Fieldset Status Type')
        }
      })

      return new Promise((resolve) => {
        Promise.all(deferredFieldsetStatus)
          .then((fieldsetStatus) => {
            this.$isValid = this.$strategy(fieldsetStatus)
            return resolve(this.$isValid)
          })
          .catch((err) => {
            console.error('[VPFieldset] Failed to resolve deferred FieldSet Status', err)
            this.$isValid = false
            return resolve(this.$isValid)
          })
      })
    } else {
      this.$isValid = this.$strategy(fieldsetStatus as boolean[])
      return this.$isValid
    }
  }

  removeField (field: VPField) {
    if (!(field instanceof VPField)) {
      throw new Error('[VPFieldset] Field must be an instanceof VPField')
    }

    const index = this.$fields.indexOf(field)
    if (index !== -1) {
      this.$fields = this.$fields.splice(index, 1)
    }
  }

  watchField (field: VPField) {
    if (!(field instanceof VPField)) {
      throw new Error('Field must be an instance of VPField')
    }

    // TODO: Optimize by tracking state and only revalidating
    // if internal state changes. Currently wasteful
    field.addEventListener('onValidate', () => {
      const valid = this.isValid()
      const emit = this.$isValid !== null

      if (emit) {
        this.dispatchEvent(this.createEvent('onValidate'), valid)
      }
    })
  }

  addField (field: VPField) {
    if (!(field instanceof VPField)) {
      throw new Error('[VPFieldset] Field must be an instanceof VPField')
    }
    debug('[VPFieldset] Adding field')

    this.$fields.push(field)
    if (this.$options.Watch === true) {
      this.watchField(field)
    }
  }

  createField (
    el: HTMLElement,
    options: VPFieldOptions,
    customRules: CustomValidationRule[],
    onValidate: ValidationLifecycle
  ) {
    if (!(el instanceof Element)) {
      throw new Error('[VPFieldset] Field Element must be a valid DOMElement.')
    }

    const field = new VPField(el, options, customRules, onValidate)
    this.$fields.push(field)
    if (this.$options.Watch === true) {
      this.watchField(field)
    }

    return field
  }

  findFields () {
    let fields = Array.from(
      this.$element.getElementsByClassName(this.$options.FieldClass)
    )

    // TODO: Attribute parsing to fill in the gaps
    this.$fields = fields.map((field: Element) => {
      const _field = new VPField(
        field as HTMLElement,
        {} as VPFieldOptions,
        [] as CustomValidationRule[],
        { Valid: {}, Invalid: {} } as ValidationLifecycle)
      if (this.$options.Watch === true) {
        this.watchField(_field)
      }

      return _field
    })
  }
}
