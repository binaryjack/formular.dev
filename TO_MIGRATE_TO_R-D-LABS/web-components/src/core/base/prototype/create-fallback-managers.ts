import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * _createFallbackManagers method for FormularElement
 * Create fallback manager implementations for testing
 */
export const _createFallbackManagers = function(this: IFormularElementInstance): void {
    this._domManager = {
        initialize: () => {},
        extend: function(name: string, extension: Record<string, any>) {
            this.extensions = this.extensions ?? new Map()
            this.extensions.set(name, extension)
            Object.assign(this, extension)
        },
        hasExtension: function(name: string) {
            return this.extensions?.has(name) ?? false
        }
    } as any

    // StyleManager is optional for basic web components - set to null
    this._styleManager = null

    this._notificationManager = {
        initialize: () => {},
        extend: function(name: string, extension: Record<string, any>) {
            this.extensions = this.extensions ?? new Map()
            this.extensions.set(name, extension)
            Object.assign(this, extension)
        },
        hasExtension: function(name: string) {
            return this.extensions?.has(name) ?? false
        }
    } as any
}
