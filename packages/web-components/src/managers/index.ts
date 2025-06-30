/**
 * Web Components Managers Module
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Central export point for all web component managers and extensions
 */

// Export the manager factory and its components
export {
    defaultManagerConfig, ManagerFactory, managerFactory, validateWebComponentManagers, WebComponentDomManager, webComponentManagers, WebComponentNotificationManager,
    WebComponentStyleManager
} from './manager-factory'

// Export types from interfaces
export type { IManagerFactoryConfig, IWebComponentManagers } from './interfaces'
export type { IManagerFactory } from './manager-factory/types'

// Export the ReactiveManager for direct use
export { ReactiveManager, reactiveManager } from './reactive-manager/reactive-manager'

// Export extension modules for advanced usage
export { WebComponentDOMExtensions } from './extensions/dom-extensions'
export { WebComponentNotificationExtensions } from './extensions/notification-extensions'
export { WebComponentStyleExtensions } from './extensions/style-extensions'

