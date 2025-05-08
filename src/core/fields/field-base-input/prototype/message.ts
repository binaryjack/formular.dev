import { logManager } from '@core/general-logging-manager/log-manager'
import { TrackingType } from '@core/tracker/tracker.types'
import { IFieldInput } from '../field-input-base-types'
export const message = function (
    this: IFieldInput,
    type: TrackingType,
    source: string,
    message: string
) {
    logManager(this.tracker, type, source, message)
}
