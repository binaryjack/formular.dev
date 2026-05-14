import { ITrackingManager, newDtId, newTrackingData } from '../tracker-manager.types'

/**
 * Logs a warning message.
 * @param source - The source of the message.
 * @param message - The warning message to log.
 */
export function internalWarning(this: ITrackingManager, source: string, message: string) {
    if (!this._trackingIsActive) return
    const dt = newTrackingData(newDtId(this._trackingData), 'warning', source, message)
    this._trackingData.push(dt)
    this.print(dt)
}
