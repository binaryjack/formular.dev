import { logManager } from '@core/managers/log-manager/log-manager'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const useNotificationManager = function (
    this: IFieldBaseInput,
    notifierInstance: INotificationManager
): IFieldBaseInput {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        // if (!this?.tracker) {
        //     throw Error('tracker must be initialized')
        // }

        // if (!notifierInstance) {
        //     throw Error('notifierInstance must be initialized globaly.')
        // }

        this.notificationManager = notifierInstance
        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useNotificationManager.name,
            `an error has occured when initializing initializeNotifier ${this.name} class: ${e.message}`
        )
        return this
    }
}
