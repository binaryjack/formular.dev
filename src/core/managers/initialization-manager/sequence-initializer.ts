import { IInputConfiguration } from '@setup/providers/interfaces/i-input-configuration'
import { InitializationManager } from './initialization-manager'
import { IInitializableDependency } from './initialization-manager.types'

// Helper function to initialize dependencies
export async function sequenceInitializer(
    config: IInputConfiguration,
    dependencies: IInitializableDependency[]
): Promise<void> {
    const IM = new InitializationManager(config)

    dependencies.forEach((dep) => {
        if (!dep) return
        IM.addInitializer(dep?.dependencyName, dep?.initialize.bind(dep))
    })

    await IM.executeSequences()
}
