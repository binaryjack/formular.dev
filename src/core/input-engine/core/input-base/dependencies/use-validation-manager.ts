import { logManager } from '@core/managers/log-manager/log-manager'
import { IValidationManager } from '@core/managers/validation-manager/validation-manager.types'
import { IInputBase } from '../input-base.types'

export const useValidationManager = function (
    this: IInputBase,
    validationStrategyInstance: IValidationManager
): IInputBase {
    try {
        this.validationManager = validationStrategyInstance
        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useValidationManager.name,
            `an error has occured when initializing initializeValidationStrategy ${this.name} class: ${e.message}`
        )
        return this
    }
}
