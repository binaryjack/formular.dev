/**
 * Web Components Managers Module
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Central export point for all web component managers and extensions
 */

// Export the manager factory and validation utilities
export {
    createWebComponentManagers,
    defaultManagerConfig,
    validateWebComponentManagers, WebComponentDomManager, webComponentManagers, WebComponentNotificationManager, WebComponentStyleManager
} from './manager-factory/manager-factory'

// Export types from interfaces
export type { IManagerFactoryConfig, IWebComponentManagers } from './interfaces'

// Export the ReactiveManager for direct use
export { ReactiveManager, reactiveManager } from './reactive-manager/reactive-manager'

// Export extension modules for advanced usage
export { WebComponentDOMExtensions } from './extensions/dom-extensions'
export { WebComponentNotificationExtensions } from './extensions/notification-extensions'
export { WebComponentStyleExtensions } from './extensions/style-extensions'

// Re-export useful types (if needed for external use)
export type { }

