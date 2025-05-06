import { handleValidation } from '@core/formy-base/prototype/handle-validation'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'

import { IFieldBaseInput } from './field-input-base-types'
import { initializeBase } from './initializers/initialize-base'
import { initializeDommable } from './initializers/initialize-dommable'
import { initializeTracking } from './initializers/initialize-tracking'
import { initializeValidationStrategy } from './initializers/initialize-validation-strategy'
import { initializeValueStrategy } from './initializers/initialize-value-strategy'
import { initializeEvents } from './initializers/intialize-events'
import { checkInitialized } from './prototype/check-initialized'
import { clear } from './prototype/clear'
import { enable } from './prototype/enable'
import { focus } from './prototype/focus'
import { handleOnBlur } from './prototype/handle-on-blur'
import { handleOnClear } from './prototype/handle-on-clear'
import { handleOnFocus } from './prototype/handle-on-focus'
import { hasChanges } from './prototype/has-changes'
import { initializeFieldProperties } from './prototype/intialize-field-properties'

import { initializeDrawerableState } from './initializers/initialize-drawerable-state'
import { initializeNotifier } from './initializers/initialize-notifier'
import { initializeStyle } from './initializers/initialize-style'
import { message } from './prototype/message'
import { setFocus } from './prototype/set-focus'

export const FieldInput = function (this: IFieldBaseInput, descriptor: IFieldDescriptor) {
    if (descriptor.id < 0 || !descriptor.name) {
        throw new Error('FieldInput descriptor must include "id" and "name".')
    }
    this.initializeFieldProperties(descriptor)
} as any as IFieldBaseInput

Object.assign(FieldInput.prototype, {
    initializeValidationStrategy,
    initializeFieldProperties,
    initializeValueStrategy,
    initializeDrawerableState,
    initializeDommable,
    initializeNotifier,
    initializeTracking,
    initializeBase,
    initializeEvents,
    checkInitialized,
    handleValidation,
    initializeStyle,
    handleOnFocus,
    handleOnClear,
    handleOnBlur,
    hasChanges,
    setFocus,
    message,
    enable,
    clear,
    focus
})
