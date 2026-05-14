import { logManager } from '@core/managers/log-manager/log-manager'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IInputBase } from '../input-base.types'

export const useNotificationManager = function (
    this: IInputBase,
    notifierInstance: INotificationManager
): IInputBase {
    try {
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
