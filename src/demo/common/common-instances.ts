import { DomManager } from '@core/managers/dom-manager/dom-manager'
import { IDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { NotificationManager } from '@core/managers/notification-manager/notification-manager'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { TrackingManager } from '@core/managers/tracking-manager/tracker-manager'
import { ITrackingManager } from '@core/managers/tracking-manager/tracker-manager.types'
import { ValidationManager } from '@core/managers/validation-manager/validation-manager'
import { IValidationManager } from '@core/managers/validation-manager/validation-manager.types'

export const lifeCylceInstances = (function () {
    /** To be used as instance for AUTO TRACKER */
    const _intNotificationTracker = new NotificationManager()
    /** here are the common objects's instances that's can be shared among the fields */
    const notificationManagerInstance: INotificationManager = new NotificationManager()
    const domManagerInstance: IDomManager<HTMLInputElement> = new DomManager()
    const trackingManagerInstance: ITrackingManager = new TrackingManager()
    const validationManagerInstance: IValidationManager = new ValidationManager()

    return {
        notificationManagerInstance,
        domManagerInstance,
        trackingManagerInstance,
        validationManagerInstance,
        _intNotificationTracker
    }
})()
