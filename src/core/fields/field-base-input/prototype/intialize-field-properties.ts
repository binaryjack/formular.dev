import { IFieldDescriptor } from '@dependency/schema/descriptor/field.descriptor'
import { createAccessor } from '../accessors/accessors'
import { IFieldInput } from '../field-input-base-types'

export const initializeFieldProperties = function (
    this: IFieldInput,
    descriptor: IFieldDescriptor
) {
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

    const fieldAccessors = createAccessor(this)
    this.dom = fieldAccessors.dom
    this.drawer = fieldAccessors.drawer
    this.notifier = fieldAccessors.notifier
    this.style = fieldAccessors.style
    this.track = fieldAccessors.track
    this.validationStrategy = fieldAccessors.validationStrategy
    this.valueStrategy = fieldAccessors.valueStrategy
    this.setValue = fieldAccessors.setValue
    this.getValue = fieldAccessors.getValue
}
