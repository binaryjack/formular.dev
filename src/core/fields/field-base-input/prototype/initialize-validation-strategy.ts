import { ValueStrategy } from '@core/value-strategy/value-strategy'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldInput } from '../field-input-base-types'
import { Validator } from '@core/validation-strategy/validator'

export const initializeValidationStrategy = function (
    this: IFieldInput,
    ...parsers: IParserStrategy<any>[]
) {
    if (!this.prototype) {
        throw Error(
            `${initializeValidationStrategy.name}: the prototype of ${this.name} is not yes defined`
        )
    }
    try {
        this.prototype = { ...this.prototype, ...Validator.prototype }
        ValueStrategy.call(this, this)
        this.acceptValueStrategies(...parsers)
    } catch (e: any) {
        console.error(initializeValidationStrategy.name, e.message)
    }
}
