import { ITrackingManager } from '../tracker-manager.types'

/**
 * Prints all tracking data entries using all output providers.
 */
export function printAll(this: ITrackingManager) {
    if (!this._trackingIsActive) return
    if (this._outputProviders?.length === 0) {
        return
    }

    this._outputProviders.forEach((p) => {
        p.funcAll(this._trackingData)
    })
}
