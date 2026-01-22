import { EventsType } from '@core/framework/events/events.types'
import { latestCalls } from './global'

export const removeCallByType = function (type: EventsType): void {
    latestCalls.delete(type)
}
