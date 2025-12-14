import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * _setupAttributeReactivity method for FormularElement
 * Setup attribute reactivity
 */
export const _setupAttributeReactivity = function(this: IFormularElementInstance): void {
    this._attributeReactivity = true
}
