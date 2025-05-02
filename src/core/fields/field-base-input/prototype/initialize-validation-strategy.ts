import { ValidationStrategy } from '@core/validation-strategy/validation-strategy'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IFieldInput } from '../field-input-base-types'

export const initializeValidationStrategy = function (
    this: IFieldInput,
    ...parsers: IValidationMethodStrategy[]
) {
    if (!this._tracker) {
        throw Error(
            `${this.name} ${initializeValidationStrategy.name} needs to have field's traker preinitialized!`
        )
    }
    if (!this.prototype) {
        this.message(
            'critical',
            initializeValidationStrategy.name,
            `the prototype of ${this.name} is not yes defined`
        )
        return
    }
    try {
        if (parsers.length === 0) {
            this.message(
                'warning',
                initializeValidationStrategy.name,
                `an error has occured when initializing ${this.name}`
            )
        }

        this._validation = new ValidationStrategy()
        this._validation.addValidationStrategies(...parsers)
    } catch (e: any) {
        this.message(
            'critical',
            initializeValidationStrategy.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
