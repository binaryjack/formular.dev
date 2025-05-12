import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IFormularManager } from './formular-manager.types'
import clear from './prototype/clear'
import createfromDescriptor from './prototype/create-from-descriptor'
import createFromSchema from './prototype/create-from-schema'
import getData from './prototype/get-data'
import getForm from './prototype/get-form'
import { getFormFlags } from './prototype/get-form-flags'
import validate from './prototype/validate'

export const FormularManager = function (
    this: IFormularManager,
    autoTracker?: INotificationManager
) {
    this.forms = new Map()
    this.autoTracker = autoTracker
    // Additional initialization logic if needed
} as any as IFormularManager

Object.assign(
    FormularManager.prototype,
    clear,
    createfromDescriptor,
    createFromSchema,
    getData,
    getForm,
    validate,
    getFormFlags
)
