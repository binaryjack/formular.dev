import { genericAccsssor } from '@core/fields/field-base-input/accessors/generic-accessor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { ValueStrategy, ValueStrategyInstance } from '@core/value-strategy/value-strategy'
import { IParserStrategy, IValueStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldBuilder } from '../field-builder'

export const initializeValueStrategy = function (
    this: IFieldBuilder,
    ...parsers: IParserStrategy<any>[]
): IFieldBuilder {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?._tracker) {
            throw Error('tracker must be initialized')
        }
        this._value = new ValueStrategy()
        ValueStrategyInstance(this._value)

        this.valueStrategy = genericAccsssor<IValueStrategy>('_value')
        this.valueStrategy().initialize(this)
        this.valueStrategy().acceptValueStrategies(...parsers)

        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initializeValueStrategy.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return this
    }
}
