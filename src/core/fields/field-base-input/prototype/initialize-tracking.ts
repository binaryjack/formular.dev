import { Tracker } from '@core/tracker/tracker'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IFieldInput } from '../field-input-base-types'

export const initializeTracking = function (
    this: IFieldInput,
    providers?: ITrackingOutputProvider[]
) {
    if (!this.prototype) {
        throw Error(`${initializeTracking.name}: the prototype of ${this.name} is not yes defined`)
    }
    try {
        this.prototype = { ...this.prototype, ...Tracker.prototype }
        Tracker.call(this)
        this.outputProviderSetup(providers)
    } catch (e: any) {
        console.error(initializeTracking.name, e.message)
    }
}
