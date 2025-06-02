import { EventsType } from '@core/framework/events/events.types'
import { INotificationManager } from '../notification-manager-base.types'
import { NotificationPriority, PriorityNotification } from '../notification-manager.types'

/**
 * Immediately flushes all pending notifications
 */
export function flushPendingNotifications(this: INotificationManager): void {
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

/**
 * Process priority-based batches
 */
export function processPriorityBatches(this: INotificationManager): void {
    const priorities = [
        NotificationPriority.CRITICAL,
        NotificationPriority.HIGH,
        NotificationPriority.NORMAL,
        NotificationPriority.LOW
    ]

    for (const priority of priorities) {
        const queue = this.priorityQueues.get(priority) ?? []
        if (queue.length > 0) {
            this.processNotificationBatch(queue)
            this.priorityQueues.set(priority, [])
        }
    }
}

/**
 * Process simple batch (no priority)
 */
export function processSimpleBatch(this: INotificationManager): void {
    if (this.batchQueue.length === 0) return

    const currentBatch = [...this.batchQueue]
    this.batchQueue = []

    this.processNotificationBatch(currentBatch)
}

/**
 * Process a batch of notifications
 */
export function processNotificationBatch(
    this: INotificationManager,
    batch: PriorityNotification[]
): void {
    if (batch.length === 0) return

    // Group by event type for efficiency
    const groupedEvents = this.groupEventsByType(batch)

    // Process each group
    for (const [eventType, events] of groupedEvents) {
        this.processEventGroup(eventType, events)
    }
}

/**
 * Group events by type
 */
export function groupEventsByType(this: INotificationManager, batch: PriorityNotification[]) {
    const grouped = new Map<EventsType, PriorityNotification[]>()

    for (const event of batch) {
        if (!grouped.has(event.type)) {
            grouped.set(event.type, [])
        }
        grouped.get(event.type)!.push(event)
    }

    return grouped
}

/**
 * Process events of the same type
 */
export function processEventGroup(
    this: INotificationManager,
    eventType: EventsType,
    events: PriorityNotification[]
): void {
    // Notify observers with batched data (using trigger instead of notify)
    if (this.observers) {
        // Store batch data for observers to access if needed
        ;(this.observers as any).lastBatch = { eventType, events }
        this.observers.trigger()
    }

    // Process notifiers using existing logic but with batch support
    this.notifiers.forEach((notifier) => {
        if (notifier?.event.types.includes(eventType)) {
            // Use new batch handling if available
            if (notifier.handleBatch) {
                notifier.handleBatch(events.map((e) => ({ type: e.type, data: e.data })))
            } else if (notifier.handle) {
                events.forEach((e) => notifier.handle!(e.type, e.data))
            } else {
                // Fallback to existing method-based approach
                events.forEach((e) => notifier.method(e.data))
            }

            // Handle auto-tracking
            if (this.autoTracker && events.length > 0) {
                events.forEach((e) => {
                    this.autoTracker?.notify('onAutoTrackNotified', {
                        ...e.data,
                        target: notifier.event.action
                    } as any)
                })
            }
        }
    })
    // Execute computed signal callback if present (needs proper signal format)
    if (this.computedSignalCallback) {
        // Create a dummy signal-like object for compatibility
        const signalLike = {
            value: events,
            id: `batch-${eventType}`
            // Add minimal signal properties as needed
        } as any
        this.computedSignalCallback(signalLike)
    }

    // Trigger observers (maintaining existing behavior)
    this.observers?.trigger()
}

// Attach additional methods to the main function
Object.assign(flushPendingNotifications, {
    processPriorityBatches,
    processSimpleBatch,
    processNotificationBatch,
    groupEventsByType,
    processEventGroup
})
