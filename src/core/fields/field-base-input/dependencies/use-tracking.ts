import { logManager } from '@core/general-logging-manager/log-manager'
import { Tracker } from '@core/tracker/tracker'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const useTracking = function (
    this: IFieldBaseInput,
    providers?: ITrackingOutputProvider[]
): IFieldBaseInput {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        this.tracker = new Tracker()
        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useTracking.name,
            `an error has occured when initializing initializeTracking ${this.name} class: ${e.message}`
        )
        return this
    }
}
