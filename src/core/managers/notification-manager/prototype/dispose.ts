import { INotificationManager } from '../notification-manager-base.types'

/**
 * Disposes of the entity by unsubscribing all observers and cleaning up batching resources.
 */
export function dispose(this: INotificationManager) {
    // Clear any pending batch timeout
    if (this.batchTimeout !== null) {
        clearTimeout(this.batchTimeout)
        this.batchTimeout = null
    }

    // Clear all batching queues
    this.batchQueue = []
    this.priorityQueues.clear()
    this.isBatchScheduled = false

    // Clear existing observers and notifiers
    this.observers.unSubscribeAll(false)
    this.notifiers.clear()

    // Set initialized state to false
    this.isInitialized = false
}
