import { Dommable } from '@core/dommable/dommable'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IFieldBaseInput } from '../field-input-base-types'

export const useDommable = function (this: IFieldBaseInput): IFieldBaseInput {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        // if (!this?.tracker) {
        //     throw Error('tracker must be initialized')
        // }
        this.dom = new Dommable()

        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useDommable.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return this
    }
}
