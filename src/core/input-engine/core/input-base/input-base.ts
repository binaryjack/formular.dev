/**
 * FORMULAR - Input Base Engine
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Core input field implementation with reactive state and validation
 */

import { newEvent } from '@core/framework/events/new-event'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { ICulture } from '@core/managers'
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

import { useDomManager } from './dependencies/use-dom-manager'
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
    styleManager: IStyleManager | null
) {
    if (descriptor !== null) this.initializeProperties(descriptor)
    if (domManagerInstance !== null) this.useDomManager(domManagerInstance)
    if (notifierInstance !== null) this.useNotificationManager(notifierInstance)
    if (trackerInstance !== null) this.useTrackingManager(trackerInstance)
    if (validationManagerInstance !== null) this.useValidationManager(validationManagerInstance)
    if (valueManagerInstance !== null) this.useValueManager(valueManagerInstance)
    if (styleManager !== null) this.useStyleManager(styleManager)

    this.isInitialized = false
    this.serviceManager = serviceManager
    Object.defineProperty(this, 'dependencyName', {
        value: InputBase.name && InputBase.name.length > 0 ? InputBase.name : 'InputBase',
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })

    const config = this.serviceManager?.lazy<IConfigurationManager>(SConfigurationManager)?.()

    const resolveDelay = (value: any, fallback: number) => {
        if (typeof value === 'number') return value
        if (value && typeof value === 'object') {
            if (typeof value.triggerDelay === 'number') return value.triggerDelay
            if (typeof value.delay === 'number') return value.delay
        }
        return fallback
    }

    // Use field-level debounce if specified, otherwise fall back to global config
    const onChangeConfig = config?.getConfigByName<any>('behavior', 'events', 'onChange')
    const globalInputDelay = resolveDelay(onChangeConfig, 100)
    // Only set if not already set by initializeProperties
    if (this.inputDelay === undefined) {
        this.inputDelay = descriptor?.debounceDelay ?? globalInputDelay
    }

    const onValidateConfig = config?.getConfigByName<any>('behavior', 'events', 'onValidate')
    const globalOnValidateDelay = resolveDelay(onValidateConfig, 100)
    // Only set if not already set by initializeProperties
    if (this.onValidateDelay === undefined) {
        this.onValidateDelay = descriptor?.debounceDelay ?? globalOnValidateDelay
    }

    const onUiUpdateConfig = config?.getConfigByName<any>('behavior', 'events', 'onUiUpdate')
    const globalOnUiUpdateDelay = resolveDelay(onUiUpdateConfig, 100)
    // Only set if not already set by initializeProperties
    if (this.onUiUpdateDelay === undefined) {
        this.onUiUpdateDelay = descriptor?.debounceDelay ?? globalOnUiUpdateDelay
    }

    // Use UI update delay as default debounce delay for observer notifications
    if (this.observablesDelay === undefined) {
        this.observablesDelay = this.onUiUpdateDelay ?? this.inputDelay ?? 100
    }

    this.labelId = this.domManager?.labelId ?? '-label'
    this.describedById = this.domManager?.describedById ?? '-described-by'

    const onClickConfig = config?.getConfigByName<any>('behavior', 'events', 'onClick')
    this.onClickDelay = resolveDelay(onClickConfig, 100)
    this.culture =
        config?.getConfigByName<ICulture>('cultures', 'defaultCulture') ?? ({} as ICulture)

    this.validationResults = []

    // Helper to notify changes
    const notifyChange = (eventType: 'onValidate' | 'onUiUpdate') => {
        if (this.notificationManager?.debounceNotify === undefined) {
            return
        }
        this.notificationManager?.debounceNotify?.(
            eventType,
            this.inputDelay,
            newEvent?.(
                this.name,
                setInputBusy.name,
                eventType,
                `field.${setInputBusy.name}.isFocus`,
                this.name
            ),
            String(this.id) // Pass field ID as channel
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
