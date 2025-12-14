import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * _detectShadowDOMSupport method for FwcElement
 * Detect Shadow DOM support
 */
export const _detectShadowDOMSupport = function(this: IFormularElementInstance): void {
    try {
        // Check if we're in a test environment or if this is a real DOM element
        const isTestEnvironment = typeof process !== 'undefined' && process.env.NODE_ENV === 'test'
        
        if (isTestEnvironment || !(this instanceof Element)) {
            // In test environment or when not a real DOM element, default to false
            this._shadowDOMSupport = false
            return
        }
        
        // Check if the element has shadow DOM capabilities
        this._shadowDOMSupport = typeof (this as any).attachShadow === 'function'
        
        // Also check if it already has a shadow root
        if (typeof (this as any).shadowRoot !== 'undefined') {
            this._shadowDOMSupport = true
        }
    } catch (error) {
        // If we can't access these properties, assume no shadow DOM support
        console.debug('Shadow DOM detection failed:', error)
        this._shadowDOMSupport = false
    }
}
