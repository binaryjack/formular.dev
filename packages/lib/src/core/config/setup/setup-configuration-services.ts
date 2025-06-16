/**
 * FORMULAR - Configuration Services Setup
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Setup and registration of configuration services with IoC container
 */

import {
    IServiceManager,
    SServiceManager
} from '@core/managers/service-manager/service-manager.types'
import { PartialLibraryConfig } from '../types/library-config.types'
import { validateConfigStructure } from '../utils/config-utils'

import { ConfigurationService, SConfigurationService } from '../services/configuration-service'
import { InputConfigService, SInputConfigService } from '../services/input-config-service'
import {
    NotificationConfigService,
    SNotificationConfigService
} from '../services/notification-config-service'
import { ServiceConfigService, SServiceConfigService } from '../services/service-config-service'
import {
    SValidationConfigService,
    ValidationConfigService
} from '../services/validation-config-service'

/**
 * Registers all configuration services with the IoC container
 * This should be called during application startup
 */
export const setupConfigurationServices = function (
    sm: IServiceManager,
    userConfig?: PartialLibraryConfig
): void {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    // Validate user configuration if provided
    if (userConfig) {
        validateConfigStructure(userConfig)
    }

    // Register the service manager itself (required for dependency resolution)
    if (!sm.isRegistered(SServiceManager)) {
        sm.register(SServiceManager, () => sm, { lifetime: 'singleton' })
    }

    // Register the main configuration service with user config
    sm.register(
        SConfigurationService,
        (container: IServiceManager) => {
            const service = new ConfigurationService(container)
            if (userConfig) {
                service.updateConfig(userConfig)
            }
            return service
        },
        {
            lifetime: 'singleton'
        }
    ) // Register specialized configuration services
    sm.registerClass(SValidationConfigService, ValidationConfigService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SInputConfigService, InputConfigService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SServiceConfigService, ServiceConfigService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SNotificationConfigService, NotificationConfigService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })
}
