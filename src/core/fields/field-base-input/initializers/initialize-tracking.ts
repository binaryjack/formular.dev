import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { Tracker } from '@core/tracker/tracker'
import { consoleTrackingProvider } from '@core/tracker/tracker.default.provider'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const initializeTracking = function (
    this: IFieldBaseInput,
    providers?: ITrackingOutputProvider[]
): IFieldBaseInput {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        this.tracker = new Tracker([...(providers ?? []), consoleTrackingProvider])
        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initializeTracking.name,
            `an error has occured when initializing initializeTracking ${this.name} class: ${e.message}`
        )
        return this
    }
}
