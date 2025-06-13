import { EventsType } from '@core/framework/events/events.types'
import { Events, IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Registers a single event handler for a given event type.
 * @param this DomRegisterBuilder instance
 * @param eventType The type of event
 * @param handler The event handler function
 * @returns The builder instance
 */
export const registerEvent = function (
    this: IDomRegisterBuilder,
    eventType: EventsType,
    handler?: Events
) {
    const key = eventType as keyof typeof this.eventsHandlers
    this.eventsHandlers[key] ??= []
    if (handler) {
        this.eventsHandlers[key].push(handler)
    }
    return this
}
