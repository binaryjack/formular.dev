import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * _setupWebComponentExtensions method for FormularElement
 * Setup web component specific extensions
 */
export const _setupWebComponentExtensions = function(this: IFormularElementInstance): void {
    // Add web component specific extensions to managers
    this._setupDOMExtensions()
    this._setupStyleExtensions()
    this._setupNotificationExtensions()
}
