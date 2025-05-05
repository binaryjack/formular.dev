import { genericAccsssor } from '@core/fields/field-base-input/accessors/generic-accessor'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import {
    ValidationStrategy,
    ValidationStrategyInstance
} from '@core/validation-strategy/validation-strategy'
import {
    IValidationMethodStrategy,
    IValidationStrategy
} from '@core/validation-strategy/validation-strategy.types'
import { IFieldBuilder } from '../field-builder'

export const initializeValidationStrategy = function (
    this: IFieldBuilder,
    descriptor: IFieldDescriptor,
    ...parsers: IValidationMethodStrategy[]
): IFieldBuilder {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?._tracker) {
            throw Error('tracker must be initialized')
        }

        if (parsers.length === 0) {
            throw Error('IValidationMethodStrategy: No parsers where setted')
        }

        if (Object.keys(descriptor?.validationOptions).length === 0) {
            throw Error('descriptor: validationOptions should not be empty')
        }
        this._validation = new ValidationStrategy()
        ValidationStrategyInstance(this._validation)

        this.validationStrategy = genericAccsssor<IValidationStrategy>('_validation')
        this?.validationStrategy().initializeValidationStrategy(descriptor)
        this?.validationStrategy().addValidationStrategies(...parsers)
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
