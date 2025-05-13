import { INotificationManager } from '../notification-manager-base.types'

export function dispose(this: INotificationManager) {
    this.observers.trigger()
    //*this.notifiers.notifyAll()
}
