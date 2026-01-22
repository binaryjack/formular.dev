import { logManager } from '@core/managers/log-manager/log-manager'
import { INotificationManager } from '../notification-manager-base.types'
import { NotificationPriority } from '../notification-manager.types'

export const initialize = function <T extends HTMLElement>(this: INotificationManager) {
    logManager(undefined, 'info', 'initialize', this.dependencyName)

    // Initialize priority queues if priority batching is enabled
    if (this.batchConfig.enablePriority) {
        Object.values(NotificationPriority)
            .filter((p) => typeof p === 'number')
            .forEach((priority) => {
                this.priorityQueues.set(priority as number, [])
            })
    }

    this.isInitialized = true
}
