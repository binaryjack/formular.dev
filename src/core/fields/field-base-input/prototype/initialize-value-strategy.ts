import { ValueStrategy } from '@core/value-strategy/value-strategy'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldInput } from '../field-input-base-types'

export const initializeValueStrategy = function (
    this: IFieldInput,
    ...parsers: IParserStrategy<any>[]
) {
    if (!this.prototype) {
        throw Error(
            `${initializeValueStrategy.name}: the prototype of ${this.name} is not yes defined`
        )
    }
    try {
        this.prototype = { ...this.prototype, ...ValueStrategy.prototype }
        ValueStrategy.call(this, this)
        this.acceptValueStrategies(...parsers)
    } catch (e: any) {
        console.error(initializeValueStrategy.name, e.message)
    }
}
