import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { ValidationStrategy } from '@core/validation-strategy/validation-strategy'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const initializeValidationStrategy = function (
    this: IFieldBaseInput,
    descriptor: IFieldDescriptor,
    ...parsers: IValidationMethodStrategy[]
): IFieldBaseInput {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?.tracker) {
            throw Error('tracker must be initialized')
        }

        if (parsers.length === 0) {
            throw Error('IValidationMethodStrategy: No parsers where setted')
        }

        if (Object.keys(descriptor?.validationOptions).length === 0) {
            throw Error('descriptor: validationOptions should not be empty')
        }
        this.validationStrategy = new ValidationStrategy()
        this?.validationStrategy.initializeValidationStrategy(descriptor)
        this?.validationStrategy.addValidationStrategies(...parsers)
        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initializeValidationStrategy.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return this
    }
}
