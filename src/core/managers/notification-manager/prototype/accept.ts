import { INotificationManager } from '../notification-manager-base.types'
import { INotification } from '../notification-manager.types'
import { getKey } from '../utils/key'

/**
 * Accepts a notifier and adds it to the notifiers map if it doesn't already exist.
 *
 * @param {INotification} notify - The notifier to be added.
 */
export function accept(this: INotificationManager, notify: INotification) {
    const key = getKey(notify)

    const exisingNotifier = this.notifiers.get(key)
    if (exisingNotifier) {
        for (const t of notify.event.types) {
            if (exisingNotifier.event.types.includes(t)) {
                // console.log('NOTIFIER ALREADY EXISTS', key)
                continue
            }
            // console.log('NEW NOTIFIER REGISTERS different type', key)
            exisingNotifier.event.types.push(t)
        }
    } else {
        // console.log('NOTIFIER REGISTERS', key)

        this.notifiers.set(key, notify)
    }
}
