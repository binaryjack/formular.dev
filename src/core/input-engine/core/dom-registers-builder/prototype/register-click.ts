import { onClick } from '../../../variants/click-base/events/on-click'
import { IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Registers the onClick event handler and an optional custom handler.
 * @param this DomRegisterBuilder instance
 * @param custom Optional custom handler
 * @returns The builder instance
 */
export const registerClick = function (this: IDomRegisterBuilder, custom?: (e: Event) => void) {
    custom && this.registerEvent('onClick', (e: Event) => custom(e))
    onClick && this.registerEvent('onClick', (e: Event) => onClick(this.context, e))
    return this
}
