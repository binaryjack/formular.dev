import { EventsType, IEvents } from '@core/framework/events/events.types'
import { IValidationResult } from '../validation-manager/validation-manager.types'

export const SNotificationManager = Symbol.for('INotificationManager')
export const SAutoTrackerNotificationManager = Symbol.for('SAutoTrackerNotificationManager')

export type dataStrategyResultAsyncType = (data: IEvents) => Promise<IValidationResult>

export type TNotificationMethod<T = any> = (data?: T) => void

export type TNotificationMethodAsnyc<T = Array<dataStrategyResultAsyncType>> = (data?: T) => void

/**
 * Interface representing a notification configuration.
 *
 * Defines how notifications are handled and processed within the FORMULAR system.
 */
export interface INotification {
    /** The event configuration that defines what events this notification handles */
    event: IEvents
    /** The method to execute when the notification is triggered */
    method: TNotificationMethod
    /** Optional handler for single event notifications */
    handle?: (type: EventsType, data?: IEvents) => void
    /** Optional handler for batch event notifications (performance optimization) */
    handleBatch?: (notifications: Array<{ type: EventsType; data?: IEvents }>) => void
    /** Optional predicate to determine if this notification can handle a specific event type */
    canHandle?: (type: EventsType) => boolean
    /** Priority level for batched notification processing */
    priority?: NotificationPriority
}

/**
 * Enumeration defining notification priority levels for batched processing.
 *
 * Higher priority notifications are processed before lower priority ones
 * when batching is enabled for performance optimization.
 */
export enum NotificationPriority {
    /** Low priority - processed last */
    LOW = 0,
    /** Normal priority - default priority level */
    NORMAL = 1,
    /** High priority - processed before normal and low */
    HIGH = 2,
    /** Critical priority - processed first */
    CRITICAL = 3
}

/**
 * Interface for priority-based notifications in the batching system.
 */
export interface PriorityNotification {
    /** The type of event being notified */
    type: EventsType
    /** Optional data payload for the notification */
    data?: IEvents
    /** Priority level for processing order */
    priority: NotificationPriority
}

/**
 * Strategy types for batching notification processing.
 *
 * Different strategies provide different performance characteristics:
 * - microtask: Immediate processing using microtasks (fastest)
 * - timeout: Delayed processing using setTimeout
 * - requestAnimationFrame: Processing synchronized with browser animation frames
 */
export type NotificationStrategyType = 'microtask' | 'timeout' | 'requestAnimationFrame'

/**
 * Configuration interface for notification batching behavior.
 *
 * Batching improves performance by grouping multiple notifications
 * and processing them together rather than individually.
 */
export interface BatchConfig {
    /** Maximum number of notifications to batch together */
    maxBatchSize?: number
    /** Delay in milliseconds before processing a batch */
    batchDelay?: number
    /** Whether to enable priority-based processing */
    enablePriority?: boolean
    /** Strategy for scheduling batch processing */
    strategy?: NotificationStrategyType
}
