// Export all types and interfaces from initialization-manager
import type { IConfiguration } from '@project/provider/configuration/i-configuration'
import type { IInitializationDelegate } from './delegates/initialization-delegate'
export interface IInitializationManager {
    new (params: IConfiguration): IInitializationManager
    params: IConfiguration
    initializer?: IInitializationDelegate
    addInitializer: (name: string, initializer: (params: IConfiguration) => void) => void
    executeSequences: () => void
}
export interface IInitializableDependency {
    /*Discriminator Property*/
    readonly dependencyName: string
    /** says if the dependency has been initialized */
    isInitialized: boolean
    /** initializes the dependency */
    initialize: (params: IConfiguration) => void
}
