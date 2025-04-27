import { TNotifierEventsType } from '../../../notifiable-entity/notifications.types'

export const newNotificationVisitorName = (
    type: TNotifierEventsType,
    fieldId: number | string,
    fieldName: string
) => {
    return `${fieldId}_${type}_${fieldName}`
}
