import { INotificationManager } from '../notification-manager-base.types'

export function trigger(this: INotificationManager) {
    this.observers.trigger()
    //*this.notifiers.notifyAll()
}
