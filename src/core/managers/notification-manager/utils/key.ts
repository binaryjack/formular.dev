import { INotification } from '../notification-manager.types'

export const getKey = <T>(notification: INotification): string =>
    `${notification.event.target ?? notification.event.emitterName}.${notification.event.action}`
