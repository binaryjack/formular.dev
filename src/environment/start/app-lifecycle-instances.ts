import { NotificationManager } from '@core/managers/notification-manager/notification-manager'
import { ServiceManager } from '@core/managers/service-manager/service-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { IAppLifeCycleInstance } from 'src/environment/interfaces/i-app-lifecycle-instances'

import { setupInputsFactory } from '@core/factories/setup/setup-input-factory'
import { setupInputsRegistry } from '@core/factories/setup/setup-input-registry'
import { setupBaseInputClasses } from '../setup/setup-base-input-classes'
import { setupBaseFieldsConfiguration } from '../setup/setup-base-input-configurations'
import { setupManagers } from '../setup/setup-managers'

export const applifeCylceInstance: IAppLifeCycleInstance = (function () {
    /** Main application IoC */
    let globalServiceManager: IServiceManager | null = null

    const getGlobalServiceManager = function (): IServiceManager {
        globalServiceManager ??= new ServiceManager()
        return globalServiceManager
    }

    const resetServiceManager = function () {
        if (globalServiceManager) {
            globalServiceManager.dispose()
            globalServiceManager = null
        }
    }
    setupBaseFieldsConfiguration(getGlobalServiceManager())
    setupManagers(getGlobalServiceManager())
    setupBaseInputClasses(getGlobalServiceManager())
    setupInputsRegistry(getGlobalServiceManager())
    setupInputsFactory(getGlobalServiceManager())

    /** To be used as instance for AUTO TRACKER
     * for debugging purposes only.
     * This is not used in production.
     * therefore we should TODO: toggle this off with a flag
     */
    const _intNotificationTracker = new NotificationManager()

    return {
        // this is used for debugging purposes, to track the auto notifications
        autoTracker: _intNotificationTracker,
        resetServiceManager: resetServiceManager,
        getGlobalServiceManager: getGlobalServiceManager
    }
})()
