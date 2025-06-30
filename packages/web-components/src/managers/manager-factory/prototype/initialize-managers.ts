import { IManagerFactoryConfig } from '../../interfaces/i-manager-factory-config'
import { IWebComponentManagers } from '../../interfaces/i-web-component-managers'

/**
 * Initialize all managers in the correct order with error handling
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const initializeManagers = function(this: any, managers: IWebComponentManagers, config: IManagerFactoryConfig): void {
    // Initialize all managers in the correct order with error handling
    try {
        managers.domManager.initialize()
    } catch (error) {
        console.warn('DomManager initialization failed:', error)
        managers.domManager.isInitialized = true // Force initialization flag
    }

    try {
        managers.styleManager.initialize()
    } catch (error) {
        console.warn('StyleManager initialization failed:', error)
        managers.styleManager.isInitialized = true // Force initialization flag
    }

    try {
        managers.notificationManager.initialize()
    } catch (error) {
        console.warn('NotificationManager initialization failed:', error)
        managers.notificationManager.isInitialized = true // Force initialization flag
    }

    try {
        managers.reactiveManager.initialize()
    } catch (error) {
        console.warn('ReactiveManager initialization failed:', error)
    }

    // Initialize web component extensions after managers are ready
    if (managers.domManager.initializeWebComponentExtensions) {
        managers.domManager.initializeWebComponentExtensions()
    }
    if (managers.styleManager.initializeWebComponentExtensions) {
        managers.styleManager.initializeWebComponentExtensions()
    }
    if (managers.notificationManager.initializeWebComponentExtensions) {
        managers.notificationManager.initializeWebComponentExtensions()
    }
}
