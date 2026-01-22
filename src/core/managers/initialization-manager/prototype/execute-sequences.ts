/**
 * Executes the sequence of initializers in the InitializationManager.
 */
import type { IInitializationManager } from '../initialization-manager.types'

export const executeSequences = function (this: IInitializationManager) {
    this.initializer?.execute?.()
}
