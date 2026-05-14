import { INotificationManager } from '../notification-manager-base.types'

export const getRegisteredNotifierNames = function (this: INotificationManager) {
    return [...this.notifiers.keys()]
}
