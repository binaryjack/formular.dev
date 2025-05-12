import { eventSignature, EventsType, IEvents } from '@core/framework/events/events.types'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInputBase, IInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { INotifier, TNotifierMethod, TNotifierMethodAsnyc } from '../notification-manager.types'

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

export const eventNotifVisitor = <T extends IExtendedInputBase | IInputBase>(
    ef: T,
    eventHandler: eventSignature,
    eventType: EventsType
) => {
    return newNotificationVisitor(
        newEvent(
            ef.dependencyName === 'IFieldBaseInput' ? (ef as IInputBase)?.name : ef?.input?.name,
            eventHandler.name,
            eventType,
            eventHandler.name
        ),
        eventHandler.bind(ef)
    )
}
