import { EventsType, IEvents } from '../../../framework/events/events.types';
import { INotificationManager } from '../notification-manager-base.types';
/**
 * Notifies all notifiers of a specific type with optional data.
 * Enhanced with batching capabilities.
 *
 * @template T
 * @param {EventsType} type - The type of notification.
 * @param {T} [data] - Optional data to be passed to the notifier's method.
 */
export declare function notify<T extends IEvents>(this: INotificationManager, type: EventsType, data?: T): void;
