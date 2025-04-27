import { ITracker, newDtId, newTrackingData } from '../tracker.types'

/**
 * Logs an informational message.
 * @param source - The source of the message.
 * @param message - The informational message to log.
 */
export function internalInfo(this: ITracker, source: string, message: string) {
    if (!this._trackingIsActive) return
    const dt = newTrackingData(newDtId(this._trackingData), 'info', source, message)
    this._trackingData.push(dt)
    this.print(dt)
}
