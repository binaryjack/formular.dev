// Export all types and interfaces from initialization-manager
import type { IInputConfiguration } from '@project/provider/interfaces/i-input-configuration'
import type { IInitializationDelegate } from './delegates/initialization-delegate'
export interface IInitializationManager {
    new (params: IInputConfiguration): IInitializationManager
    params: IInputConfiguration
    initializer?: IInitializationDelegate
    addInitializer: (name: string, initializer: (params: IInputConfiguration) => void) => void
    executeSequences: () => void
}
export interface IInitializableDependency {
    /*Discriminator Property*/
    readonly dependencyName: string
    /** says if the dependency has been initialized */
    isInitialized: boolean
    /** initializes the dependency */
    initialize: (params: IInputConfiguration) => void
}
