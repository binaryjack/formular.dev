import { INotificationManager } from '../notification-manager-base.types'
import { INotifier } from '../notification-manager.types'

/**
 * Accepts a notifier and adds it to the notifiers map if it doesn't already exist.
 *
 * @param {INotifier} notify - The notifier to be added.
 */
export function accept(this: INotificationManager, notify: INotifier) {
    const key = `${notify.method.name}`

    const exisingNotifier = this.notifiers.get(key)
    if (exisingNotifier) {
        for (const t of notify.event.types) {
            if (exisingNotifier.event.types.includes(t)) continue
            exisingNotifier.event.types.push(t)
        }
    } else {
        console.log('NOTIFIER REGISTERS', key, notify.method.name)
        this.notifiers.set(key, notify)
    }
}
