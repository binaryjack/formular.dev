import { EventsType, IEvents } from '@core/framework/events/events.types'
import { INotificationManager } from '../notification-manager-base.types'
import { INotification } from '../notification-manager.types'

/**
 * Notifies all notifiers of a specific type with optional data.
 *
 * @template T
 * @param {TNotifierEventsType} type - The type of notification.
 * @param {T} [data] - Optional data to be passed to the notifier's method.
 */
export function notify<T extends IEvents>(this: INotificationManager, type: EventsType, data?: T) {
    this.notifiers.forEach((notifier: INotification) => {
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
    this.observers?.trigger()
}
