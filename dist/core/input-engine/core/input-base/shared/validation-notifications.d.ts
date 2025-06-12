import { IEvents } from '../../../../framework/events/events.types';
/**
 * Triggers UI update notification
 */
export declare const triggerUiUpdateNotification: <T extends IEvents>(data: T, functionName: string) => void;
/**
 * Triggers validation change notification
 */
export declare const triggerValidationChangeNotification: <T extends IEvents>(data: T, functionName: string) => void;
