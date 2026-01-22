import { ITrackingData, ITrackingManager, ITrackingOutputProvider } from '../tracker-manager.types'

/**
 * Prints a single tracking data entry using all output providers.
 * @param data - The tracking data to print.
 */
export function print(this: ITrackingManager, data: ITrackingData) {
    if (!this._trackingIsActive) return
    if (this._outputProviders?.length === 0) {
        return
    }

    this._outputProviders.forEach((p: ITrackingOutputProvider) => {
        // Ensure p is an instance, not a constructor
        const provider = typeof p === 'function' ? new p() : p

        if (typeof provider?.func !== 'function') {
            console.warn(
                `Output provider ${provider?.id || 'unknown'} does not have a valid func method.`
            )
        } else {
            provider.func(data)
        }
    })
}
