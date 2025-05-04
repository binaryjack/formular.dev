import { ValidationStrategy } from '@core/validation-strategy/validation-strategy'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IFieldInput } from '../field-input-base-types'

export const initializeValidationStrategy = function (
    this: IFieldInput,
    ...parsers: IValidationMethodStrategy[]
): IFieldInput {
    try {
        if (!this._tracker) {
            throw Error('tracker must be initialized')
        }
        if (parsers.length === 0) {
            throw Error('IValidationMethodStrategy: No parsers where setted')
        }

        this._validation = new ValidationStrategy()
        this._validation.addValidationStrategies(...parsers)
        return this
    } catch (e: any) {
        this.message(
            'critical',
            initializeValidationStrategy.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
        return this
    }
}
