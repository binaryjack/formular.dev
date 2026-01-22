import { ITrackingManager, ITrackingOutputProvider } from '../tracker-manager.types'

/**
 * Sets up output providers for the tracker.
 * @param providers - Array of output providers.
 */
export function addProviders(this: ITrackingManager, providers?: ITrackingOutputProvider[]) {
    this._outputProviders = providers ? [...this._outputProviders, ...providers] : []
}
