import { EventsType, IEvents } from '@core/framework/events/events.types'

export interface ILatestCall {
    data?: IEvents
    timeoutId?: number | ReturnType<typeof setTimeout>
}

export const latestCalls = new Map<EventsType, ILatestCall>()
