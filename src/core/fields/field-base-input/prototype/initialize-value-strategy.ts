import { ValueStrategy } from '@core/value-strategy/value-strategy'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldInput } from '../field-input-base-types'

export const initializeValueStrategy = function (
    this: IFieldInput,
    ...parsers: IParserStrategy<any>[]
) {
    if (!this._tracker) {
        throw Error(
            `${this.name} ${initializeValueStrategy.name} needs to have field's traker preinitialized!`
        )
    }

    if (!this.prototype) {
        this.message(
            'critical',
            initializeValueStrategy.name,
            `the prototype of ${this.name} is not yes defined`
        )
        return
    }
    try {
        this._value = new ValueStrategy(this)
        this._value?.acceptValueStrategies(...parsers)
    } catch (e: any) {
        this.message(
            'critical',
            initializeValueStrategy.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
