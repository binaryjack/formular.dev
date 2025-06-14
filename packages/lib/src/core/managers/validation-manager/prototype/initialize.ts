import { logManager } from '@core/managers/log-manager/log-manager'
import { IValidationManager } from '../validation-manager.types'

export const initialize = function (this: IValidationManager) {
    logManager(undefined, 'info', 'initialize', this.dependencyName)
    this.isInitialized = true
}
