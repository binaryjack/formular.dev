/**
 * FORMULAR - Application Lifecycle Management
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Main entry point for initializing the FORMULAR system and managing global instances
 *
 * @deprecated This global singleton approach is deprecated.
 * Use ServiceManagerFactory and SetupHelpers instead for better control and testability.
 * See migration guide for more information.
 */

import { ServiceManager } from '../../core/managers/service-manager/service-manager'
import { IServiceManager } from '../../core/managers/service-manager/service-manager.types'

import { setupInputsFactory } from '../../core/factories/setup/setup-input-factory'
import { setupInputsRegistry } from '../../core/factories/setup/setup-input-registry'
import { setupFormularManager } from '../../core/managers/formular-manager/service/setup-formular-manager'
import { setupBaseInputClasses } from '../core/setup-base-input-classes'
import { setupBaseFieldsConfiguration } from '../core/setup-base-input-configurations'
import { setupManagers } from '../core/setup-managers'
import { IAppLifeCycleInstance } from './i-app-lifecycle-instances'

export const applifeCylceInstance: IAppLifeCycleInstance = (function () {
    /** Main application IoC */
    let globalServiceManager: IServiceManager | null = null

    const getGlobalServiceManager = function (): IServiceManager {
        if (process.env.NODE_ENV === 'development') {
            console.warn(
                '⚠️ DEPRECATED: applifeCylceInstance.getGlobalServiceManager() is deprecated. ' +
                    'Use ServiceManagerFactory.create() or SetupHelpers instead. ' +
                    'See migration guide for more information.'
            )
        }
        globalServiceManager ??= new ServiceManager()
        return globalServiceManager
    }

    const resetServiceManager = function () {
        if (process.env.NODE_ENV === 'development') {
            console.warn(
                '⚠️ DEPRECATED: applifeCylceInstance.resetServiceManager() is deprecated. ' +
                    'Use proper service manager lifecycle management instead.'
            )
        }
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
     * Flag to toggle debug validation
     */
    const enableDebugValidation =
        process.env.NODE_ENV === 'development' &&
        process.env.FORMULAR_ENABLE_DEBUG_VALIDATION !== 'false'

    // Validate dependencies in development
    if (enableDebugValidation) {
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
