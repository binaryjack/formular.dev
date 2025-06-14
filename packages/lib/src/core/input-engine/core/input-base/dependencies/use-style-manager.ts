import { logManager } from '@core/managers/log-manager/log-manager'
import { IStyleManager } from '@core/managers/style-manager/style-manager.types'
import { IInputBase } from '../input-base.types'

export const useStyleManager = function (
    this: IInputBase,
    styleManager: IStyleManager
): IInputBase {
    try {
        this.styleManager = styleManager
        this.styleManager.input = this
        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useStyleManager.name,
            `an error has occured when initializing initializeStyle ${this.name} class: ${e.message}`
        )
        return this
    }
}
