import { EventsType, IEvents } from '@core/framework/events/events.types'
import { IValidationResult } from '../validation-manager/validation-manager.types'

export const SNotificationManager = Symbol.for('INotificationManager')
export const SAutoTrackerNotificationManager = Symbol.for('SAutoTrackerNotificationManager')

export type dataStrategyResultAsyncType = (data: IEvents) => Promise<IValidationResult>

export type TNotificationMethod<T = any> = (data?: T) => void

export type TNotificationMethodAsnyc<T = Array<dataStrategyResultAsyncType>> = (data?: T) => void

export interface INotification {
    event: IEvents
    method: TNotificationMethod
    handle?: (type: EventsType, data?: IEvents) => void
    handleBatch?: (notifications: Array<{ type: EventsType; data?: IEvents }>) => void
    canHandle?: (type: EventsType) => boolean
    priority?: NotificationPriority
}

export enum NotificationPriority {
    LOW = 0,
    NORMAL = 1,
    HIGH = 2,
    CRITICAL = 3
}

export interface PriorityNotification {
    type: EventsType
    data?: IEvents
    priority: NotificationPriority
}

export type NotificationStrategyType = 'microtask' | 'timeout' | 'requestAnimationFrame'

export interface BatchConfig {
    maxBatchSize?: number
    batchDelay?: number
    enablePriority?: boolean
    strategy?: NotificationStrategyType
}
