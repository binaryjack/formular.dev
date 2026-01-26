import { logManager } from '@core/managers/log-manager/log-manager'
import { IInputConfiguration } from '@setup/providers/interfaces/i-input-configuration'
import { IValueManager } from '../value-manager.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (this: IValueManager, config?: IInputConfiguration) {
    try {
        // Accept value strategies from config if provided
        if (config?.valueStrategies && config.valueStrategies.length > 0) {
            this.acceptValueStrategies(...config.valueStrategies)
        }

        this.isInitialized = true
    } catch (e: any) {
        logManager(undefined, 'critical', this.dependencyName, e?.message ?? e.toString())
    }
}
