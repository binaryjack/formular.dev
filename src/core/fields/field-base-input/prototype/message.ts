import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { TrackingType } from '@core/tracker/tracker.types'
import { IFieldInput } from '../field-input-base-types'
export const message = function (
    this: IFieldInput,
    type: TrackingType,
    source: string,
    message: string
) {
    generalExceptionHandler(this._tracker, type, source, message)
}
