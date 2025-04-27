import { TNotifierEventsType, TNotifierMethod, TNotifierMethodAsnyc } from '../notifications.types'

export const newNotificationVisitor = <T>(
    id: string,
    method: TNotifierMethod<T> | TNotifierMethodAsnyc<T>,
    type: TNotifierEventsType
) => {
    return { id, method, type }
}

export const nnv = <T>(
    id: string,
    method: TNotifierMethod<T> | TNotifierMethodAsnyc<T>,
    type: TNotifierEventsType
) => newNotificationVisitor(id, method, type)
