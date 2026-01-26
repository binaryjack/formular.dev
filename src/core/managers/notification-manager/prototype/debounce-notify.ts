// Map to store the latest calls for each EventType

import { EventsType, IEvents } from '@core/framework/events/events.types'
import { getCallByType } from '@core/framework/optimization/latest-calls/get-call-by-type'
import { removeCallByType } from '@core/framework/optimization/latest-calls/remove-call-by-type'

import { clearCurrentCall } from '@core/framework/optimization/latest-calls/clear-current-call'
import { takeLatest } from '@core/framework/optimization/latest-calls/take-latest'
import { INotificationManager } from '../notification-manager-base.types'
import { INotification } from '../notification-manager.types'

export const debounceNotify = function <T extends IEvents>(
    this: INotificationManager,
    type: EventsType,
    delay: number,
    data?: T,
    channel?: string
) {
    // Create a unique key combining type and channel for per-field debouncing
    const debounceKey = channel ? `${type}:${channel}` : type

    // Clear the previous timeout for this debounce key, if any
    clearCurrentCall(debounceKey as EventsType)

    // Store the latest data and set a new timeout for this debounce key
    const timeoutId: number | NodeJS.Timeout = setTimeout(() => {
        // Execute the latest call for this EventType
        this.notifiers.forEach((notifier: INotification) => {
            if (notifier?.event.types.includes(type)) {
                const callEvent = getCallByType(debounceKey as EventsType)

                notifier.method(callEvent)

                if (this.autoTracker) {
                    this.autoTracker?.notify('onAutoTrackNotified', {
                        ...callEvent,
                        target: notifier.event.action
                    } as IEvents)
                }
            }
        })

        // Remove the debounce key from the map after execution
        removeCallByType(debounceKey as EventsType)
    }, delay)

    // Update the map with the latest call using the unique debounce key
    takeLatest<T>(debounceKey as EventsType, timeoutId, data)
}
