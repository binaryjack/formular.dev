import { onKeyUp } from '../../input-base/events/on-key-up'
import { IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Registers the onKeyUp event handler and an optional custom handler.
 * @param this DomRegisterBuilder instance
 * @param custom Optional custom handler
 * @returns The builder instance
 */
export const registerKeyUp = function (
    this: IDomRegisterBuilder,
    custom?: (e: KeyboardEvent) => void
) {
    custom && this.registerEvent('onKeyUp', (e: KeyboardEvent) => custom(e))
    onKeyUp && this.registerEvent('onKeyUp', (e: KeyboardEvent) => onKeyUp(this.context, e))
    return this
}
