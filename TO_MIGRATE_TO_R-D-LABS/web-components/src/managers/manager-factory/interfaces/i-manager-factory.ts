import { IManagerFactoryConfig } from '../../interfaces/i-manager-factory-config'
import { IWebComponentManagers } from '../../interfaces/i-web-component-managers'

/**
 * Interface for ManagerFactory
 * Following CONTRIBUTING.md: One interface per file
 */
export interface IManagerFactory {
    // Constructor references for prototype methods
    WebComponentDomManager: any
    WebComponentStyleManager: any
    WebComponentNotificationManager: any
    
    // Prototype methods
    createWebComponentManagers(config?: IManagerFactoryConfig): IWebComponentManagers
    createManagerInstances(config: IManagerFactoryConfig): IWebComponentManagers
    initializeManagers(managers: IWebComponentManagers, config: IManagerFactoryConfig): void
    configureManagers(managers: IWebComponentManagers, config: IManagerFactoryConfig): void
    logManagerInitialization(managers: IWebComponentManagers): void
    createFallbackManagers(config?: IManagerFactoryConfig): IWebComponentManagers
    validateWebComponentManagers(managers: IWebComponentManagers): {
        isValid: boolean
        errors: string[]
        warnings: string[]
    }
}
