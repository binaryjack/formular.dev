import { ValueStrategy } from '@core/value-strategy/value-strategy'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldInput, IFieldInputExtended } from '../field-input-base-types'

export const initializeValueStrategy = function (
    this: IFieldInput,
    ...parsers: IParserStrategy<any>[]
): IFieldInput {
    try {
        if (!this._tracker) {
            throw Error('tracker must be initialized')
        }

        this._value = new ValueStrategy()
        this._value.initialize(this as IFieldInputExtended)
        this._value.acceptValueStrategies(...parsers)
        return this
    } catch (e: any) {
        this.message(
            'critical',
            initializeValueStrategy.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
        return this
    }
}
