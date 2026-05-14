import { logManager } from '@core/managers/log-manager/log-manager'
import { ITrackingManager } from '@core/managers/tracking-manager/tracker-manager.types'
import { IInputBase } from '../input-base.types'

export const useTrackingManager = function (
    this: IInputBase,
    trackerInstance: ITrackingManager
): IInputBase {
    try {
        this.trackingManager = trackerInstance
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
