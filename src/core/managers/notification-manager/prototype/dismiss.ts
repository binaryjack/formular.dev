import { INotificationManager } from '../notification-manager-base.types'
import { INotification } from '../notification-manager.types'
import { getKey } from '../utils/key'

/**
 * Disposes of the entity by unsubscribing all observers.
 */
export function dismiss(this: INotificationManager, notify: INotification) {
    const key = getKey(notify)
    // const ref = this.notifiers.get(key)
    this.notifiers.delete(key)
}
