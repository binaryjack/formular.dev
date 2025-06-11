import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

export interface IAppLifeCycleInstance {
    /** this is optional notification for debugging purposes
     *  usualy this is used with main notificationManager.
     */

    getGlobalServiceManager: () => IServiceManager
    resetServiceManager: () => void
}
