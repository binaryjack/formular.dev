import { IDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { ITrackingManager } from '@core/managers/tracking-manager/tracker-manager.types'
import { IValidationManager } from '@core/managers/validation-manager/validation-manager.types'

export interface IFieldInputLifeCycleInstance {
    notificationManager: INotificationManager
    domManager: IDomManager<HTMLInputElement>
    trackingManager: ITrackingManager
    validationManager: IValidationManager
    /** this is optional notification for debugging purposes
     *  usualy this is used with main notificationManager.
     */
    autoTracker?: INotificationManager
}
