import { EventsType, IEvents } from '@core/framework/events/events.types'
import { INotificationManager } from '../notification-manager-base.types'
import { NotificationPriority, PriorityNotification } from '../notification-manager.types'

/**
 * Batch notify multiple notifications at once
 *
 * @template T
 * @param {Array<{ type: EventsType; data?: T }>} notifications - Array of notifications to batch
 */
export function batchNotify<T extends IEvents>(
    this: INotificationManager,
    notifications: Array<{ type: EventsType; data?: T }>
): void {
    const priorityNotifications: PriorityNotification[] = notifications.map((n) => ({
        type: n.type,
        data: n.data,
        priority: NotificationPriority.NORMAL
    }))

    if (this.batchConfig.enablePriority) {
        priorityNotifications.forEach((notification) => {
            const queue = this.priorityQueues.get(notification.priority) ?? []
            queue.push(notification)
            this.priorityQueues.set(notification.priority, queue)
        })
    } else {
        this.batchQueue.push(...priorityNotifications)
    }

    this.scheduleBatch()
}
