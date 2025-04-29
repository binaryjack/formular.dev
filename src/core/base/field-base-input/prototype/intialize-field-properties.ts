import { IFieldDescriptor } from '../../../../dependency/schema/descriptor/field.descriptor'
import { consoleTrackingProvider } from '../../tracker/tracker.default.provider'
import { IFieldInput } from '../field-input-base-types'

export const initializeFieldProperties = function (
    this: IFieldInput,
    descriptor: IFieldDescriptor
) {
    /** setup the internal information (info, warning, error etc.) tracking this is not the EVENT TRACKING! */
    this.outputProviderSetup([consoleTrackingProvider])

    this.id = descriptor.id
    this.name = descriptor.name
    this.label = descriptor.label
    this.value = descriptor.value ?? descriptor.defaultValue
    this.originalValue = descriptor.value ?? descriptor.defaultValue
    this.defaultValue = descriptor.defaultValue
    this.objectValue = descriptor.objectValue
    this.type = descriptor.type
    this.options = descriptor.options
    this.target = descriptor.target
    this.isValid = descriptor.isValid ?? true
    this.isDirty = descriptor.isDirty ?? false
    this.isPristine = descriptor.isPristine ?? true
    this.isFocus = descriptor.isFocus ?? false
    this.expectedValue = descriptor.expectedValue
    this.loaded = descriptor.loaded ?? false
    this.changed = descriptor.changed ?? false
}
