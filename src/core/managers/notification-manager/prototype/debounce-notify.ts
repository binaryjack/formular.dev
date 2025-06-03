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
    data?: T
) {
    // Clear the previous timeout for this EventType, if any
    clearCurrentCall(type)

    // Store the latest data and set a new timeout for this EventType
    const timeoutId: number | NodeJS.Timeout = setTimeout(() => {
        // Execute the latest call for this EventType
        this.notifiers.forEach((notifier: INotification) => {
            if (notifier?.event.types.includes(type)) {
                const callEvent = getCallByType(type)

                notifier.method(callEvent)

                if (this.autoTracker) {
                    this.autoTracker?.notify('onAutoTrackNotified', {
                        ...callEvent,
                        target: notifier.event.action
                    } as IEvents)
                }
            }
        })

        // Remove the EventType from the map after execution
        removeCallByType(type)
    }, delay)

    // Update the map with the latest call
    takeLatest<T>(type, timeoutId, data)
}
