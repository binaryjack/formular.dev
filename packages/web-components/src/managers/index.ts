/**
 * Web Components Managers Module
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Central export point for all web component managers and extensions
 */

// Export the manager factory and validation utilities
export {
    createWebComponentManagers, defaultManagerConfig, validateWebComponentManagers, webComponentManagers
} from './manager-factory'

// Export types
export type { ManagerFactoryConfig, WebComponentManagers } from './manager-factory'

// Export the ReactiveManager for direct use
export { ReactiveManager, reactiveManager } from './reactive-manager'

// Export extension modules for advanced usage
export { WebComponentDOMExtensions } from './extensions/dom-extensions'
export { WebComponentNotificationExtensions } from './extensions/notification-extensions'
export { WebComponentStyleExtensions } from './extensions/style-extensions'

// Re-export useful types (if needed for external use)
export type { }

