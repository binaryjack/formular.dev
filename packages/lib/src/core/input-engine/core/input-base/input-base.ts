/**
 * FORMULAR - Input Base Engine
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Core input field implementation with reactive state and validation
 */

import { newEvent } from '@core/framework/events/new-event'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IDrawerBaseInput } from '@core/input-engine/variants/drawer-base/drawer-base-input.types'
import {
    IConfigurationManager,
    SConfigurationManager
} from '@core/managers/configuration-manager/interfaces/i-configuration-manager'
import { IDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IStyleManager } from '@core/managers/style-manager/style-manager.types'
import { ITrackingManager } from '@core/managers/tracking-manager/tracker-manager.types'
import { IValidationManager } from '@core/managers/validation-manager/validation-manager.types'
import { IValueManager } from '@core/managers/value-manager/value-manager.types'
import { IServiceManager } from '@core/types'

import { ICulture } from '@core/managers'
import { useDomManager } from './dependencies/use-dom-manager'
import { useDrawerManager } from './dependencies/use-drawer-manager'
import { useNotificationManager } from './dependencies/use-notification-manager'
import { useStyleManager } from './dependencies/use-style-manager'
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
import { handleOnKeyPress } from './prototype/handle-on-key-press'
import { handleOnKeyUp } from './prototype/handle-on-key-up'
import { handleValidation } from './prototype/handle-validation'
import { handleValidationAsync } from './prototype/handle-validation-async'
import { hasChanges } from './prototype/has-changes'
import { initialize } from './prototype/intialize'
import { initializeProperties } from './prototype/intialize-properties'
import { message } from './prototype/message'
import { refreshUi } from './prototype/refresh-ui'
import { setFocus } from './prototype/set-focus'
import { setInputBusy } from './prototype/set-input-busy'

export const InputBase = function (
    this: IInputBase,
    serviceManager: IServiceManager,
    descriptor: IFieldDescriptor | null,
    domManagerInstance: IDomManager<HTMLInputElement> | null,
    notifierInstance: INotificationManager | null,
    trackerInstance: ITrackingManager | null,
    validationManagerInstance: IValidationManager | null,
    valueManagerInstance: IValueManager | null,
    drawerBase: IDrawerBaseInput | null,
    styleManager: IStyleManager | null
) {
    if (descriptor !== null) this.initializeProperties(descriptor)
    if (domManagerInstance !== null) this.useDomManager(domManagerInstance)
    if (notifierInstance !== null) this.useNotificationManager(notifierInstance)
    if (trackerInstance !== null) this.useTrackingManager(trackerInstance)
    if (validationManagerInstance !== null) this.useValidationManager(validationManagerInstance)
    if (valueManagerInstance !== null) this.useValueManager(valueManagerInstance)
    if (drawerBase !== null) this.useDrawerManager(drawerBase)
    if (styleManager !== null) this.useStyleManager(styleManager)

    this.isInitialized = false
    this.serviceManager = serviceManager
    Object.defineProperty(this, 'dependencyName', {
        value: InputBase.name && InputBase.name.length > 0 ? InputBase.name : 'InputBase',
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })

    const config = this.serviceManager?.lazy<IConfigurationManager>(SConfigurationManager)?.()
    this.inputDelay = config?.getConfigByName<number>('input', 'delay') ?? 100
    this.onValidateDelay =
        config?.getConfigByName<number>('behavior', 'events', 'onValidate') ?? 100
    this.onUiUpdateDelay =
        config?.getConfigByName<number>('behavior', 'events', 'onUiUpdate') ?? 100

    this.labelId = config?.getConfigByName<string>('rendering', 'suffixes', 'labelId') ?? ''
    this.describedById =
        config?.getConfigByName<string>('rendering', 'suffixes', 'describedById') ?? ''

    this.onClickDelay = config?.getConfigByName<number>('behavior', 'events', 'onClick') ?? 100
    this.culture =
        config?.getConfigByName<ICulture>('cultures', 'defaultCulture') ?? ({} as ICulture)

    this.validationResults = []

    // Helper to notify changes
    const notifyChange = (eventType: 'onValidate' | 'onUiUpdate') => {
        this.notificationManager?.debounceNotify(
            eventType,
            this.inputDelay,
            newEvent(
                this.name,
                setInputBusy.name,
                eventType,
                `field.${setInputBusy.name}.isFocus`,
                this.name
            )
        )
    }

    // Make 'value' observable and notify on change
    let _value = typeof this.value !== 'undefined' ? this.value : null
    Object.defineProperty(this, 'value', {
        get() {
            return _value
        },
        set(newValue) {
            if (_value !== newValue) {
                _value = newValue
                const triggers =
                    this.validationManager?.triggerKeyWordType?.map((k: string) =>
                        k.toLowerCase()
                    ) ?? []
                if (triggers.includes('onchange')) {
                    notifyChange('onValidate')
                }
                notifyChange('onUiUpdate')
            }
        },
        configurable: true,
        enumerable: true
    })

    let _focus = typeof this.isFocus !== 'undefined' ? this.isFocus : false
    Object.defineProperty(this, 'isFocus', {
        get() {
            return _focus
        },
        set(newValue: boolean) {
            if (_focus !== newValue) {
                _focus = newValue
                const triggers =
                    this.validationManager?.triggerKeyWordType?.map((k: string) =>
                        k.toLowerCase()
                    ) ?? []
                if (triggers.includes('onchange')) {
                    notifyChange('onValidate')
                }
                notifyChange('onUiUpdate')
            }
        }
    })
} as any as IInputBase

Object.assign(InputBase.prototype, {
    useNotificationManager,
    handleValidationAsync,
    useValidationManager,
    initializeProperties,
    useTrackingManager,
    checkInitialized,
    handleValidation,
    handleOnKeyPress,
    handleOnKeyUp,
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
