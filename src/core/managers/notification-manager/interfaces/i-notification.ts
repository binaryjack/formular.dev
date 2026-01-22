import { EventsType, IEvents } from '@core/framework/events/events.types'
import { NotificationPriorityEnum } from '../enums/notification-priority.enum'
import { TNotificationMethodType } from '../types/t-notification-method.type'

/**
 * Interface representing a notification configuration.
 *
 * Defines how notifications are handled and processed within the FORMULAR system.
 */
export interface INotification {
    /** The event configuration that defines what events this notification handles */
    event: IEvents
    /** The method to execute when the notification is triggered */
    method: TNotificationMethodType
    /** Optional handler for single event notifications */
    handle?: (type: EventsType, data?: IEvents) => void
    /** Optional handler for batch event notifications (performance optimization) */
    handleBatch?: (notifications: Array<{ type: EventsType; data?: IEvents }>) => void
    /** Optional predicate to determine if this notification can handle a specific event type */
    canHandle?: (type: EventsType) => boolean
    /** Priority level for batched notification processing */
    priority?: NotificationPriorityEnum
}
