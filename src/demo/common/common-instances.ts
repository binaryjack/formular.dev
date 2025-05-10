import { DomManager } from '@core/managers/dom-manager/dom-manager'
import { IDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { NotifiableEntity } from '@core/managers/notification-manager/notification-manager'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { TrackingManager } from '@core/managers/tracking-manager/tracker-manager'
import { ITrackingManager } from '@core/managers/tracking-manager/tracker-manager.types'
import { ValidationManager } from '@core/managers/validation-manager/validation-manager'
import { IValidationManager } from '@core/managers/validation-manager/validation-manager.types'

/** here are the common objects's instances that's can be shared among the fields */
export const notificationManagerInstance: INotificationManager = new NotifiableEntity()
export const domManagerInstance: IDomManager<HTMLInputElement> = new DomManager()
export const trackingManagerInstance: ITrackingManager = new TrackingManager()
export const validationManagerInstance: IValidationManager = new ValidationManager()
