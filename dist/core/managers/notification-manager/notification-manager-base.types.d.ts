import { EventsType, IEvents } from '../../framework/events/events.types';
import { IObservableSubject } from '../../observers/observable-subject/observable-subject.types';
import { IInitializableDependency } from '../initialization-manager/initialization-manager.types';
import { BatchConfig, INotification } from './notification-manager.types';
export interface INotificationManager extends IInitializableDependency {
    new (autoTracker?: INotificationManager): INotificationManager;
    getRegisteredNotifierNames: () => string[];
    notify: <T extends IEvents>(type: EventsType, data?: T) => void;
    trigger: () => void;
    batchNotify: <T extends IEvents>(notifications: Array<{
        type: EventsType;
        data?: T;
    }>) => void;
    flushPendingNotifications: () => void;
    setBatchConfig: (config: BatchConfig) => void;
    debounceNotify: <T extends IEvents>(type: EventsType, delay: number, data?: T) => void;
    accept: (notify: INotification) => void;
    dismiss: (notify: INotification) => void;
    init: () => void;
    dispose: () => void;
    notifiers: Map<string, INotification>;
    observers: IObservableSubject;
    autoTracker?: INotificationManager;
    batchQueue: Array<{
        type: EventsType;
        data?: IEvents;
        priority: number;
    }>;
    priorityQueues: Map<number, Array<{
        type: EventsType;
        data?: IEvents;
        priority: number;
    }>>;
    isBatchScheduled: boolean;
    batchTimeout: number | null;
    batchConfig: BatchConfig;
    scheduleBatch: () => void;
    processBatch: () => void;
    processPriorityBatches: () => void;
    processSimpleBatch: () => void;
    processNotificationBatch: (batch: any[]) => void;
    groupEventsByType: (batch: any[]) => Map<EventsType, any[]>;
    processEventGroup: (eventType: EventsType, events: any[]) => void;
}
