import { EventsType, IEvents } from '@core/framework/events/events.types'
import { latestCalls } from './global'

export const getCallByType = function <T extends IEvents>(type: EventsType): T | undefined {
    return latestCalls.get(type)?.data as T | undefined
}
