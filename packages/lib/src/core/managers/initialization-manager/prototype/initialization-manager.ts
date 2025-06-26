/**
 * InitializationManager constructor function.
 * @param params - The configuration parameters.
 */
import { IInputConfiguration } from '@project/providers/interfaces/i-input-configuration'
import type { IInitializationManager } from '../initialization-manager.types'

export const InitializationManager = function (
    this: IInitializationManager,
    params: IInputConfiguration
) {
    this.params = params
    this.initializer = undefined
}

