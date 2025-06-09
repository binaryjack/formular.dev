import { IFormularManager } from './formular-manager.types'
import { clear } from './prototype/clear'

import { INotificationManager } from '../notification-manager/notification-manager-base.types'
import { SNotificationManager } from '../notification-manager/notification-manager.types'
import { IServiceManager } from '../service-manager/service-manager.types'
import { createEmpty } from './prototype/create-empty'
import { createFromDescriptors } from './prototype/create-from-descriptors'
import { createFromSchema } from './prototype/create-from-schema'
import { getData } from './prototype/get-data'
import { getForm } from './prototype/get-form'
import { validate } from './prototype/validate'

export const FormularManager = function <T extends object>(
    this: IFormularManager<T>,
    serviceManager: IServiceManager
): IFormularManager<T> {
    let instance: IFormularManager<any> | null = null
    this.sm = serviceManager
    return function <T extends object>(this: IFormularManager<T>, serviceManager: IServiceManager) {
        if (instance) {
            return instance
        }
        this.sm = serviceManager

        const notificationManagerInstance =
            serviceManager.resolve<INotificationManager>(SNotificationManager)

        Object.defineProperty(this, 'notificationManager', {
            value: notificationManagerInstance,
            writable: false, // Prevent modification
            configurable: false // Prevent deletion or redefinition
        })

        this.forms = new Map()

        instance = this
        return instance
    } as any as IFormularManager<any>
}

Object.assign(FormularManager.prototype, {
    clear,
    createFromDescriptors,
    createFromSchema,
    createEmpty,
    getData,
    getForm,
    validate
})
