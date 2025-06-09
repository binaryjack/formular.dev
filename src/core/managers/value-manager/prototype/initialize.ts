import { logManager } from '@core/managers/log-manager/log-manager'
import { IValueManager } from '../value-manager.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (this: IValueManager) {
    try {
        this.isInitialized = true
    } catch (e: any) {
        logManager(undefined, 'critical', this.dependencyName, e?.message ?? e.toString())
    }
}
