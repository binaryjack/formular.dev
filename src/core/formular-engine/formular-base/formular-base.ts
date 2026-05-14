/**
 * FORMULAR - Formular Base Engine
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Core form instance implementation with reactive state management
 */

import { IFormularManager } from '@core/managers/formular-manager/formular-manager.types'
import { LoadingStatus } from '@core/status'
import { IFormular } from './formular-base.types'
import { addFields } from './prototype/add-fields'
import { checkAllFieldsAreValid } from './prototype/check-all-fields-are-valid'
import { checkChanges } from './prototype/check-changes'
import { clear } from './prototype/clear'
import { clearField } from './prototype/clear-field'
import { dispose } from './prototype/dispose'
import { getData } from './prototype/get-data'
import { getErrors } from './prototype/get-errors'
import { getField } from './prototype/get-field'
import { getFormFlags } from './prototype/get-form-flags'
import { hasChanges } from './prototype/has-changes'
import { observe } from './prototype/observe'
import { parse } from './prototype/parse'
import { preValidateField } from './prototype/pre-validate-field'
import { reset } from './prototype/reset'
import { setIsBusy } from './prototype/set-is-busy'
import { setTriggerKeyWord } from './prototype/set-validation-trigger-mode'
import { submit } from './prototype/submit'
import { subscribe } from './prototype/subscribe'
import { unobserveAll } from './prototype/unobserve-all'
import { updateField } from './prototype/update-field'
import { validateField } from './prototype/validate-field'
import { validateForm } from './prototype/validate-form'

export const Formular = function <T extends object>(
    this: IFormular<T>,
    id: string,
    manager: IFormularManager
) {
    Object.defineProperty(this, 'id', {
        value: id,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })

    this.fields = []
    this.originFields = []
    this.isValid = true
    this._loadingStatus = LoadingStatus.Loaded
    this.triggerKeyWordType = []
    this.isDirty = false

    // Initialize introspection helpers (gated by config, zero cost if disabled)
    ;(this as any)._observerSubscriptions = new Map<string | undefined, Array<() => void>>()
    ;(this as any)._introspectionEnabled = false
    ;(this as any)._debugStreamMaxSize = 100
    ;(this as any).debugStream = []

    // Define isBusy as a computed property returning boolean
    Object.defineProperty(this, 'isBusy', {
        get: function () {
            return this._loadingStatus !== LoadingStatus.Loaded
        },
        enumerable: true,
        configurable: false
    })

    Object.defineProperty(this, 'manager', {
        value: manager,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })

    Object.defineProperty(this, 'notificationManager', {
        value: manager.notificationManager,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
} as any as IFormular<any>

Object.assign(Formular.prototype, {
    addFields,
    checkAllFieldsAreValid,
    checkChanges,
    clear,
    clearField,
    dispose,
    getData,
    getErrors,
    getField,
    getFormFlags,
    hasChanges,
    observe,
    parse,
    preValidateField,
    reset,
    setIsBusy,
    setTriggerKeyWord,
    submit,
    subscribe,
    unobserveAll,
    updateField,
    validateField,
    validateForm
})
