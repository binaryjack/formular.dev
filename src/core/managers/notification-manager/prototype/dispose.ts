import { INotificationManager } from '../notification-manager-base.types'

/**
 * Disposes of the entity by unsubscribing all observers.
 */
export function dispose(this: INotificationManager) {
    this.observers.unSubscribeAll()
    this.notifiers.clear()
}
