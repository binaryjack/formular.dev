import { useDomManager } from './dependencies/use-dom-manager'
import { useTrackingManager } from './dependencies/use-tracking-manager'
import { useValidationManager } from './dependencies/use-validation-manager'
import { useValueManager } from './dependencies/use-value-manager'
import { IInputBase } from './input-base.types'
import { checkInitialized } from './prototype/check-initialized'
import { clear } from './prototype/clear'
import { enable } from './prototype/enable'
import { focus } from './prototype/focus'
import { handleOnBlur } from './prototype/handle-on-blur'
import { handleOnClear } from './prototype/handle-on-clear'
import { handleOnFocus } from './prototype/handle-on-focus'
import { handleValidation } from './prototype/handle-validation'
import { hasChanges } from './prototype/has-changes'
import { initialize } from './prototype/intialize'
import { initializeProperties } from './prototype/intialize-properties'

import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { useDrawerManager } from './dependencies/use-drawer-manager'
import { useNotificationManager } from './dependencies/use-notification-manager'
import { useStyleManager } from './dependencies/use-style-manager'
import { handleValidationAsync } from './prototype/handle-validation-async'
import { message } from './prototype/message'
import { refreshUi } from './prototype/refresh-ui'
import { setFocus } from './prototype/set-focus'
import { setInputBusy } from './prototype/set-input-busy'

export const InputBase = function (this: IInputBase, descriptor: IFieldDescriptor) {
    if (descriptor.id < 0 || !descriptor.name) {
        throw new Error('FieldInput descriptor must include "id" and "name".')
    }
    this.isInitialized = false
    this.dependencyName = InputBase.name
    this.validationResults = []
    this.initializeProperties(descriptor)
} as any as IInputBase

Object.assign(InputBase.prototype, {
    useNotificationManager,
    handleValidationAsync,
    useValidationManager,
    initializeProperties,
    useTrackingManager,
    checkInitialized,
    handleValidation,
    useDrawerManager,
    useValueManager,
    useStyleManager,
    useDomManager,
    handleOnFocus,
    setInputBusy,
    handleOnClear,
    handleOnBlur,
    initialize,
    hasChanges,
    refreshUi,
    setFocus,
    message,
    enable,
    clear,
    focus
})
