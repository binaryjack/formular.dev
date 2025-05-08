import { handleValidation } from '@core/formy-base/prototype/handle-validation'

import { useDommable } from './dependencies/use-dommable'
import { useTracking } from './dependencies/use-tracking'
import { useValidationStrategy } from './dependencies/use-validation-strategy'
import { useValueStrategy } from './dependencies/use-value-strategy'
import { IFieldBaseInput } from './field-input-base-types'
import { checkInitialized } from './prototype/check-initialized'
import { clear } from './prototype/clear'
import { enable } from './prototype/enable'
import { focus } from './prototype/focus'
import { handleOnBlur } from './prototype/handle-on-blur'
import { handleOnClear } from './prototype/handle-on-clear'
import { handleOnFocus } from './prototype/handle-on-focus'
import { hasChanges } from './prototype/has-changes'
import { initialize } from './prototype/intialize'
import { initializeProperties } from './prototype/intialize-properties'

import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { useDrawerableState } from './dependencies/use-drawerable-state'
import { useNotifier } from './dependencies/use-notifier'
import { useStyler } from './dependencies/use-style'
import { message } from './prototype/message'
import { setFocus } from './prototype/set-focus'

export const FieldInput = function (this: IFieldBaseInput, descriptor: IFieldDescriptor) {
    if (descriptor.id < 0 || !descriptor.name) {
        throw new Error('FieldInput descriptor must include "id" and "name".')
    }
    this.isInitialized = false
    this.dependencyName = FieldInput.name
    this.initializeFieldProperties(descriptor)
} as any as IFieldBaseInput

Object.assign(FieldInput.prototype, {
    useValidationStrategy,
    initializeProperties,
    useValueStrategy,
    useDrawerableState,
    useDommable,
    useNotifier,
    useTracking,
    initialize,
    checkInitialized,
    handleValidation,
    useStyler,
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
