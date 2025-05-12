import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'

import { logManager } from '@core/managers/log-manager/log-manager'
import { IValidationManager } from '../validation-manager.types'

export const initialize = function (
    this: IValidationManager,
    params: IFieldInitializationParameters
) {
    logManager(undefined, 'info', 'initialize', this.dependencyName)

    if (params.validationTriggerModeType.length === 0) {
        logManager(
            undefined,
            'warning',
            this.dependencyName,
            `No validation Trigger Mode were provided, the default 'onSubmit', 'onBlur' is set.`
        )

        this.setValidationTriggerMode(['onSubmit', 'onBlur'])
    } else {
        this.setValidationTriggerMode(params.validationTriggerModeType)
    }

    if (params.validationStrategies.length === 0) {
        logManager(
            undefined,
            'warning',
            this.dependencyName,
            `No validation Strategies were provided, the validation will not operates!`
        )
    } else {
        this.addValidationStrategies(...params.validationStrategies)
    }

    this.isInitialized = true
}
