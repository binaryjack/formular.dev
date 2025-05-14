import { eventSignature } from '@core/framework/events/event-signature'
import { EventsType, IEvents } from '@core/framework/events/events.types'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInputBase, IInputBase } from '@core/input-engine/core/input-base/input-base.types'
import {
    INotification,
    TNotificationMethod,
    TNotificationMethodAsnyc
} from '../notification-manager.types'

export const newNotificationVisitor = <T>(
    event: IEvents,
    method: TNotificationMethod<T> | TNotificationMethodAsnyc<T>
): INotification => {
    return { event, method }
}

export const notification = <
    T extends CallableFunction | IExtendedInputBase | IInputBase,
    TEvt extends IEvents
>(
    owner: T,
    eventHandler: eventSignature<TEvt>,
    eventType: EventsType,
    action: string,
    target: string
) => {
    if (target === undefined) {
        // console.warn('target is undefined')
    }

    let name = ''

    if ('dependencyName' in owner) {
        name =
            owner?.dependencyName === 'IFieldBaseInput'
                ? (owner as IInputBase)?.name
                : (owner as IExtendedInputBase).input?.name
    } else {
        name = owner?.name
    }

    return newNotificationVisitor(
        newEvent(name, eventHandler.name, eventType, action, target),
        eventHandler.bind(owner)
    )
}
