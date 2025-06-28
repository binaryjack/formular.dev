import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * disconnectedCallback method for FormularElement
 * Called when element is disconnected from the DOM
 */
export const disconnectedCallback = function(this: IFormularElementInstance): void {
    this._cleanupManagers()
    this._managersReady = false
}
