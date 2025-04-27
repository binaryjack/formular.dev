import { ITracker, ITrackingOutputProvider } from '../tracker.types'

/**
 * Sets up output providers for the tracker.
 * @param providers - Array of output providers.
 */
export function outputProviderSetup(this: ITracker, providers?: ITrackingOutputProvider[]) {
    this._outputProviders = providers ? [...providers] : []
}
