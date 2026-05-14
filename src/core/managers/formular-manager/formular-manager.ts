/**
 * FORMULAR - FormularManager Core
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Central form management service for creating and managing form instances
 */

import { IFormularManager } from './formular-manager.types'
import { clear } from './prototype/clear'

import { INotificationManager } from '../notification-manager/notification-manager-base.types'
import { IServiceManager } from '../service-manager/service-manager.types'
import { createEmpty } from './prototype/create-empty'
import { createFromDescriptors } from './prototype/create-from-descriptors'
import { createFromSchema } from './prototype/create-from-schema'
import { getData } from './prototype/get-data'
import { getForm } from './prototype/get-form'
import { validate } from './prototype/validate'

export const FormularManager = function (
    this: IFormularManager,
    serviceManager: IServiceManager,
    notificationManagerInstance: INotificationManager
) {
    this.sm = serviceManager

    Object.defineProperty(this, 'notificationManager', {
        value: notificationManagerInstance,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })

    this.forms = new Map()
} as any as IFormularManager

Object.assign(FormularManager.prototype, {
    clear,
    createFromDescriptors,
    createFromSchema,
    createEmpty,
    getData,
    getForm,
    validate
})
