import { DomManager } from '@core/managers/dom-manager/dom-manager'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IInputBase } from '../input-base.types'

export const useDomManager = function (this: IInputBase): IInputBase {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        // if (!this?.tracker) {
        //     throw Error('tracker must be initialized')
        // }
        this.domManager = new DomManager()

        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useDomManager.name,
            `an error has occured when initializing initializeDomManager ${this.name} class: ${e.message}`
        )
        return this
    }
}
