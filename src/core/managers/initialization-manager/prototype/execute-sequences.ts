/**
 * Executes the sequence of initializers in the InitializationManager.
 */
import type { IInitializationManager } from '../initialization-manager.types'

export const executeSequences = async function (this: IInitializationManager) {
    await this.initializer?.execute?.()
}
