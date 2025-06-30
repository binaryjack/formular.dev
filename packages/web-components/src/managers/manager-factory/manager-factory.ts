/**
 * Manager Factory for Web Components
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Creates enhanced manager instances with web component extensions
 * This is the central point for setting up all managers with their extensions
 */

import { IManagerFactoryConfig } from '../interfaces/i-manager-factory-config'
import { IWebComponentManagers } from '../interfaces/i-web-component-managers'
import { IManagerFactory } from './interfaces/i-manager-factory'
// Import all prototype methods
import {
    configureManagers, createFallbackManagers, createManagerInstances, createWebComponentManagers,
    initializeManagers, logManagerInitialization, validateWebComponentManagers,
    WebComponentDomManager, WebComponentNotificationManager, WebComponentStyleManager
} from './prototype'

/**
 * ManagerFactory Constructor Function
 * Following CONTRIBUTING.md: Using prototype-based approach instead of class syntax
 */
export const ManagerFactory = function(this: IManagerFactory) {
    // Store constructor references for use in prototype methods
    this.WebComponentDomManager = WebComponentDomManager
    this.WebComponentStyleManager = WebComponentStyleManager  
    this.WebComponentNotificationManager = WebComponentNotificationManager
    
    return this
} as any

// Assign all prototype methods
Object.assign(ManagerFactory.prototype, {
    createWebComponentManagers,
    createManagerInstances,
    initializeManagers,
    configureManagers,
    logManagerInitialization,
    createFallbackManagers,
    validateWebComponentManagers
})

/**
 * Default manager factory configuration
 */
export const defaultManagerConfig: IManagerFactoryConfig = {
    enableDebugMode: process.env.NODE_ENV === 'development',
    batchUpdateDelay: 16, // ~60fps
    templateCacheSize: 50,
    notificationHistorySize: 100
}

/**
 * Singleton instance of the manager factory
 */
export const managerFactory = new (ManagerFactory)()

/**
 * Singleton instance of web component managers
 * Use this for consistent manager instances across your application
 */
export const webComponentManagers: IWebComponentManagers = managerFactory.createWebComponentManagers(defaultManagerConfig)

// Export the individual manager constructors for direct use if needed
export { WebComponentDomManager, WebComponentNotificationManager, WebComponentStyleManager }

// Export the validation function for standalone use
export { validateWebComponentManagers }

