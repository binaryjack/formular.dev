import { handleValidation } from '@core/formy-base/prototype/handle-validation'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'

import { IField, IFieldInput } from './field-input-base-types'
import { clear } from './prototype/clear'
import { enable } from './prototype/enable'
import { handleOnBlur } from './prototype/handle-on-blur'
import { handleOnClear } from './prototype/handle-on-clear'
import { handleOnFocus } from './prototype/handle-on-focus'
import { hasChanges } from './prototype/has-changes'
import { initializeDommable } from './prototype/initialize-dommable'
import { initializeTracking } from './prototype/initialize-tracking'
import { initializeValidationStrategy } from './prototype/initialize-validation-strategy'
import { initializeValueStrategy } from './prototype/initialize-value-strategy'
import { initializeEvents } from './prototype/intialize-events'
import { initializeFieldProperties } from './prototype/intialize-field-properties'
import { initializeStyle } from './prototype/intialize-style'
import { message } from './prototype/message'
import { setFocus } from './prototype/set-focus'

export const FieldInput = function (this: IFieldInput, descriptor: IFieldDescriptor) {
    if (!descriptor.id || !descriptor.name) {
        throw new Error('FieldInput descriptor must include "id" and "name".')
    }
    this.initializeFieldProperties(descriptor)
} as any as IFieldInput

Object.assign(FieldInput.prototype, {
    initializeValidationStrategy,
    initializeFieldProperties,
    initializeValueStrategy,
    initializeDommable,
    initializeTracking,
    initializeEvents,
    initializeStyle,
    hasChanges,
    setFocus,
    enable,
    clear,
    focus,
    handleOnBlur,
    handleOnFocus,
    handleOnClear,
    handleValidation,
    message
})

/** usable field */
export const Field = function (this: IField, descriptor: IFieldDescriptor) {
    return new FieldInput(descriptor)
} as any as IField
