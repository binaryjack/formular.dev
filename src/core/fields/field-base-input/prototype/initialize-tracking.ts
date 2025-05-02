import { Tracker } from '@core/tracker/tracker'
import { consoleTrackingProvider } from '@core/tracker/tracker.default.provider'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IFieldInput } from '../field-input-base-types'

export const initializeTracking = function (
    this: IFieldInput,
    providers?: ITrackingOutputProvider[]
) {
    if (!this.prototype) {
        /** here I cannot yet use the internal tracking  */
        throw Error(`${initializeTracking.name}: the prototype of ${this.name} is not yes defined`)
    }
    try {
        this._tracker = new Tracker([...(providers ?? []), consoleTrackingProvider])
    } catch (e: any) {
        /** here I cannot yet use the internal tracking  */
        throw Error(
            `${initializeTracking.name}: an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
