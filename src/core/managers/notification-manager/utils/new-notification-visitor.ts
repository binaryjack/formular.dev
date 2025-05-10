import {
    IExtendedInputBase,
    IFieldBaseInput
} from '@core/field-engine/core/input-base/field-input-base-types'
import { eventSignature, EventsType, IEvents, newEvent } from '@core/framework/events/events.types'
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

export const eventNotifVisitor = <T extends IExtendedInputBase | IFieldBaseInput>(
    ef: T,
    eventHandler: eventSignature,
    eventType: EventsType
) => {
    return newNotificationVisitor(
        newEvent(
            ef.dependencyName === 'IFieldBaseInput'
                ? (ef as IFieldBaseInput)?.name
                : ef?.field?.name,
            eventHandler.name,
            eventType,
            eventHandler.name
        ),
        eventHandler.bind(ef)
    )
}
