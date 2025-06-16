/**
 * FORMULAR - Configuration Service Interfaces
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Interfaces for configuration services used in the IoC container
 */

import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    ErrorDisplayMode,
    FallbackBehavior,
    InputConfig,
    LibraryConfig,
    NotificationConfig,
    PartialLibraryConfig,
    ServiceConfig,
    ValidationConfig,
    ValidationTrigger
} from '../types/library-config.types'

/**
 * Main configuration service interface
 * Provides access to all configuration sections
 */
export interface IConfigurationService {
    new (sm: IServiceManager): IConfigurationService
    sm: IServiceManager
    getValidationConfig: () => ValidationConfig
    getInputConfig: () => InputConfig
    getServiceConfig: () => ServiceConfig
    getNotificationConfig: () => NotificationConfig
    getFullConfig: () => LibraryConfig
    updateConfig: (config: PartialLibraryConfig) => void
    resetToDefaults: () => void
}

/**
 * Specialized validation configuration service
 * Provides focused access to validation-related configuration
 */
export interface IValidationConfigService {
    new (sm: IServiceManager): IValidationConfigService
    sm: IServiceManager
    getPatterns: () => ValidationConfig['patterns']
    getFallbackBehavior: () => FallbackBehavior
    isStrictModeEnabled: () => boolean
    validatePattern: (type: string, locale: string, value: string) => boolean
    getPatternForLocale: (type: string, locale: string) => RegExp | undefined
    getSupportedLocales: (type: string) => string[]
}

/**
 * Specialized input configuration service
 * Provides focused access to input-related configuration
 */
export interface IInputConfigService {
    new (sm: IServiceManager): IInputConfigService
    sm: IServiceManager
    getDefaultTrigger: () => ValidationTrigger
    getErrorDisplay: () => ErrorDisplayMode
    getDebounceMs: () => number
    isAutoFocusEnabled: () => boolean
    isAccessibilityEnabled: () => boolean
}

/**
 * Specialized service configuration service
 * Provides focused access to service-related configuration
 */
export interface IServiceConfigService {
    new (sm: IServiceManager): IServiceConfigService
    sm: IServiceManager
    isDevelopmentValidationEnabled: () => boolean
    isCircularDependencyDetectionEnabled: () => boolean
    getLogLevel: () => string
    isPerformanceMetricsEnabled: () => boolean
}

/**
 * Specialized notification configuration service
 * Provides focused access to notification-related configuration
 */
export interface INotificationConfigService {
    new (sm: IServiceManager): INotificationConfigService
    sm: IServiceManager
    getDefaultDuration: () => number
    getMaxConcurrent: () => number
    getPosition: () => string
    isSoundEnabled: () => boolean
    isAnimationEnabled: () => boolean
}
