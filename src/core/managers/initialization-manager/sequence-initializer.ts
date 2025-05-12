import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { InitializationManager } from './initialization-manager'
import { IInitializableDependency } from './initialization-manager.types'

// Helper function to initialize dependencies
export function sequenceInitializer(
    config: IDependencyConfiguration,
    dependencies: IInitializableDependency[]
): void {
    const IM = new InitializationManager(config?.initialization!)

    dependencies.forEach((dep) => {
        IM.addInitializer(dep.dependencyName, dep.initialize.bind(dep))
    })

    IM.executeSequences()
}
