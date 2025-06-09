import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

export interface IAppLifeCycleInstance {
    /** this is optional notification for debugging purposes
     *  usualy this is used with main notificationManager.
     */
    autoTracker?: INotificationManager
    getGlobalServiceManager: () => IServiceManager
    resetServiceManager: () => void
}
