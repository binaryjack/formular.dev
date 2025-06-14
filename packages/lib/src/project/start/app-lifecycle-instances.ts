import { ServiceManager } from '../../core/managers/service-manager/service-manager'
import { IServiceManager } from '../../core/managers/service-manager/service-manager.types'

import { setupInputsFactory } from '../../core/factories/setup/setup-input-factory'
import { setupInputsRegistry } from '../../core/factories/setup/setup-input-registry'
import { setupFormularManager } from '../../core/managers/formular-manager/service/setup-formular-manager'
import { IAppLifeCycleInstance } from '../interfaces/i-app-lifecycle-instances'
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
    setupManagers(getGlobalServiceManager())
    setupFormularManager(getGlobalServiceManager())
    setupBaseInputClasses(getGlobalServiceManager())
    setupInputsRegistry(getGlobalServiceManager())
    setupInputsFactory(getGlobalServiceManager())
    setupBaseFieldsConfiguration(getGlobalServiceManager())

    /** To be used as instance for AUTO TRACKER
     * for debugging purposes only.
     * This is not used in production.
     * therefore we should TODO: toggle this off with a flag
     */

    // Validate dependencies in development
    if (process.env.NODE_ENV === 'development') {
        try {
            getGlobalServiceManager().validateNoCycles()
            console.log('🔍 Dependency validation passed')
        } catch (error: any) {
            console.error('🚨 Circular dependency detected during startup:', error.message)
            throw error // Fail fast in development
        }
    }

    return {
        // this is used for debugging purposes, to track the auto notifications

        resetServiceManager: resetServiceManager,
        getGlobalServiceManager: getGlobalServiceManager
    }
})()
