import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * attributeChangedCallback method for FormularElement
 * Called when observed attributes change
 */
export const attributeChangedCallback = function(this: IFormularElementInstance, name: string, oldValue: string | null, newValue: string | null): void {
    if (!this._managersReady) return
    
    // Update managers based on attribute changes
    this._handleAttributeChange(name, oldValue, newValue)
}
