import { EventsType, IEvents } from '@core/framework/events/events.types'
import { INotificationManager } from '../notification-manager-base.types'
import { NotificationPriority, PriorityNotification } from '../notification-manager.types'

/**
 * Notifies all notifiers of a specific type with optional data.
 * Enhanced with batching capabilities.
 *
 * @template T
 * @param {EventsType} type - The type of notification.
 * @param {T} [data] - Optional data to be passed to the notifier's method.
 */
export function notify<T extends IEvents>(this: INotificationManager, type: EventsType, data?: T) {
    const notification: PriorityNotification = {
        type,
        data,
        priority: NotificationPriority.NORMAL
    }

    // Add to appropriate queue
    if (this.batchConfig.enablePriority) {
        const queue = this.priorityQueues.get(notification.priority) || []
        queue.push(notification)
        this.priorityQueues.set(notification.priority, queue)
    } else {
        this.batchQueue.push(notification)
    }

    // Schedule or force batch processing
    const totalQueueSize = this.batchConfig.enablePriority
        ? Array.from(this.priorityQueues.values()).reduce(
              (sum: number, queue: any[]) => sum + queue.length,
              0
          )
        : this.batchQueue.length

    if (totalQueueSize >= (this.batchConfig.maxBatchSize ?? 50)) {
        this.flushPendingNotifications()
    } else {
        this.scheduleBatch()
    }
}
