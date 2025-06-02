/**
 * Interface representing a notifiable entity.
 *
 * @interface INotifiableEntity
 *
 * @property {Map<string, INotifier>} notifiers - A map of notifiers associated with the entity.
 * @property {IDataMutationObserverSubject} observers - The observers monitoring data mutations.
 * @property {ComputedSignalCallback<unknown> | null} computedSignalCallback - A callback for computed signals, or null if not set.
 *
 * @method notify
 * @template T
 * @param {TNotifierEventsType} type - The type of notification.
 * @param {T} [data] - Optional data to be passed with the notification.
 *
 * @method accept
 * @param {INotification} notify - The notifier to be accepted by the entity.
 *
 * @method init
 * Initializes the notifiable entity.
 *
 * @method dispose
 * Disposes of the notifiable entity, performing any necessary cleanup.
 */

import { EventsType, IEvents } from '@core/framework/events/events.types'

import { IObservableSubject } from '@core/observers/observable-subject/observable-subject.types'
import { ComputedSignalCallback } from '@core/observers/signals/signal.type'
import { IInitializableDependency } from '../initialization-manager/initialization-manager.types'
import { BatchConfig, INotification } from './notification-manager.types'

export interface INotificationManager extends IInitializableDependency {
    new (autoTracker?: INotificationManager): INotificationManager
    getRegisteredNotifierNames: () => string[]
    notify: <T extends IEvents>(type: EventsType, data?: T) => void
    trigger: () => void

    // Enhanced batching methods
    batchNotify: <T extends IEvents>(notifications: Array<{ type: EventsType; data?: T }>) => void
    flushPendingNotifications: () => void
    setBatchConfig: (config: BatchConfig) => void

    debounceNotify: <T extends IEvents>(type: EventsType, delay: number, data?: T) => void
    accept: (notify: INotification) => void
    dismiss: (notify: INotification) => void
    init: () => void
    dispose: () => void
    notifiers: Map<string, INotification>
    observers: IObservableSubject
    computedSignalCallback: ComputedSignalCallback<unknown> | null
    autoTracker?: INotificationManager

    // Batching properties
    batchQueue: Array<{ type: EventsType; data?: IEvents; priority: number }>
    priorityQueues: Map<number, Array<{ type: EventsType; data?: IEvents; priority: number }>>

    isBatchScheduled: boolean
    batchTimeout: number | null
    batchConfig: BatchConfig

    // Batching methods
    scheduleBatch: () => void
    processBatch: () => void
    processPriorityBatches: () => void
    processSimpleBatch: () => void
    processNotificationBatch: (batch: any[]) => void
    groupEventsByType: (batch: any[]) => Map<EventsType, any[]>
    processEventGroup: (eventType: EventsType, events: any[]) => void
}
