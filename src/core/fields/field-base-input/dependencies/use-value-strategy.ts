import { logManager } from '@core/general-logging-manager/log-manager'
import { IValueStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const useValueStrategy = function (
    this: IFieldBaseInput,
    valueStrategyInstance: IValueStrategy
    // ...parsers: IParserStrategy<any>[]
): IFieldBaseInput {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        // if (!this?.tracker) {
        //     throw Error('tracker must be initialized')
        // }
        this.valueStrategy = valueStrategyInstance
        this.valueStrategy.field = this
        // this.valueStrategy.acceptValueStrategies(...parsers)

        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useValueStrategy.name,
            `an error has occured when initializing initializeValueStrategy ${this.name} class: ${e.message}`
        )
        return this
    }
}
