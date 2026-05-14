import { onFocus } from '../../input-base/events/on-focus'
import { IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Registers the onFocus event handler and an optional custom handler.
 * @param this DomRegisterBuilder instance
 * @param custom Optional custom handler
 * @returns The builder instance
 */
export const registerFocus = function (this: IDomRegisterBuilder, custom?: (e: Event) => void) {
    custom && this.registerEvent('onFocus', (e: Event) => custom(e))
    onFocus && this.registerEvent('onFocus', (e: Event) => onFocus(this.context, e))
    return this
}
