import { Tracker } from '@core/tracker/tracker'
import { consoleTrackingProvider } from '@core/tracker/tracker.default.provider'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IFieldInput } from '../field-input-base-types'

export const initializeTracking = function (
    this: IFieldInput,
    providers?: ITrackingOutputProvider[]
): IFieldInput {
    try {
        this._tracker = new Tracker([...(providers ?? []), consoleTrackingProvider])
        return this
    } catch (e: any) {
        this.message(
            'critical',
            initializeTracking.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
        return this
    }
}
