import { IAria } from '@core/managers/dom-manager/dom-manager.types'
import { IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Registers ARIA attributes to be included in the element build.
 * @param this DomRegisterBuilder instance
 * @param arias List of ARIA attributes
 * @returns The builder instance
 */
export const registerAria = function (this: IDomRegisterBuilder, ...arias: IAria[]) {
    // Store ARIA attributes in the element object to be returned by build()
    if (!this.arias) {
        this.arias = []
    }
    this.arias.push(...(arias ?? []))
    return this
}
