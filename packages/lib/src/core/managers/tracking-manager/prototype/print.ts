import { ITrackingData, ITrackingManager } from '../tracker-manager.types'

/**
 * Prints a single tracking data entry using all output providers.
 * @param data - The tracking data to print.
 */
export function print(this: ITrackingManager, data: ITrackingData) {
    if (!this._trackingIsActive) return
    if (this._outputProviders?.length === 0) {
        return
    }

    this._outputProviders.forEach((p) => {
        p.func(data)
    })
}
