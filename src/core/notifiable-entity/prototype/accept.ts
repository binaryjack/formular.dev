import { INotifiableEntity } from '../notifiable-entity-base.types'
import { INotifier } from '../notifications.types'

/**
 * Accepts a notifier and adds it to the notifiers map if it doesn't already exist.
 *
 * @param {INotifier} notify - The notifier to be added.
 */
export function accept(this: INotifiableEntity, notify: INotifier) {
    const key = `${notify.method.name}`

    const exisingNotifier = this.notifiers.get(key)
    if (exisingNotifier) {
        for (const t of notify.event.types) {
            if (exisingNotifier.event.types.includes(t)) continue
            exisingNotifier.event.types.push(t)
        }
    } else {
        this.notifiers.set(key, notify)
    }
}
