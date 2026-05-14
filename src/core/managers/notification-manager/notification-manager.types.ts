import { IEvents } from '@core/framework/events/events.types'
import { IValidationResult } from '../validation-manager/validation-manager.types'
import { NotificationPriorityEnum } from './enums/notification-priority.enum'
import type { IBatchConfig } from './interfaces/i-batch-config'
import type { IPriorityNotification } from './interfaces/i-priority-notification'

// Re-export from refactored files
export { NotificationPriorityEnum } from './enums/notification-priority.enum'
export type { IBatchConfig } from './interfaces/i-batch-config'
export type { INotification } from './interfaces/i-notification'
export type { IPriorityNotification } from './interfaces/i-priority-notification'
export type { DataStrategyResultAsyncType } from './types/data-strategy-result-async.type'
export type { NotificationStrategyType } from './types/notification-strategy.type'
export type { TNotificationMethodAsyncType } from './types/t-notification-method-async.type'
export type { TNotificationMethodType } from './types/t-notification-method.type'

// Backward compatibility aliases
export type dataStrategyResultAsyncType = (data: IEvents) => Promise<IValidationResult>
export type TNotificationMethod<T = any> = (data?: T) => void
export type TNotificationMethodAsnyc<T = Array<dataStrategyResultAsyncType>> = (data?: T) => void
export const NotificationPriority = NotificationPriorityEnum
export type PriorityNotification = IPriorityNotification
export type BatchConfig = IBatchConfig

export const SNotificationManager = Symbol.for('INotificationManager')
export const SAutoTrackerNotificationManager = Symbol.for('SAutoTrackerNotificationManager')
