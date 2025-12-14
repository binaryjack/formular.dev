import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * connectedCallback method for FormularElement
 * Called when element is connected to the DOM
 */
export const connectedCallback = function(this: IFormularElementInstance): void {
    this._finalizeManagerInitialization()
    this._setupWebComponentExtensions()
    this._managersReady = true
}
