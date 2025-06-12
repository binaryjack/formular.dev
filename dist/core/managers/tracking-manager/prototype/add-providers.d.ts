import { ITrackingManager, ITrackingOutputProvider } from '../tracker-manager.types';
/**
 * Sets up output providers for the tracker.
 * @param providers - Array of output providers.
 */
export declare function addProviders(this: ITrackingManager, providers?: ITrackingOutputProvider[]): void;
