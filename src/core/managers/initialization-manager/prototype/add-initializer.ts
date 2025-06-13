/**
 * Adds an initializer delegate to the InitializationManager sequence.
 * @param name - The name of the initializer.
 * @param initializer - The initializer function.
 */
import { IConfiguration } from '@project/provider/configuration/i-configuration'
import { InitializationDelegate } from '../delegates/initialization-delegate'
import type { IInitializationManager } from '../initialization-manager.types'

export const addInitializer = function (
    this: IInitializationManager,
    name: string,
    initializer: (params: IConfiguration) => void
) {
    const newDelegate = new InitializationDelegate(name, this, initializer)

    if (!this.initializer) {
        this.initializer = newDelegate
    } else {
        this.initializer?.setNextSequence?.(newDelegate)
    }
}
