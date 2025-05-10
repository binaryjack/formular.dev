import { ITrackingManager } from '../tracker-manager.types'

/**
 * Sets the tracking active state.
 * @param active - Boolean indicating whether tracking is active.
 */
export function setTrackingActive(this: ITrackingManager, active: boolean) {
    this._trackingIsActive = active
}
