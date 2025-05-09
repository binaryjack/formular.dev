import { IDependencyConfiguration } from '@core/fields/field-base-input/configuration/dependency-configuration'
import { IInitializableDependency } from '@core/fields/field-base-input/field-input-base-types'
import { InitializationManager } from '@core/initializer/manager/initialization-manager'

// Helper function to initialize dependencies
export function initializeDependencies(
    config: IDependencyConfiguration,
    dependencies: IInitializableDependency[]
): void {
    const IM = new InitializationManager(config?.initialization!)

    dependencies.forEach((dep) => {
        IM.addInitializer(dep.dependencyName, dep.initialize.bind(dep))
    })

    IM.executeSequences()
}
