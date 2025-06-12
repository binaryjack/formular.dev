import { EventsType, IEvents } from '../../../framework/events/events.types';
import { INotificationManager } from '../notification-manager-base.types';
/**
 * Batch notify multiple notifications at once
 *
 * @template T
 * @param {Array<{ type: EventsType; data?: T }>} notifications - Array of notifications to batch
 */
export declare function batchNotify<T extends IEvents>(this: INotificationManager, notifications: Array<{
    type: EventsType;
    data?: T;
}>): void;
