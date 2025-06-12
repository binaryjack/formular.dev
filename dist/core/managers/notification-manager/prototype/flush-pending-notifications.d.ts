import { EventsType } from '../../../framework/events/events.types';
import { INotificationManager } from '../notification-manager-base.types';
import { PriorityNotification } from '../notification-manager.types';
/**
 * Immediately flushes all pending notifications
 */
export declare function flushPendingNotifications(this: INotificationManager): void;
/**
 * Process priority-based batches
 */
export declare function processPriorityBatches(this: INotificationManager): void;
/**
 * Process simple batch (no priority)
 */
export declare function processSimpleBatch(this: INotificationManager): void;
/**
 * Process a batch of notifications
 */
export declare function processNotificationBatch(this: INotificationManager, batch: PriorityNotification[]): void;
/**
 * Group events by type
 */
export declare function groupEventsByType(this: INotificationManager, batch: PriorityNotification[]): Map<"onFocus" | "onBlur" | "onChange" | "onSubmit" | "onLoad" | "onKeyDown" | "onKeyPress" | "onKeyUp" | "onClick" | "onSelect" | "intitial" | "onClear" | "onResetValidation" | "onGet" | "onValidate" | "onFormat" | "onOpen" | "onClose" | "onUiUpdate" | "onAutoTrackNotified" | "validateOnFormFirstSubmit" | "onEngineStateChanger" | "onDispose" | "onValueChange" | "onValidationChange" | "onBusyStateChange" | "onObserve", PriorityNotification[]>;
/**
 * Process events of the same type
 */
export declare function processEventGroup(this: INotificationManager, eventType: EventsType, events: PriorityNotification[]): void;
