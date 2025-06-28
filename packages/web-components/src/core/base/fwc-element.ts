/**
 * Enhanced Custom Element Base using Prototype-based Pattern
 * 
 * Provides a robust foundation for web components that integrates with the formular.dev.lib
 * manager system. This base constructor automatically initializes and manages DOM, Style, and 
 * Notification managers with their extended capabilities.
 * 
 * Features:
 * - Automatic manager initialization and cleanup
 * - Shadow DOM support with style isolation
 * - Attribute reactivity with manager integration
 * - Extension method support for all managers
 * - Lifecycle hooks for custom behavior
 * 
 * @example
 * ```typescript
 * // Define a custom element using prototype-based pattern
 * export const MyCustomElement = function(this: IFormularElementInstance) {
 *   FwcElement.call(this)
 * }
 * 
 * // Set up prototype inheritance
 * MyCustomElement.prototype = Object.create(FwcElement.prototype)
 * MyCustomElement.prototype.constructor = MyCustomElement
 * 
 * // Define observed attributes
 * MyCustomElement.observedAttributes = ['value', 'disabled']
 * 
 * // Override connectedCallback
 * MyCustomElement.prototype.connectedCallback = function(this: IFormularElementInstance) {
 *   FwcElement.prototype.connectedCallback.call(this)
 *   // Use extended managers
 *   this.domManager.setupWebComponent(this)
 *   this.styleManager.applyCSSVariables({ 'primary-color': '#007bff' })
 * }
 * 
 * // Register the custom element
 * customElements.define('my-custom-element', MyCustomElement as any)
 * ```
 */

import type { IFormularElementInstance } from './interfaces/i-formular-element-instance'
import {
    _cleanupManagers,
    _createFallbackManagers,
    _detectShadowDOMSupport,
    _finalizeManagerInitialization,
    _handleAttributeChange,
    _initializeManagers,
    _setupAttributeReactivity,
    _setupDOMExtensions,
    _setupNotificationExtensions,
    _setupStyleExtensions,
    _setupWebComponentExtensions,
    attributeChangedCallback,
    connectedCallback,
    disconnectedCallback
} from './prototype'

/**
 * FwcElement Constructor Function (Formular Web Components Element)
 * Following CONTRIBUTING.md: Using prototype-based approach instead of class syntax
 * 
 * Note: For custom elements extending HTMLElement, we need to use a different pattern
 * since HTMLElement cannot be called directly. This constructor will be called via
 * the custom element registration process.
 */
export const FwcElement = function(this: IFormularElementInstance) {
    // Manager instances with extension support
    this._domManager = null
    this._styleManager = null
    this._notificationManager = null
    
    // State tracking
    this._managersReady = false
    this._shadowDOMSupport = false
    this._attributeReactivity = false
    
    // Initialize the element
    this._initializeManagers()
    this._setupAttributeReactivity()
    this._detectShadowDOMSupport()
    
    return this
}

// Set up prototype inheritance from HTMLElement
FwcElement.prototype = Object.create(HTMLElement.prototype)
FwcElement.prototype.constructor = FwcElement

/**
 * Manager getter properties using Object.defineProperty for proper prototyping
 */
Object.defineProperty(FwcElement.prototype, 'domManager', {
    get: function(this: IFormularElementInstance) {
        if (!this._domManager) {
            throw new Error('DOMManager not initialized. Call super.connectedCallback() first.')
        }
        return this._domManager
    },
    enumerable: true,
    configurable: true
})

Object.defineProperty(FwcElement.prototype, 'styleManager', {
    get: function(this: IFormularElementInstance) {
        // StyleManager is optional for basic web components
        return this._styleManager ?? null
    },
    enumerable: true,
    configurable: true
})

Object.defineProperty(FwcElement.prototype, 'notificationManager', {
    get: function(this: IFormularElementInstance) {
        if (!this._notificationManager) {
            throw new Error('NotificationManager not initialized. Call super.connectedCallback() first.')
        }
        return this._notificationManager
    },
    enumerable: true,
    configurable: true
})

// State getter properties
Object.defineProperty(FwcElement.prototype, 'isManagersReady', {
    get: function(this: IFormularElementInstance) {
        return this._managersReady
    },
    enumerable: true,
    configurable: true
})

Object.defineProperty(FwcElement.prototype, 'hasShadowDOMSupport', {
    get: function(this: IFormularElementInstance) {
        return this._shadowDOMSupport
    },
    enumerable: true,
    configurable: true
})

Object.defineProperty(FwcElement.prototype, 'hasAttributeReactivity', {
    get: function(this: IFormularElementInstance) {
        return this._attributeReactivity
    },
    enumerable: true,
    configurable: true
})

/**
 * Assign all prototype methods following CONTRIBUTING.md style
 * Methods are imported from individual files in the prototype folder
 */
Object.assign(FwcElement.prototype, {
    connectedCallback,
    disconnectedCallback,
    attributeChangedCallback,
    _initializeManagers,
    _createFallbackManagers,
    _finalizeManagerInitialization,
    _setupWebComponentExtensions,
    _setupDOMExtensions,
    _setupStyleExtensions,
    _setupNotificationExtensions,
    _setupAttributeReactivity,
    _detectShadowDOMSupport,
    _handleAttributeChange,
    _cleanupManagers
})
