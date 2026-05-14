import { EventsType } from '@core/framework/events/events.types'
import { latestCalls } from './global'

export const clearCurrentCall = function (type: EventsType): void {
    if (latestCalls.has(type)) {
        const call = latestCalls.get(type)
        if (call?.timeoutId) {
            clearTimeout(call.timeoutId)
        }
        // latestCalls.delete(type)
    }
}
