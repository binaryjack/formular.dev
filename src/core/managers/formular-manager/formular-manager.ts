import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IFormularManager } from './formular-manager.types'
import { clear } from './prototype/clear'

import { InputFactory } from '@core/input-engine/generator/factory/input-factory'
import { FieldProvider } from '@core/input-engine/generator/provider/field-provider/field-provider'
import { createEmpty } from './prototype/create-empty'
import { createfromConfiguration } from './prototype/create-from-configuration'
import { createFromSchema } from './prototype/create-from-schema'
import { getData } from './prototype/get-data'
import { getForm } from './prototype/get-form'
import { validate } from './prototype/validate'

export const FormularManager = (function () {
    let instance: IFormularManager<any> | null = null
    const fieldFactory = new InputFactory()
    const fieldProvider = new FieldProvider(fieldFactory)

    return function <T extends object>(
        this: IFormularManager<T>,
        notificationManager?: INotificationManager,
        autoTracker?: INotificationManager
    ) {
        if (instance) {
            return instance
        }

        Object.defineProperty(this, 'fieldProvider', {
            value: fieldProvider,
            writable: false, // Prevent modification
            configurable: false // Prevent deletion or redefinition
        })

        Object.defineProperty(this, 'notificationManager', {
            value: notificationManager,
            writable: false, // Prevent modification
            configurable: false // Prevent deletion or redefinition
        })

        this.forms = new Map()

        if (autoTracker && this.notificationManager) {
            this.notificationManager.autoTracker = autoTracker
        }

        instance = this
        return instance
    } as any as IFormularManager<any>
})()

Object.assign(FormularManager.prototype, {
    clear,
    createfromConfiguration,
    createFromSchema,
    createEmpty,
    getData,
    getForm,
    validate
})
