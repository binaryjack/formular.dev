import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'

import { logManager } from '@core/managers/log-manager/log-manager'
import { ValidationManager } from '@core/managers/validation-manager/validation-manager'
import { IValidationManager } from '@core/managers/validation-manager/validation-manager.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const useValidationManager = function (
    this: IFieldBaseInput,
    descriptor: IFieldDescriptor,
    validationStrategyInstance: IValidationManager
    // ...parsers: IValidationMethodStrategy[]
): IFieldBaseInput {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        // if (!this?.tracker) {
        //     throw Error('tracker must be initialized')
        // }

        // if (parsers.length === 0) {
        //     throw Error('IValidationMethodStrategy: No parsers where setted')
        // }

        // if (Object.keys(descriptor?.validationOptions).length === 0) {
        //     throw Error('descriptor: validationOptions should not be empty')
        // }
        this.validationManager = new ValidationManager()
        // this?.validationStrategy.initializeValidationStrategy(descriptor)
        // this?.validationStrategy.addValidationStrategies(...parsers)
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
