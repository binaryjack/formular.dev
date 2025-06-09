import { logManager } from '@core/managers/log-manager/log-manager'
import { IValueManager } from '@core/managers/value-manager/value-manager.types'
import { IInputBase } from '../input-base.types'

export const useValueManager = function (
    this: IInputBase,
    valueManagerInstance: IValueManager
): IInputBase {
    try {
        this.valueManager = valueManagerInstance
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
