import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * _setupDOMExtensions method for FormularElement
 * Setup DOM manager extensions for web components
 */
export const _setupDOMExtensions = function(this: IFormularElementInstance): void {
    if (!this._domManager?.extend) return

    const webComponentExtension = {
        setupShadowRoot: function(this: any) {
            this.shadowRootSetup = true
        },
        registerWebComponent: function(this: any, element: HTMLElement) {
            this.registeredElements = this.registeredElements ?? new Set()
            this.registeredElements.add(element)
        }
    }

    this._domManager.extend('webComponents', webComponentExtension)
}
