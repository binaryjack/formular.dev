import { ITrackingManager } from '../tracker-manager.types';
/**
 * Retrieves the tracking data if tracking is active.
 * @returns Array of tracking data or undefined if inactive.
 */
export declare function getTrackingDate(this: ITrackingManager): import('../tracker-manager.types').ITrackingData[] | undefined;
