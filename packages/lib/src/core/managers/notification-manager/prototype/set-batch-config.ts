import { INotificationManager } from '../notification-manager-base.types'
import { BatchConfig, NotificationPriority } from '../notification-manager.types'

/**
 * Sets the batch configuration
 *
 * @param {BatchConfig} config - The batch configuration to apply
 */
export function setBatchConfig(this: INotificationManager, config: BatchConfig): void {
    // Handle null config gracefully
    if (!config) {
        return
    }

    this.batchConfig = { ...this.batchConfig, ...config }

    // Initialize priority queues if priority is enabled
    if (config.enablePriority && !this.priorityQueues.size) {
        Object.values(NotificationPriority)
            .filter((p) => typeof p === 'number')
            .forEach((priority) => {
                this.priorityQueues.set(priority as number, [])
            })
    }
}
