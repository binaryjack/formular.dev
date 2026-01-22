import { NotificationStrategyType } from '../types/notification-strategy.type'

/**
 * Configuration interface for notification batching behavior.
 *
 * Batching improves performance by grouping multiple notifications
 * and processing them together rather than individually.
 */
export interface IBatchConfig {
    /** Maximum number of notifications to batch together */
    maxBatchSize?: number
    /** Delay in milliseconds before processing a batch */
    batchDelay?: number
    /** Whether to enable priority-based processing */
    enablePriority?: boolean
    /** Strategy for scheduling batch processing */
    strategy?: NotificationStrategyType
}
