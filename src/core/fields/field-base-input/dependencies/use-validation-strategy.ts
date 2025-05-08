import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { logManager } from '@core/general-logging-manager/log-manager'
import { ValidationStrategy } from '@core/validation-strategy/validation-strategy'
import { IValidationStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const useValidationStrategy = function (
    this: IFieldBaseInput,
    descriptor: IFieldDescriptor,
    validationStrategyInstance: IValidationStrategy
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
        this.validationStrategy = new ValidationStrategy()
        // this?.validationStrategy.initializeValidationStrategy(descriptor)
        // this?.validationStrategy.addValidationStrategies(...parsers)
        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useValidationStrategy.name,
            `an error has occured when initializing initializeValidationStrategy ${this.name} class: ${e.message}`
        )
        return this
    }
}
