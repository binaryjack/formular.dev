import { ITracker, ITrackingData } from '../tracker.types'

/**
 * Prints a single tracking data entry using all output providers.
 * @param data - The tracking data to print.
 */
export function print(this: ITracker, data: ITrackingData) {
    if (!this._trackingIsActive) return
    if (this._outputProviders?.length === 0) {
        return
    }

    this._outputProviders.forEach((p) => {
        p.func(data)
    })
}
