import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { ValueStrategy } from '@core/value-strategy/value-strategy'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { Constructor } from '../constructors/constructors'
import { IFieldBaseInput } from '../field-input-base-types'

export const initializeValueStrategy = function (
    this: IFieldBaseInput,
    ...parsers: IParserStrategy<any>[]
): IFieldBaseInput {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?.tracker) {
            throw Error('tracker must be initialized')
        }
        this.valueStrategy = new ValueStrategy(new Constructor(undefined, this))
        this.valueStrategy.acceptValueStrategies(...parsers)

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
