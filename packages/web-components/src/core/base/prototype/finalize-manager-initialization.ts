import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * _finalizeManagerInitialization method for FormularElement
 * Finalize manager initialization when connected
 */
export const _finalizeManagerInitialization = function(this: IFormularElementInstance): void {
    // Register this element with DOM manager
    if (this._domManager) {
        this._domManager.register?.(this)
    }

    // Setup style manager for this element
    if (this._styleManager && (this as any).id) {
        // Element-specific style initialization will be implemented when needed
    }
}
