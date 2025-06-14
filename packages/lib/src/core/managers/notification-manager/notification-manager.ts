import { ObservableSubject } from '@core/observers/observable-subject/observable-subject'
import { INotificationManager } from './notification-manager-base.types'
import { INotification } from './notification-manager.types'
import { accept } from './prototype/accept'
import { batchNotify } from './prototype/batch-notify'
import { debounceNotify } from './prototype/debounce-notify'
import { dismiss } from './prototype/dismiss'
import { dispose } from './prototype/dispose'
import {
    flushPendingNotifications,
    groupEventsByType,
    processEventGroup,
    processNotificationBatch,
    processPriorityBatches,
    processSimpleBatch
} from './prototype/flush-pending-notifications'
import { getRegisteredNotifierNames } from './prototype/get-registered-notifier-names'
import { initialize } from './prototype/initialize'
import { notify } from './prototype/notify'
import { processBatch, scheduleBatch } from './prototype/schedule-batch'
import { setBatchConfig } from './prototype/set-batch-config'
import { trigger } from './prototype/trigger'

/**
 * Represents an entity that can be notified by various notifiers and can observe data mutations.
 *
 * @constructor
 * @this {INotificationManager}
 */
export const NotificationManager = function (
    this: INotificationManager,
    autoTracker?: INotificationManager
) {
    this.autoTracker = autoTracker
    this.notifiers = new Map<string, INotification>()
    this.observers = new ObservableSubject()

    // Batching properties
    this.batchQueue = []
    this.priorityQueues = new Map()
    this.isBatchScheduled = false
    this.batchTimeout = null
    this.batchConfig = {
        maxBatchSize: 50,
        batchDelay: 16,
        enablePriority: true,
        strategy: 'microtask'
    }

    Object.defineProperty(this, 'dependencyName', {
        value: NotificationManager.name,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
    this.isInitialized = false
} as any as INotificationManager

Object.assign(NotificationManager.prototype, {
    debounceNotify,
    getRegisteredNotifierNames,
    accept,
    initialize,
    dismiss,
    notify,
    dispose,
    trigger,
    batchNotify,
    flushPendingNotifications,
    setBatchConfig,
    scheduleBatch,
    processBatch,
    processPriorityBatches,
    processSimpleBatch,
    processNotificationBatch,
    groupEventsByType,
    processEventGroup
})
