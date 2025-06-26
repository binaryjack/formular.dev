/**
 * FORMULAR - Service Manager Factory
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Factory implementation for creating configurable service manager instances
 */

import { ServiceManager } from '../service-manager'
import { IServiceManager } from '../service-manager.types'
import { IServiceManagerFactory } from './i-service-manager-factory'
import { IServiceManagerSetupOptions } from './i-service-manager-setup-options'

// Import setup functions
import { setupBaseInputClasses } from '../../../../setup/core/setup-base-input-classes'
import { setupBaseFieldsConfiguration } from '../../../../setup/core/setup-base-input-configurations'
import { setupManagers } from '../../../../setup/core/setup-managers'
import { setupInputsFactory } from '../../../factories/setup/setup-input-factory'
import { setupInputsRegistry } from '../../../factories/setup/setup-input-registry'
import { setupFormularManager } from '../../formular-manager/service/setup-formular-manager'

/**
 * Concrete implementation of the service manager factory.
 * Creates service manager instances with configurable feature sets.
 */
export const ServiceManagerFactory: IServiceManagerFactory = {
    /**
     * Creates a new service manager instance with specified features
     */
    create(options: IServiceManagerSetupOptions = {}): IServiceManager {
        const {
            includeCoreManagers = true,
            includeFormularManager = true,
            includeInputEngine = true,
            includeBaseConfigurations = true,
            customSetup = [],
            parent,
            skipValidation = false
        } = options

        const serviceManager = new ServiceManager(parent)

        // Setup core features based on options
        if (includeCoreManagers) {
            setupManagers(serviceManager)
        }

        if (includeFormularManager) {
            setupFormularManager(serviceManager)
        }

        if (includeInputEngine) {
            setupBaseInputClasses(serviceManager)
            setupInputsRegistry(serviceManager)
            setupInputsFactory(serviceManager)
        }

        if (includeBaseConfigurations) {
            setupBaseFieldsConfiguration(serviceManager)
        }

        // Apply custom setup functions
        customSetup.forEach((setup) => setup(serviceManager))

        // Validate in development (unless skipped)
        if (process.env.NODE_ENV === 'development' && !skipValidation) {
            try {
                serviceManager.validateNoCycles()
                console.log('🔍 Service Manager Factory: Dependency validation passed')
            } catch (error: any) {
                console.error(
                    '🚨 Service Manager Factory: Circular dependency detected:',
                    error.message
                )
                throw error
            }
        }

        return serviceManager
    },

    /**
     * Creates a minimal service manager (just the container)
     */
    createMinimal(parent?: IServiceManager): IServiceManager {
        return new ServiceManager(parent)
    },

    /**
     * Creates a fully configured service manager with all features
     */
    createFull(parent?: IServiceManager): IServiceManager {
        return this.create({
            includeCoreManagers: true,
            includeFormularManager: true,
            includeInputEngine: true,
            includeBaseConfigurations: true,
            parent
        })
    },

    /**
     * Creates a scoped service manager from an existing one
     */
    createScope(parent: IServiceManager): IServiceManager {
        return parent.createScope()
    }
}
