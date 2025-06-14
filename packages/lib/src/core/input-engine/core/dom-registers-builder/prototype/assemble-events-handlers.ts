import {
    EventTypeSignature,
    IDomRegisterBuilder,
    KeyEventTypeSignature
} from '../dom-registers-builder.type'

/**
 * Assembles all registered event handlers into a merged handler object.
 * @param this DomRegisterBuilder instance
 * @returns Object with merged event handlers
 */
export const assembleEventsHandlers = function (this: IDomRegisterBuilder) {
    const mergedHandlers: Partial<any> = {}

    for (const [eventType, handlers] of Object.entries(this.eventsHandlers)) {
        mergedHandlers[eventType] = (e: Event) => {
            handlers.forEach((handler) => {
                if (eventType === 'onKeyPress') {
                    ;(handler as KeyEventTypeSignature)(e as KeyboardEvent)
                } else {
                    ;(handler as EventTypeSignature)(e)
                }
            })
        }
    }

    return mergedHandlers
}
