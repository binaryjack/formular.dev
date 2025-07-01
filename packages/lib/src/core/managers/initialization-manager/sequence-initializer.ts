import { IInputConfiguration } from '@setup/providers/interfaces/i-input-configuration'
import { InitializationManager } from './initialization-manager'
import { IInitializableDependency } from './initialization-manager.types'

// Helper function to initialize dependencies
export function sequenceInitializer(
    config: IInputConfiguration,
    dependencies: IInitializableDependency[]
): void {
    const IM = new InitializationManager(config)

    dependencies.forEach((dep) => {
        if (dep.dependencyName && dep.initialize) {
            IM.addInitializer(dep.dependencyName, dep.initialize.bind(dep))
        }
    })

    IM.executeSequences()
}
