import { INotificationManager } from '../notification-manager-base.types'
import { NotificationPriority } from '../notification-manager.types'

export const initialize = function <T extends HTMLElement>(this: INotificationManager) {
    // Initialize priority queues if priority batching is enabled
    if (this.batchConfig.enablePriority) {
        Object.values(NotificationPriority)
            .filter((p) => typeof p === 'number')
            .forEach((priority) => {
                this.priorityQueues.set(priority as number, [])
            })
    }

    this.isInitialized = true
    // dependencyName is already set in constructor with writable: true
}
