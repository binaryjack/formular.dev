import { INotificationManager } from '../notification-manager-base.types';
import { INotification } from '../notification-manager.types';
/**
 * Disposes of the entity by unsubscribing all observers.
 */
export declare function dismiss(this: INotificationManager, notify: INotification): void;
