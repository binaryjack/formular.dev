import { IFieldDescriptor } from '../../../../dependency/schema/descriptor/field.descriptor'
import { FieldStateStyle } from '../../fieldStateStyle/FieldStateStyle'
import { IFieldInput } from '../fieldInput.types'

const defaultFieldInputCSSClassName = 'f-input'

export const initializeProperties = function (this: IFieldInput, descriptor: IFieldDescriptor) {
    this.id = descriptor.id
    this.optionsInitialized = false
    this.name = descriptor.name
    this.label = descriptor.label
    this.value = descriptor.value ?? descriptor.defaultValue
    this.originalValue = descriptor.value ?? descriptor.defaultValue
    this.defaultValue = descriptor.defaultValue
    this.objectValue = descriptor.objectValue
    this.type = descriptor.type
    /* Should be used when the input is the entry point for the field value */
    this.options = descriptor.options
    this.target = descriptor.target
    this.validationResults = []
    this.isValid = descriptor.isValid ?? true
    this.isDirty = descriptor.isDirty ?? false
    this.isPristine = descriptor.isPristine ?? true
    this.isFocus = descriptor.isFocus ?? false
    this.expectedValue = descriptor.expectedValue
    this.loaded = descriptor.loaded ?? false
    this.changed = descriptor.changed ?? false
    this.shouldValidate = descriptor.shouldValidate ?? true
    this.fieldStateStyle = new FieldStateStyle()
    this.className = defaultFieldInputCSSClassName
    this.openState = 'closed'
    this.checked = undefined
}
