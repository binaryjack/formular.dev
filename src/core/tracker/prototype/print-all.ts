import { ITracker } from '../tracker.types'

/**
 * Prints all tracking data entries using all output providers.
 */
export function printAll(this: ITracker) {
    if (!this._trackingIsActive) return
    if (this._outputProviders?.length === 0) {
        return
    }

    this._outputProviders.forEach((p) => {
        p.funcAll(this._trackingData)
    })
}
