import { onBlur } from '../../input-base/events/on-blur'
import { IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Registers the onBlur event handler and an optional custom handler.
 * @param this DomRegisterBuilder instance
 * @param custom Optional custom handler
 * @returns The builder instance
 */
export const registerBlur = function (this: IDomRegisterBuilder, custom?: (e: Event) => void) {
    custom && this.registerEvent('onBlur', (e: Event) => custom(e))
    onBlur && this.registerEvent('onBlur', (e: Event) => onBlur(this.context, e))
    return this
}
