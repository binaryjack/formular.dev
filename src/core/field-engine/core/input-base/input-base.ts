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
import { message } from './prototype/message'
import { setFocus } from './prototype/set-focus'

export const InputBase = function (this: IInputBase, descriptor: IFieldDescriptor) {
    if (descriptor.id < 0 || !descriptor.name) {
        throw new Error('FieldInput descriptor must include "id" and "name".')
    }
    this.isInitialized = false
    this.dependencyName = InputBase.name
    this.initializeProperties(descriptor)
} as any as IInputBase

Object.assign(InputBase.prototype, {
    useValidationManager,
    initializeProperties,
    useValueManager,
    useDrawerManager,
    useDomManager,
    useNotificationManager,
    useTrackingManager,
    initialize,
    checkInitialized,
    handleValidation,
    useStyleManager,
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
