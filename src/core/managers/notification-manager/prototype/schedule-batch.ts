import { INotificationManager } from '../notification-manager-base.types'

/**
 * Schedules batch processing based on configured strategy
 */
export function scheduleBatch(this: INotificationManager): void {
    if (this.isBatchScheduled) return

    this.isBatchScheduled = true

    switch (this.batchConfig.strategy) {
        case 'microtask':
            queueMicrotask(() => this.processBatch())
            break
        case 'timeout':
            this.batchTimeout = setTimeout(
                () => this.processBatch(),
                this.batchConfig.batchDelay ?? 16
            ) as any
            break
        case 'requestAnimationFrame':
            requestAnimationFrame(() => this.processBatch())
            break
    }
}

/**
 * Processes the current batch of notifications
 */
export function processBatch(this: INotificationManager): void {
    if (this.batchTimeout !== null) {
        clearTimeout(this.batchTimeout)
        this.batchTimeout = null
    }

    this.isBatchScheduled = false

    if (this.batchConfig.enablePriority) {
        this.processPriorityBatches()
    } else {
        this.processSimpleBatch()
    }
}

// Attach processBatch to scheduleBatch for prototype assignment
Object.assign(scheduleBatch, { processBatch })
