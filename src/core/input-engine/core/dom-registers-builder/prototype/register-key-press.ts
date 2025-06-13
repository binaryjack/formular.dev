import { onKeyPress } from '../../input-base/events/on-key-press'
import { IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Registers the onKeyPress event handler and an optional custom handler.
 * @param this DomRegisterBuilder instance
 * @param custom Optional custom handler
 * @returns The builder instance
 */
export const registerKeyPress = function (
    this: IDomRegisterBuilder,
    custom?: (e: KeyboardEvent) => void
) {
    custom && this.registerEvent('onKeyPress', (e: KeyboardEvent) => custom(e))
    onKeyPress &&
        this.registerEvent('onKeyPress', (e: KeyboardEvent) => onKeyPress(this.context, e))
    return this
}
