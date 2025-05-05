import { genericAccsssor } from '@core/fields/field-base-input/accessors/generic-accessor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { Tracker, TrackerInstance } from '@core/tracker/tracker'
import { consoleTrackingProvider } from '@core/tracker/tracker.default.provider'
import { ITracker, ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IFieldBuilder } from '../field-builder'

export const initializeTracking = function (
    this: IFieldBuilder,
    providers?: ITrackingOutputProvider[]
): IFieldBuilder {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        this._tracker = new Tracker([...(providers ?? []), consoleTrackingProvider])
        TrackerInstance(this._tracker)

        this.track = genericAccsssor<ITracker>('_tracker')
        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initializeTracking.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return this
    }
}
