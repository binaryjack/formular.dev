/**
 * FORMULAR - Service Configuration Presets
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Centralized service configuration presets accessible through ServiceConfigService
 * This provides preconfigured service settings for different environments and use cases
 */

import { IServiceConfigService } from '@core/config/interfaces/configuration-service.interfaces'
import { SServiceConfigService } from '@core/config/services/service-config-service'
import { LogLevel } from '@core/config/types/library-config.types'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

/**
 * Service configuration presets interface
 * Provides easy access to preconfigured service settings
 */
export interface IServiceConfigPresets {
    /**
     * Log level presets
     */
    logLevel: {
        error: LogLevel
        warn: LogLevel
        info: LogLevel
        debug: LogLevel
        default: () => string
    }

    /**
     * Development validation presets
     */
    developmentValidation: {
        enabled: boolean
        disabled: boolean
        default: () => boolean
    }

    /**
     * Circular dependency detection presets
     */
    circularDependencyDetection: {
        enabled: boolean
        disabled: boolean
        default: () => boolean
    }

    /**
     * Performance metrics presets
     */
    performanceMetrics: {
        enabled: boolean
        disabled: boolean
        default: () => boolean
    }

    /**
     * Environment-specific profiles
     */
    profiles: {
        /**
         * Development environment profile
         * Full debugging and validation enabled
         */
        developmentProfile: () => {
            logLevel: string
            developmentValidation: boolean
            circularDependencyDetection: boolean
            performanceMetrics: boolean
        }

        /**
         * Production environment profile
         * Optimized for performance, minimal logging
         */
        productionProfile: () => {
            logLevel: string
            developmentValidation: boolean
            circularDependencyDetection: boolean
            performanceMetrics: boolean
        }

        /**
         * Testing environment profile
         * Balanced settings for test execution
         */
        testingProfile: () => {
            logLevel: string
            developmentValidation: boolean
            circularDependencyDetection: boolean
            performanceMetrics: boolean
        }

        /**
         * Staging environment profile
         * Production-like with some debugging
         */
        stagingProfile: () => {
            logLevel: string
            developmentValidation: boolean
            circularDependencyDetection: boolean
            performanceMetrics: boolean
        }

        /**
         * Debugging profile
         * Maximum verbosity and validation
         */
        debugProfile: () => {
            logLevel: string
            developmentValidation: boolean
            circularDependencyDetection: boolean
            performanceMetrics: boolean
        }

        /**
         * Performance profile
         * Minimal overhead for performance testing
         */
        performanceProfile: () => {
            logLevel: string
            developmentValidation: boolean
            circularDependencyDetection: boolean
            performanceMetrics: boolean
        }
    }

    /**
     * Custom configurations
     */
    custom: {
        createProfile: (options: {
            logLevel?: string
            developmentValidation?: boolean
            circularDependencyDetection?: boolean
            performanceMetrics?: boolean
        }) => {
            logLevel: string
            developmentValidation: boolean
            circularDependencyDetection: boolean
            performanceMetrics: boolean
        }
    }

    /**
     * Environment detection helpers
     */
    environment: {
        /**
         * Detects current environment and returns appropriate profile
         */
        autoDetectProfile: () => {
            logLevel: string
            developmentValidation: boolean
            circularDependencyDetection: boolean
            performanceMetrics: boolean
        }

        /**
         * Checks if running in development
         */
        isDevelopment: () => boolean

        /**
         * Checks if running in production
         */
        isProduction: () => boolean

        /**
         * Checks if running in test
         */
        isTest: () => boolean
    }
}

export const SServiceConfigPresets = Symbol.for('IServiceConfigPresets')

/**
 * ServiceConfigPresets implementation
 * Provides easy access to service configuration through ServiceConfigService
 */
export const ServiceConfigPresets = function (
    this: IServiceConfigPresets,
    sm: IServiceManager
): IServiceConfigPresets {
    if (!sm) {
        throw new Error('ServiceManager is required for ServiceConfigPresets')
    }

    const getServiceConfig = (): IServiceConfigService => {
        try {
            return sm.resolve<IServiceConfigService>(SServiceConfigService)
        } catch (error: any) {
            console.warn(
                'ServiceConfigService not available, using fallback configuration:',
                error.message
            )
            throw new Error(
                'ServiceConfigService not found. Ensure setupConfigurationServices() is called first.'
            )
        }
    }

    // Static presets
    this.logLevel = {
        error: 'error',
        warn: 'warn',
        info: 'info',
        debug: 'debug',
        default: () => getServiceConfig().getLogLevel()
    }

    this.developmentValidation = {
        enabled: true,
        disabled: false,
        default: () => getServiceConfig().isDevelopmentValidationEnabled()
    }

    this.circularDependencyDetection = {
        enabled: true,
        disabled: false,
        default: () => getServiceConfig().isCircularDependencyDetectionEnabled()
    }

    this.performanceMetrics = {
        enabled: true,
        disabled: false,
        default: () => getServiceConfig().isPerformanceMetricsEnabled()
    }

    // Environment helpers
    this.environment = {
        isDevelopment: () => process.env.NODE_ENV === 'development',
        isProduction: () => process.env.NODE_ENV === 'production',
        isTest: () => process.env.NODE_ENV === 'test',

        autoDetectProfile: () => {
            if (this.environment.isProduction()) {
                return this.profiles.productionProfile()
            } else if (this.environment.isTest()) {
                return this.profiles.testingProfile()
            } else {
                return this.profiles.developmentProfile()
            }
        }
    }

    // Configuration profiles
    this.profiles = {
        developmentProfile: () => ({
            logLevel: this.logLevel.debug,
            developmentValidation: this.developmentValidation.enabled,
            circularDependencyDetection: this.circularDependencyDetection.enabled,
            performanceMetrics: this.performanceMetrics.enabled
        }),

        productionProfile: () => ({
            logLevel: this.logLevel.error,
            developmentValidation: this.developmentValidation.disabled,
            circularDependencyDetection: this.circularDependencyDetection.disabled,
            performanceMetrics: this.performanceMetrics.disabled
        }),

        testingProfile: () => ({
            logLevel: this.logLevel.warn,
            developmentValidation: this.developmentValidation.enabled,
            circularDependencyDetection: this.circularDependencyDetection.enabled,
            performanceMetrics: this.performanceMetrics.disabled
        }),

        stagingProfile: () => ({
            logLevel: this.logLevel.info,
            developmentValidation: this.developmentValidation.disabled,
            circularDependencyDetection: this.circularDependencyDetection.enabled,
            performanceMetrics: this.performanceMetrics.enabled
        }),

        debugProfile: () => ({
            logLevel: this.logLevel.debug,
            developmentValidation: this.developmentValidation.enabled,
            circularDependencyDetection: this.circularDependencyDetection.enabled,
            performanceMetrics: this.performanceMetrics.enabled
        }),

        performanceProfile: () => ({
            logLevel: this.logLevel.error,
            developmentValidation: this.developmentValidation.disabled,
            circularDependencyDetection: this.circularDependencyDetection.disabled,
            performanceMetrics: this.performanceMetrics.enabled
        })
    }

    this.custom = {
        createProfile: (options) => {
            const config = getServiceConfig()
            return {
                logLevel: options.logLevel ?? config.getLogLevel(),
                developmentValidation:
                    options.developmentValidation ?? config.isDevelopmentValidationEnabled(),
                circularDependencyDetection:
                    options.circularDependencyDetection ??
                    config.isCircularDependencyDetectionEnabled(),
                performanceMetrics:
                    options.performanceMetrics ?? config.isPerformanceMetricsEnabled()
            }
        }
    }

    return this
} as any as IServiceConfigPresets

/**
 * Registers ServiceConfigPresets with the IoC container
 */
export const registerServiceConfigPresets = function (sm: IServiceManager): void {
    if (!sm.isRegistered(SServiceConfigPresets)) {
        sm.register(
            SServiceConfigPresets,
            (container: IServiceManager) => {
                return new (ServiceConfigPresets as any)(container)
            },
            {
                lifetime: 'singleton'
            }
        )
    }
}

/**
 * Factory function for creating ServiceConfigPresets
 * This follows the same pattern as ValidationConfigPresets
 */
export const getServiceConfigPresets = function (sm: IServiceManager): IServiceConfigPresets {
    if (!sm.isRegistered(SServiceConfigPresets)) {
        registerServiceConfigPresets(sm)
    }
    return sm.resolve<IServiceConfigPresets>(SServiceConfigPresets)
}
