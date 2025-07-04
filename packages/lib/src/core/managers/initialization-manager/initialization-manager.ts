import { IInputConfiguration } from '@setup/providers/interfaces/i-input-configuration'
import type { IInitializationManager } from './initialization-manager.types'
// import type { IInitializationDelegate } from './delegates/initialization-delegate'
// Import all prototype functions
import { addInitializer } from './prototype/add-initializer'
import { executeSequences } from './prototype/execute-sequences'

/**
 * InitializationManager constructor function.
 * @param params - The configuration parameters.
 */
export const InitializationManager = function (
    this: IInitializationManager,
    params: IInputConfiguration
) {
    this.params = params
    this.initializer = undefined
} as any as IInitializationManager

// Attach prototype functions
Object.assign(InitializationManager.prototype, {
    addInitializer,
    executeSequences
})
