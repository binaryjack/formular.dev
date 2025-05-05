import { handleValidation } from '@core/formy-base/prototype/handle-validation'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'

import { assignToInstance } from '@core/framework/utility/assign-to-instance'
import { initializeDommable } from '../../factory/builder/prototype/initialize-dommable'
import { initializeTracking } from '../../factory/builder/prototype/initialize-tracking'
import { initializeValidationStrategy } from '../../factory/builder/prototype/initialize-validation-strategy'
import { initializeValueStrategy } from '../../factory/builder/prototype/initialize-value-strategy'
import { initializeEvents } from '../../factory/builder/prototype/intialize-events'
import { IFieldBaseInput } from './field-input-base-types'
import { checkInitialized } from './prototype/check-initialized'
import { clear } from './prototype/clear'
import { enable } from './prototype/enable'
import { focus } from './prototype/focus'
import { handleOnBlur } from './prototype/handle-on-blur'
import { handleOnClear } from './prototype/handle-on-clear'
import { handleOnFocus } from './prototype/handle-on-focus'
import { hasChanges } from './prototype/has-changes'
import { initializeFieldProperties } from './prototype/intialize-field-properties'
import { initializeStyle } from './prototype/intialize-style'
import { message } from './prototype/message'
import { setFocus } from './prototype/set-focus'

export const FieldInput = function (this: IFieldBaseInput, descriptor: IFieldDescriptor) {
    if (descriptor.id < 0 || !descriptor.name) {
        throw new Error('FieldInput descriptor must include "id" and "name".')
    }
    this.initializeFieldProperties(descriptor)
} as any as IFieldBaseInput

export const FieldInputInstance = function (prototype: object) {
    assignToInstance(prototype, {
        initializeValidationStrategy,
        initializeFieldProperties,
        initializeValueStrategy,
        initializeDommable,
        initializeTracking,
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
}

FieldInputInstance(FieldInput.prototype)
