import { onClickOption } from '@core/input-engine/variants/click-base/events/on-click-option'
import { IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Registers the onClickOption event handler for a specific option.
 * @param this DomRegisterBuilder instance
 * @param optionId The option id
 * @returns The builder instance
 */
export const registerClickOption = function (this: IDomRegisterBuilder, optionId: string) {
    this.onClickOption = (e: Event) => onClickOption(this.context, optionId, e)
    return this
}
