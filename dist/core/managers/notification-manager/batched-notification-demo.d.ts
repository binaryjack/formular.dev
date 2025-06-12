/**
 * Demo: Batched Notification Manager Usage
 *
 * This example demonstrates how to use the enhanced NotificationManager
 * with batching capabilities for improved performance.
 */
/**
 * Demonstrates single notifications that get batched
 */
export declare function demonstrateSingleNotifications(): void;
/**
 * Demonstrates explicit batch notifications
 */
export declare function demonstrateBatchNotifications(): void;
/**
 * Demonstrates immediate flushing
 */
export declare function demonstrateImmediateFlush(): void;
/**
 * Demonstrates debounced notifications
 */
export declare function demonstrateDebounceNotifications(): void;
/**
 * Demonstrates priority-based batching
 */
export declare function demonstratePriorityBatching(): void;
/**
 * Performance test
 */
export declare function performanceTest(): void;
export declare const batchedNotificationDemo: {
    demonstrateSingleNotifications: typeof demonstrateSingleNotifications;
    demonstrateBatchNotifications: typeof demonstrateBatchNotifications;
    demonstrateImmediateFlush: typeof demonstrateImmediateFlush;
    demonstrateDebounceNotifications: typeof demonstrateDebounceNotifications;
    demonstratePriorityBatching: typeof demonstratePriorityBatching;
    performanceTest: typeof performanceTest;
    runAllDemos(): void;
};
