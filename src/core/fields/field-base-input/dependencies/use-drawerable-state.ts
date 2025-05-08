import { DrawerBaseInput } from '@core/fields/drawer-base-input/drawer-base-input'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IFieldBaseInput } from '../field-input-base-types'

export const useDrawerableState = function (this: IFieldBaseInput): IFieldBaseInput {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        // if (!this?.tracker) {
        //     throw Error('tracker must be initialized')
        // }
        this.drawer = new DrawerBaseInput()
        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useDrawerableState.name,
            `an error has occured when initializing initializeDrawerableState ${this.name} class: ${e.message}`
        )
        return this
    }
}
