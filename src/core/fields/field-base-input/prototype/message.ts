import { TrackingType } from '@core/tracker/tracker.types'
import { messageAccessor } from '../accessors/accessors'
import { IFieldInput } from '../field-input-base-types'
export const message = function (
    this: IFieldInput,
    type: TrackingType,
    source: string,
    message: string
) {
    return messageAccessor(this)?.(type, source, message)
}
