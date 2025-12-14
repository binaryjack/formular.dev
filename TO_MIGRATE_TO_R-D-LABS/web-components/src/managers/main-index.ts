/**
 * Managers module main index
 * Following CONTRIBUTING.md: Exporting all relevant objects/types
 */

// Export manager factory and singleton
export {
    createWebComponentManagers,
    defaultManagerConfig,
    validateWebComponentManagers,
    WebComponentDomManager,
    webComponentManagers,
    WebComponentNotificationManager,
    WebComponentStyleManager
} from './manager-factory/manager-factory'

// Export reactive manager
export { ReactiveManager, reactiveManager } from './reactive-manager/reactive-manager'

// Export extension modules
export { WebComponentDOMExtensions } from './extensions/dom-extensions'
export { WebComponentNotificationExtensions } from './extensions/notification-extensions'
export { WebComponentStyleExtensions } from './extensions/style-extensions'

// Export all interfaces
export * from './interfaces'

