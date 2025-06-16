/**
 * FORMULAR - Configuration Service
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Main configuration service for the FORMULAR library using IoC container
 */

import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { defaultLibraryConfig } from '../defaults/default-library-config'
import { IConfigurationService } from '../interfaces/configuration-service.interfaces'
import {
    InputConfig,
    LibraryConfig,
    NotificationConfig,
    PartialLibraryConfig,
    ServiceConfig,
    ValidationConfig
} from '../types/library-config.types'
import { cloneConfig, mergeDeep, validateConfigStructure } from '../utils/config-utils'

export const SConfigurationService = Symbol.for('IConfigurationService')

export const ConfigurationService = function (this: IConfigurationService, sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    this.sm = sm

    // Private internal configuration
    let currentConfig: LibraryConfig = cloneConfig(defaultLibraryConfig)

    this.getValidationConfig = function (): ValidationConfig {
        return cloneConfig(currentConfig.validation)
    }

    this.getInputConfig = function (): InputConfig {
        return cloneConfig(currentConfig.inputs)
    }

    this.getServiceConfig = function (): ServiceConfig {
        return cloneConfig(currentConfig.services)
    }

    this.getNotificationConfig = function (): NotificationConfig {
        return cloneConfig(currentConfig.notifications)
    }

    this.getFullConfig = function (): LibraryConfig {
        return cloneConfig(currentConfig)
    }

    this.updateConfig = function (config: PartialLibraryConfig): void {
        validateConfigStructure(config)
        currentConfig = mergeDeep(currentConfig, config)
    }

    this.resetToDefaults = function (): void {
        currentConfig = cloneConfig(defaultLibraryConfig)
    }
} as any as IConfigurationService
