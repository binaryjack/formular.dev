import { EventsType, IEvents } from '@core/framework/events/events.types'

export interface ILatestCall {
    data?: IEvents
    timeoutId?: number | NodeJS.Timeout
}

export const latestCalls = new Map<EventsType, ILatestCall>()
