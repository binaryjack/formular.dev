import { onChange } from '../../input-base/events/on-changed'
import { IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Registers the onChange event handler and an optional custom handler.
 * @param this DomRegisterBuilder instance
 * @param custom Optional custom handler
 * @returns The builder instance
 */
export const registerChange = function (this: IDomRegisterBuilder, custom?: (e: Event) => void) {
    custom && this.registerEvent('onChange', (e: Event) => custom(e))
    if (onChange) {
        this.registerEvent('onChange', (e: Event) => {
            onChange(this.context, e)
        })
    }
    return this
}
