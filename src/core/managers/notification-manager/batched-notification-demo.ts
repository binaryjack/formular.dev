/**
 * Demo: Batched Notification Manager Usage
 *
 * This example demonstrates how to use the enhanced NotificationManager
 * with batching capabilities for improved performance.
 */

import { EventsType, IEvents } from '@core/framework/events/events.types'
import { NotificationManager } from './notification-manager'
import { NotificationPriority } from './notification-manager.types'

// Create notification manager instance
const notificationManager = new (NotificationManager as any)()

// Initialize the manager
notificationManager.initialize({})

// Configure batching behavior
notificationManager.setBatchConfig({
    maxBatchSize: 100,
    batchDelay: 8, // 8ms for high performance
    enablePriority: true,
    strategy: 'microtask' // Use microtask for immediate batching
})

// Add a sample notifier
notificationManager.accept({
    event: {
        types: ['user-action', 'data-update'],
        action: 'logEvent',
        emitterName: 'demo-notifier'
    },
    method: (data: any) => {
        console.log('Single notification:', data)
    },
    handleBatch: (notifications: Array<{ type: EventsType; data?: IEvents }>) => {
        console.log(`Batch of ${notifications.length} notifications:`, notifications)
    },
    canHandle: (type: EventsType) => ['user-action', 'data-update'].includes(type),
    priority: NotificationPriority.NORMAL
})

// Example usage functions

/**
 * Demonstrates single notifications that get batched
 */
export function demonstrateSingleNotifications() {
    console.log('\n=== Single Notifications (Auto-batched) ===')

    // These will be automatically batched together
    notificationManager.notify('user-action', { action: 'click', element: 'button1' })
    notificationManager.notify('user-action', { action: 'click', element: 'button2' })
    notificationManager.notify('data-update', { field: 'username', value: 'john' })
    notificationManager.notify('user-action', { action: 'scroll', position: 100 })

    // The batch will be processed in the next microtask
}

/**
 * Demonstrates explicit batch notifications
 */
export function demonstrateBatchNotifications() {
    console.log('\n=== Explicit Batch Notifications ===')

    const notifications = [
        { type: 'user-action', data: { action: 'click', element: 'menu1' } },
        { type: 'user-action', data: { action: 'click', element: 'menu2' } },
        { type: 'data-update', data: { field: 'email', value: 'john@example.com' } },
        { type: 'user-action', data: { action: 'hover', element: 'tooltip' } }
    ]

    notificationManager.batchNotify(notifications)
}

/**
 * Demonstrates immediate flushing
 */
export function demonstrateImmediateFlush() {
    console.log('\n=== Immediate Flush ===')

    // Add some notifications
    notificationManager.notify('user-action', { action: 'keypress', key: 'Enter' })
    notificationManager.notify('data-update', { field: 'password', value: '***' })

    // Force immediate processing
    notificationManager.flushPendingNotifications()

    console.log('Notifications processed immediately')
}

/**
 * Demonstrates debounced notifications
 */
export function demonstrateDebounceNotifications() {
    console.log('\n=== Debounced Notifications ===')

    // These rapid-fire notifications will be debounced
    notificationManager.debounceNotify('user-action', 100, { action: 'typing', text: 'h' })
    notificationManager.debounceNotify('user-action', 100, { action: 'typing', text: 'he' })
    notificationManager.debounceNotify('user-action', 100, { action: 'typing', text: 'hel' })
    notificationManager.debounceNotify('user-action', 100, { action: 'typing', text: 'hell' })
    notificationManager.debounceNotify('user-action', 100, { action: 'typing', text: 'hello' })

    // Only the last notification will be processed after 100ms
}

/**
 * Demonstrates priority-based batching
 */
export function demonstratePriorityBatching() {
    console.log('\n=== Priority-based Batching ===')
    // Add notifiers with different priorities
    notificationManager.accept({
        event: {
            types: ['critical-error'],
            action: 'handleError',
            emitterName: 'error-handler'
        },
        method: (data: any) => {
            console.log('CRITICAL ERROR:', data)
        },
        priority: NotificationPriority.CRITICAL
    })

    notificationManager.accept({
        event: {
            types: ['info-message'],
            action: 'showInfo',
            emitterName: 'info-handler'
        },
        method: (data: any) => {
            console.log('Info message:', data)
        },
        priority: NotificationPriority.LOW
    })

    // Mix different priority notifications
    notificationManager.notify('info-message', { message: 'Low priority info' })
    notificationManager.notify('user-action', { action: 'normal priority' })
    notificationManager.notify('critical-error', { error: 'High priority error!' })

    // Critical notifications are processed first
}

/**
 * Performance test
 */
export function performanceTest() {
    console.log('\n=== Performance Test ===')
    console.time('Batch 1000 notifications')

    const startTime = performance.now()

    // Send 1000 notifications
    for (let i = 0; i < 1000; i++) {
        notificationManager.notify('user-action', {
            action: 'test-action',
            iteration: i,
            timestamp: Date.now()
        })
    }

    // Wait for all batches to be processed
    setTimeout(() => {
        const endTime = performance.now()
        console.timeEnd('Batch 1000 notifications')
        console.log(`Processing time: ${endTime - startTime}ms`)
        console.log('All notifications processed efficiently in batches!')
    }, 50)
}

// Export all demo functions
export const batchedNotificationDemo = {
    demonstrateSingleNotifications,
    demonstrateBatchNotifications,
    demonstrateImmediateFlush,
    demonstrateDebounceNotifications,
    demonstratePriorityBatching,
    performanceTest,

    // Run all demos
    runAllDemos() {
        console.log('🚀 Batched Notification Manager Demo')
        console.log('=====================================')

        demonstrateSingleNotifications()

        setTimeout(() => {
            demonstrateBatchNotifications()
        }, 100)

        setTimeout(() => {
            demonstrateImmediateFlush()
        }, 200)

        setTimeout(() => {
            demonstrateDebounceNotifications()
        }, 300)

        setTimeout(() => {
            demonstratePriorityBatching()
        }, 500)

        setTimeout(() => {
            performanceTest()
        }, 700)
    }
}

// Auto-run demo if this file is executed directly
if (typeof window !== 'undefined') {
    // Browser environment
    ;(window as any).batchedNotificationDemo = batchedNotificationDemo
    console.log('Batched notification demo available as window.batchedNotificationDemo')
}
