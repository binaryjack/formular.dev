import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IFormularManager } from './formular-manager.types'
import { clear } from './prototype/clear'

import { createEmpty } from './prototype/create-empty'
import { createfromDescriptor } from './prototype/create-from-descriptor'
import { createFromSchema } from './prototype/create-from-schema'
import { getData } from './prototype/get-data'
import { getForm } from './prototype/get-form'
import { validate } from './prototype/validate'

export const FormularManager = function <T extends object>(
    this: IFormularManager<T>,
    notificationManager?: INotificationManager,
    autoTracker?: INotificationManager
) {
    this.forms = new Map()
    this.notificationManager = notificationManager

    if (autoTracker && this.notificationManager) {
        this.notificationManager.autoTracker = autoTracker
    }
    // Additional initialization logic if needed
} as any as IFormularManager<any>

Object.assign(FormularManager.prototype, {
    clear,
    createfromDescriptor,
    createFromSchema,
    createEmpty,
    getData,
    getForm,
    validate
})
