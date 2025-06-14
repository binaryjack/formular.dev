import { IDrawerBaseInput } from '@core/input-engine/variants/drawer-base/drawer-base-input.types'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IInputBase } from '../input-base.types'

export const useDrawerManager = function (
    this: IInputBase,
    drawerBase: IDrawerBaseInput
): IInputBase {
    try {
        this.drawer = drawerBase
        this.drawer.input = this
        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useDrawerManager.name,
            `an error has occured when initializing initializeDrawerableState ${this.name} class: ${e.message}`
        )
        return this
    }
}
