import { EventsType, IEvents } from '@core/framework/events/events.types'
import { latestCalls } from './global'

export const takeLatest = function <T extends IEvents>(
    type: EventsType,
    timeoutId: ReturnType<typeof setTimeout>,
    data?: T
): void {
    latestCalls.set(type, { data, timeoutId })
}
