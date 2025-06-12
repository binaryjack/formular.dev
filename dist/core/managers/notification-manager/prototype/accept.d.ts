import { INotificationManager } from '../notification-manager-base.types';
import { INotification } from '../notification-manager.types';
/**
 * Accepts a notifier and adds it to the notifiers map if it doesn't already exist.
 *
 * @param {INotification} notify - The notifier to be added.
 */
export declare function accept(this: INotificationManager, notify: INotification): void;
