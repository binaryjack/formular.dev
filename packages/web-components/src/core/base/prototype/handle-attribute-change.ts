import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * _handleAttributeChange method for FormularElement
 * Handle attribute changes
 */
export const _handleAttributeChange = function(this: IFormularElementInstance, name: string, oldValue: string | null, newValue: string | null): void {
    // Update style manager if style-related attributes change
    if (name.startsWith('data-style-') || name === 'class') {
        // Style manager integration will be implemented when needed
    }

    // Emit attribute change events
    if (this._notificationManager?.dispatchCustomEvent) {
        this._notificationManager.dispatchCustomEvent('attributeChange', {
            name,
            oldValue,
            newValue,
            element: this
        })
    }
}
