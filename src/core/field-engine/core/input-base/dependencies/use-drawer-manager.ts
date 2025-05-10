import { DrawerBaseInput } from '@core/field-engine/variants/drawer-base/drawer-base-input'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldBaseInput } from '../field-input-base-types'

export const useDrawerManager = function (this: IFieldBaseInput): IFieldBaseInput {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        // if (!this?.tracker) {
        //     throw Error('tracker must be initialized')
        // }
        this.drawer = new DrawerBaseInput()
        this.drawer.field = this
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
