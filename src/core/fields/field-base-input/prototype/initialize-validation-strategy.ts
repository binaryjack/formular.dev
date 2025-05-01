import { ValidationStrategy } from '@core/validation-strategy/validation-strategy'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IFieldInput } from '../field-input-base-types'

export const initializeValidationStrategy = function (
    this: IFieldInput,
    ...parsers: IValidationMethodStrategy[]
) {
    if (!this.prototype) {
        throw Error(
            `${initializeValidationStrategy.name}: the prototype of ${this.name} is not yes defined`
        )
    }
    try {
        this.prototype = { ...this.prototype, ...ValidationStrategy.prototype }
        ValidationStrategy.call(this)
        this.addValidationStrategies(...parsers)
    } catch (e: any) {
        console.error(initializeValidationStrategy.name, e.message)
    }
}
