import { INotifiableEntity } from '../notifiable-entity-base.types'
import { INotifier, newAutoTrackingData } from '../notifications.types'

/**
 * Accepts a notifier and adds it to the notifiers map if it doesn't already exist.
 *
 * @param {INotifier} notify - The notifier to be added.
 */
export function accept(this: INotifiableEntity, notify: INotifier) {
    if (this.notifiers.has(notify.id)) return

    this.notifiers.set(notify.id, notify)
    if (this.autoTracker) {
        this.autoTracker?.notify(
            'autoTrack_accepted',
            newAutoTrackingData(`${notify.id}`, `${notify.method.name}`, notify)
        )
    }
}
