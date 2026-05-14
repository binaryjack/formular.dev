import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IInputBase } from '../input-base.types'

export const initializeProperties = function (this: IInputBase, descriptor: IFieldDescriptor) {
    this.id = descriptor.id
    this.name = descriptor.name
    this.label = descriptor.label
    this.value = descriptor.value ?? descriptor.defaultValue
    this.originalValue = descriptor.value ?? descriptor.defaultValue
    this.defaultValue = descriptor.defaultValue
    this.objectValue = descriptor.objectValue
    this.type = descriptor.type
    this.target = descriptor.target
    this.isValid = descriptor.isValid ?? true
    this.isDirty = descriptor.isDirty ?? false
    this.isPristine = descriptor.isPristine ?? true
    this.isFocus = descriptor.isFocus ?? false
    this.expectedValue = descriptor.expectedValue
    this.loaded = descriptor.loaded ?? false
    this.changed = descriptor.changed ?? false

    // Bridge descriptor.validationOptions → input.validationOptions
    // Without this the validation strategies never see minLength/maxLength/pattern/required.
    if (descriptor.validationOptions && Object.keys(descriptor.validationOptions).length > 0) {
        this.validationOptions = descriptor.validationOptions
    }

    // Apply field-specific debounce delay if provided
    // These will be set again in the constructor, but we need to set them here
    // to ensure they're not overwritten by global config
    if (descriptor.debounceDelay !== undefined) {
        this.inputDelay = descriptor.debounceDelay
        this.onValidateDelay = descriptor.debounceDelay
        this.onUiUpdateDelay = descriptor.debounceDelay
        this.observablesDelay = descriptor.debounceDelay
    }
}
