import { logManager } from '@core/managers/log-manager/log-manager'
import { StyleManager } from '@core/managers/style-manager/style-manager'
import { IInputBase } from '../input-base.types'

export const useStyleManager = function (this: IInputBase): IInputBase {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        // if (!this?.validationStrategy) {
        //     throw Error('validationStrategy must be initialized beefore styles')
        // }
        this.styleManager = new StyleManager()
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
