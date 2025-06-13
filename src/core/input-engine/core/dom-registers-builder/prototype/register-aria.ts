import { IAria } from '@core/managers/dom-manager/dom-manager.types'
import { AriaHelper } from '../../accessibility/arias'
import { IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Registers ARIA attributes using AriaHelper.
 * @param this DomRegisterBuilder instance
 * @param arias List of ARIA attributes
 * @returns The builder instance
 */
export const registerAria = function (this: IDomRegisterBuilder, ...arias: IAria[]) {
    const ah = new AriaHelper()
    ah.addMany(...(arias ?? []))
    ah.apply(this.context.input)
    return this
}
