import { ITrackingManager, newDtId, newTrackingData } from '../tracker-manager.types'

/**
 * Logs an error message.
 * @param source - The source of the message.
 * @param message - The error message to log.
 */
export function internalError(this: ITrackingManager, source: string, message: string) {
    if (!this._trackingIsActive) return
    const dt = newTrackingData(newDtId(this._trackingData), 'error', source, message)
    this._trackingData.push(dt)
    this.print(dt)
}
