import { ITrackingManager, newDtId, newTrackingData } from '../tracker-manager.types'

/**
 * Logs a critical message.
 * @param source - The source of the message.
 * @param message - The critical message to log.
 */
export function internalCritical(this: ITrackingManager, source: string, message: string) {
    if (!this._trackingIsActive) return
    const dt = newTrackingData(newDtId(this._trackingData), 'critical', source, message)
    this._trackingData.push(dt)
    this.print(dt)
}
