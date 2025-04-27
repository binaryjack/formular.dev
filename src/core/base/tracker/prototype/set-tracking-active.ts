import { ITracker } from '../tracker.types'

/**
 * Sets the tracking active state.
 * @param active - Boolean indicating whether tracking is active.
 */
export function setTrackingActive(this: ITracker, active: boolean) {
    this._trackingIsActive = active
}
