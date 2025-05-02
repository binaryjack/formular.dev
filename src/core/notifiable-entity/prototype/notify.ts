import { EventsType, IEvents } from '@core/events/events.types'
import { INotifiableEntity } from '../notifiable-entity-base.types'
import { INotifier } from '../notifications.types'

/**
 * Notifies all notifiers of a specific type with optional data.
 *
 * @template T
 * @param {TNotifierEventsType} type - The type of notification.
 * @param {T} [data] - Optional data to be passed to the notifier's method.
 */
export function notify<T extends IEvents>(this: INotifiableEntity, type: EventsType, data?: T) {
    this.notifiers.forEach((notifier: INotifier) => {
        if (notifier.event.types.includes(type)) {
            notifier.method(data)

            if (this.autoTracker) {
                this.autoTracker?.notify('onAutoTrackNotified', {
                    ...data,
                    target: notifier.event.action
                } as IEvents)
            }
        }
    })
    // this.observers?.trigger()
}
