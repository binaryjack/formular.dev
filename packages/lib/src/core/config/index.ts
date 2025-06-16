/**
 * FORMULAR - Configuration Module Index
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Main exports for the configuration module
 */

// Types
export * from './types/library-config.types'

// Interfaces
export * from './interfaces/configuration-service.interfaces'

// Services and their symbols
export { ConfigurationService, SConfigurationService } from './services/configuration-service'
export { InputConfigService, SInputConfigService } from './services/input-config-service'
export {
    NotificationConfigService,
    SNotificationConfigService
} from './services/notification-config-service'
export { ServiceConfigService, SServiceConfigService } from './services/service-config-service'
export {
    SValidationConfigService,
    ValidationConfigService
} from './services/validation-config-service'

// Setup function
export { setupConfigurationServices } from './setup/setup-configuration-services'

// Defaults and utilities
export { defaultLibraryConfig } from './defaults/default-library-config'
export { cloneConfig, mergeDeep, validateConfigStructure } from './utils/config-utils'
