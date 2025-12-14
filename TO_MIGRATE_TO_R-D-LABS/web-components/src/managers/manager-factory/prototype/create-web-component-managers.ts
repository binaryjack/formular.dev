import { IManagerFactoryConfig } from '../../interfaces/i-manager-factory-config'
import { IWebComponentManagers } from '../../interfaces/i-web-component-managers'

/**
 * Creates enhanced manager instances for web components
 * Following CONTRIBUTING.md: Prototype method in individual file
 * 
 * This factory method creates manager instances from the core lib and extends them
 * with web component specific functionality through the extension pattern.
 */
export const createWebComponentManagers = function(this: any, config: IManagerFactoryConfig = {}): IWebComponentManagers {
    try {
        // Create manager instances using factory methods
        const managers = this.createManagerInstances(config)
        
        // Initialize all managers
        this.initializeManagers(managers, config)
        
        // Apply configuration
        this.configureManagers(managers, config)
        
        // Log initialization if debug mode is enabled
        if (config.enableDebugMode) {
            this.logManagerInitialization(managers)
        }

        return managers

    } catch (error) {
        console.error('Failed to create web component managers:', error)
        
        // Return fallback managers for development/testing
        return this.createFallbackManagers(config)
    }
}
