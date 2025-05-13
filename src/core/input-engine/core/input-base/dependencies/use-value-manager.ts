import { logManager } from '@core/managers/log-manager/log-manager'
import { IValueManager } from '@core/managers/value-manager/value-manager.types'
import { IInputBase } from '../input-base.types'

export const useValueManager = function (
    this: IInputBase,
    valueStrategyInstance: IValueManager
    // ...parsers: IParserStrategy<any>[]
): IInputBase {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        // if (!this?.tracker) {
        //     throw Error('tracker must be initialized')
        // }
        this.valueManager = valueStrategyInstance
        this.valueManager.input = this
        // this.valueStrategy.acceptValueStrategies(...parsers)

        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useValueManager.name,
            `an error has occured when initializing initializeValueStrategy ${this.name} class: ${e.message}`
        )
        return this
    }
}
