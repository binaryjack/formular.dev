import { IEvents } from '@core/events/events.types'
import { INotifier, TNotifierMethod, TNotifierMethodAsnyc } from '../notifications.types'

export const newNotificationVisitor = <T>(
    event: IEvents,
    method: TNotifierMethod<T> | TNotifierMethodAsnyc<T>
): INotifier => {
    return { event, method }
}

export type INNv = <T>(
    event: IEvents,
    method: TNotifierMethod<T> | TNotifierMethodAsnyc<T>
) => INotifier

export const nnv = <T>(
    event: IEvents,
    method: TNotifierMethod<T> | TNotifierMethodAsnyc<T>
): INotifier => newNotificationVisitor(event, method)
