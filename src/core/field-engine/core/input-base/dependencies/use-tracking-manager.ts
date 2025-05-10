import { logManager } from '@core/managers/log-manager/log-manager'
import { TrackingManager } from '@core/managers/tracking-manager/tracker-manager'
import { ITrackingOutputProvider } from '@core/managers/tracking-manager/tracker-manager.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const useTrackingManager = function (
    this: IFieldBaseInput,
    providers?: ITrackingOutputProvider[]
): IFieldBaseInput {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        this.trackingManager = new TrackingManager()
        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useTrackingManager.name,
            `an error has occured when initializing initializeTracking ${this.name} class: ${e.message}`
        )
        return this
    }
}
