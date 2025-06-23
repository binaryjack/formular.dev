import { EventsType, IEvents } from '@core/framework/events/events.types'
import { NotificationPriorityEnum } from '../enums/notification-priority.enum'

/**
 * Interface for priority-based notifications in the batching system.
 */
export interface IPriorityNotification {
    /** The type of event being notified */
    type: EventsType
    /** Optional data payload for the notification */
    data?: IEvents
    /** Priority level for processing order */
    priority: NotificationPriorityEnum
}
