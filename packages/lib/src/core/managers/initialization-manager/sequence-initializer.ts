import { IInputConfiguration } from '@project/provider/interfaces/i-input-configuration'
import { InitializationManager } from './initialization-manager'
import { IInitializableDependency } from './initialization-manager.types'

// Helper function to initialize dependencies
export function sequenceInitializer(
    config: IInputConfiguration,
    dependencies: IInitializableDependency[]
): void {
    const IM = new InitializationManager(config)

    dependencies.forEach((dep) => {
        IM.addInitializer(dep.dependencyName, dep.initialize.bind(dep))
    })

    IM.executeSequences()
}
