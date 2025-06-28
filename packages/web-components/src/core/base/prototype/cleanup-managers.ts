import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * _cleanupManagers method for FormularElement
 * Cleanup managers when disconnected
 */
export const _cleanupManagers = function(this: IFormularElementInstance): void {
    // Cleanup managers - proper cleanup methods will be implemented when needed
    this._managersReady = false
}
