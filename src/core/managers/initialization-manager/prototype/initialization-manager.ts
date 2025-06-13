/**
 * InitializationManager constructor function.
 * @param params - The configuration parameters.
 */
import { IConfiguration } from '@project/provider/configuration/i-configuration'
import type { IInitializationManager } from '../initialization-manager.types'

export const InitializationManager = function (
    this: IInitializationManager,
    params: IConfiguration
) {
    this.params = params
    this.initializer = undefined
}
