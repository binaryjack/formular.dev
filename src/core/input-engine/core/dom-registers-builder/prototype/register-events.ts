import { ICustomHandler, IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Registers multiple custom event handlers to the builder.
 * @param this DomRegisterBuilder instance
 * @param customHandlers List of custom event handlers
 * @returns The builder instance
 */
export const registerEvents = function (
    this: IDomRegisterBuilder,
    ...customHandlers: ICustomHandler[]
) {
    customHandlers.forEach((customHandler) => {
        this.registerEvent(customHandler.eventType, customHandler.handler)
    })
    return this
}
