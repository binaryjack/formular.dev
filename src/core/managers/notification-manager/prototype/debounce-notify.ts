// Map to store the latest calls for each EventType

import { EventsType, IEvents } from '@core/framework/events/events.types'
import { INotificationManager } from '../notification-manager-base.types'
import { INotification } from '../notification-manager.types'

export interface ILatestCall {
    data?: IEvents
    timeoutId?: number | NodeJS.Timeout
}

const latestCalls = new Map<EventsType, ILatestCall>()

export const debounceNotify = function <T extends IEvents>(
    this: INotificationManager,
    type: EventsType,
    delay: number,
    data?: T
) {
    // Clear the previous timeout for this EventType, if any
    if (latestCalls.has(type)) {
        const previousCall = latestCalls.get(type)
        if (previousCall?.timeoutId) {
            clearTimeout(previousCall.timeoutId)
        }
    }

    // Store the latest data and set a new timeout for this EventType
    const timeoutId: number | NodeJS.Timeout = setTimeout(() => {
        // Execute the latest call for this EventType
        this.notifiers.forEach((notifier: INotification) => {
            if (notifier.event.types.includes(type)) {
                notifier.method(latestCalls.get(type)?.data)

                if (this.autoTracker) {
                    this.autoTracker?.notify('onAutoTrackNotified', {
                        ...latestCalls.get(type)?.data,
                        target: notifier.event.action
                    } as IEvents)
                }
            }
        })

        // Remove the EventType from the map after execution
        latestCalls.delete(type)
    }, delay)

    // Update the map with the latest call
    latestCalls.set(type, { data, timeoutId })
}
