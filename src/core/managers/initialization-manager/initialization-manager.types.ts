import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'

export interface IInitializableDependency {
    /*Discriminator Property*/
    readonly dependencyName: string
    /** says if the dependency has been initialized */
    isInitialized: boolean
    /** initializes the dependency */
    initialize: (params: IFieldInitializationParameters) => void
}
