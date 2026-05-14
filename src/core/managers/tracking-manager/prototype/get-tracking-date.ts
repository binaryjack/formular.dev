import { ITrackingManager } from '../tracker-manager.types'

/**
 * Retrieves the tracking data if tracking is active.
 * @returns Array of tracking data or undefined if inactive.
 */
export function getTrackingDate(this: ITrackingManager) {
    if (!this._trackingIsActive) return
    return this._trackingData
}
