import { INotificationManager } from '../notification-manager-base.types';
/**
 * Schedules batch processing based on configured strategy
 */
export declare function scheduleBatch(this: INotificationManager): void;
/**
 * Processes the current batch of notifications
 */
export declare function processBatch(this: INotificationManager): void;
