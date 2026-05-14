import { logManager } from '@core/managers/log-manager/log-manager'
import { TrackingType } from '@core/managers/tracking-manager/tracker-manager.types'
import { IInput } from '../input-base.types'
export const message = function (
    this: IInput,
    type: TrackingType,
    source: string,
    message: string
) {
    logManager(this.trackingManager, type, source, message)
}
