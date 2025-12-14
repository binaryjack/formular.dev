import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * _initializeManagers method for FwcElement
 * Initialize manager instances with fallback for testing
 */
export const _initializeManagers = function(this: IFormularElementInstance): void {
    try {
        // Import managers dynamically to avoid circular dependencies
        const { DomManager, NotificationManager } = require('formular.dev.lib')

        // Create managers using the same pattern as in setup-managers.ts
        this._domManager = new DomManager()
        this._notificationManager = new NotificationManager()
        
        // StyleManager is designed for form inputs with tracking - not needed for basic web components
        // If style management is needed later, consider creating a simplified web component style manager
        this._styleManager = null

        // Initialize managers
        this._domManager.initialize()
        this._notificationManager.initialize()
    } catch (error) {
        console.warn('Failed to initialize managers:', error)
        // Provide fallback implementations for testing
        this._createFallbackManagers()
    }
}
