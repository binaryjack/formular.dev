import { INotifiableEntity } from '../notifiable-entity-base.types'
import { INotifier, newAutoTrackingData, TNotifierEventsType } from '../notifications.types'

/**
 * Notifies all notifiers of a specific type with optional data.
 *
 * @template T
 * @param {TNotifierEventsType} type - The type of notification.
 * @param {T} [data] - Optional data to be passed to the notifier's method.
 */
export function notify<T>(this: INotifiableEntity, type: TNotifierEventsType, data?: T) {
    this.notifiers.forEach((value: INotifier) => {
        if (value.type === type) {
            value.method(data)
        }
    })
    this.observers?.trigger()

    if (this.autoTracker) {
        this.autoTracker?.notify('autoTrack_accepted', newAutoTrackingData(`${''}`, `${''}`, data))
        this.autoTracker?.observers.trigger()
    }
}
