import { IInputConfiguration } from '@setup/providers/interfaces/i-input-configuration'
import { IValidationManager } from '../validation-manager.types'

export const initialize = function (this: IValidationManager, config?: IInputConfiguration) {
    if (config?.validationStrategies?.length) {
        this.addValidationStrategies(...config.validationStrategies)
    }

    if (config?.triggerKeyWordType?.length) {
        this.setTriggerKeyWord(config.triggerKeyWordType)
    }

    this.isInitialized = true
}
