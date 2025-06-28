/**
 * Interface for FormularElement instance properties and methods
 * Following CONTRIBUTING.md: One interface per file with I prefix
 */
export interface IFormularElementInstance extends HTMLElement {
    // Manager instances
    _domManager: any
    _styleManager: any
    _notificationManager: any
    
    // State tracking
    _managersReady: boolean
    _shadowDOMSupport: boolean
    _attributeReactivity: boolean
    
    // Manager getters
    readonly domManager: any
    readonly styleManager: any
    readonly notificationManager: any
    
    // State getters
    readonly isManagersReady: boolean
    readonly hasShadowDOMSupport: boolean
    readonly hasAttributeReactivity: boolean
    
    // Lifecycle methods
    connectedCallback(): void
    disconnectedCallback(): void
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void
    
    // Private/internal methods
    _initializeManagers(): void
    _createFallbackManagers(): void
    _finalizeManagerInitialization(): void
    _setupWebComponentExtensions(): void
    _setupDOMExtensions(): void
    _setupStyleExtensions(): void
    _setupNotificationExtensions(): void
    _setupAttributeReactivity(): void
    _detectShadowDOMSupport(): void
    _handleAttributeChange(name: string, oldValue: string | null, newValue: string | null): void
    _cleanupManagers(): void
}
