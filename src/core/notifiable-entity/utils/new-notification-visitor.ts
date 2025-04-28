import { IEvents } from '../../base/events/events.types'
import { TNotifierMethod, TNotifierMethodAsnyc } from '../notifications.types'

export const newNotificationVisitor = <T>(
    event: IEvents,
    method: TNotifierMethod<T> | TNotifierMethodAsnyc<T>
) => {
    return { event, method }
}

export const nnv = <T>(event: IEvents, method: TNotifierMethod<T> | TNotifierMethodAsnyc<T>) =>
    newNotificationVisitor(event, method)
