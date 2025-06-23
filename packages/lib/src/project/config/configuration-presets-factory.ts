/**
 * FORMULAR - Unified Configuration Presets Factory
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Unified factory for all configuration presets following the ValidationConfigPresets pattern
 * This provides a single entry point for accessing all configuration presets
 */

import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    getValidationPresets,
    IValidationConfigPresets
} from '@project/validation/validation-config-presets'
import {
    getConventionsConfigPresets,
    IConventionsConfigPresets
} from './conventions-config-presets'
import { getInputConfigPresets, IInputConfigPresets } from './input-config-presets'
import {
    getNotificationConfigPresets,
    INotificationConfigPresets
} from './notification-config-presets'
import { getServiceConfigPresets, IServiceConfigPresets } from './service-config-presets'

/**
 * Unified configuration presets interface
 * Provides centralized access to all configuration preset systems
 */
export interface IConfigurationPresets {
    /**
     * Validation configuration presets
     * Patterns, validation rules, and validation behavior
     */
    validation: IValidationConfigPresets

    /**
     * Input configuration presets
     * Input field behavior, triggers, and display settings
     */
    input: IInputConfigPresets

    /**
     * Notification configuration presets
     * Notification display, timing, and behavior settings
     */
    notification: INotificationConfigPresets

    /**
     * Service configuration presets
     * Service management, logging, and environment settings
     */
    service: IServiceConfigPresets

    /**
     * Conventions configuration presets
     * UI conventions, trigger delays, component dimensions, and formatting
     */
    conventions: IConventionsConfigPresets

    /**
     * Cross-cutting configuration profiles
     * Combines settings across multiple configuration areas
     */
    profiles: {
        /**
         * Complete development environment configuration
         */
        developmentProfile: () => {
            validation: ReturnType<IValidationConfigPresets['custom']['getPattern']>
            input: ReturnType<IInputConfigPresets['profiles']['standardProfile']>
            notification: ReturnType<INotificationConfigPresets['profiles']['infoProfile']>
            service: ReturnType<IServiceConfigPresets['profiles']['developmentProfile']>
            conventions: ReturnType<IConventionsConfigPresets['profiles']['developmentProfile']>
        }

        /**
         * Complete production environment configuration
         */
        productionProfile: () => {
            validation: ReturnType<IValidationConfigPresets['custom']['getPattern']>
            input: ReturnType<IInputConfigPresets['profiles']['standardProfile']>
            notification: ReturnType<INotificationConfigPresets['profiles']['silentProfile']>
            service: ReturnType<IServiceConfigPresets['profiles']['productionProfile']>
            conventions: ReturnType<IConventionsConfigPresets['profiles']['productionProfile']>
        }

        /**
         * Complete accessibility-enhanced configuration
         */
        accessibilityProfile: () => {
            validation: ReturnType<IValidationConfigPresets['custom']['getPattern']>
            input: ReturnType<IInputConfigPresets['profiles']['accessibilityProfile']>
            notification: ReturnType<INotificationConfigPresets['profiles']['accessibilityProfile']>
            service: ReturnType<IServiceConfigPresets['profiles']['debugProfile']>
            conventions: ReturnType<IConventionsConfigPresets['profiles']['accessibilityProfile']>
        }
        /**
         * Complete high-performance configuration
         */
        performanceProfile: () => {
            validation: ReturnType<IValidationConfigPresets['custom']['getPattern']>
            input: ReturnType<IInputConfigPresets['profiles']['relaxedProfile']>
            notification: ReturnType<INotificationConfigPresets['profiles']['silentProfile']>
            service: ReturnType<IServiceConfigPresets['profiles']['performanceProfile']>
            conventions: ReturnType<IConventionsConfigPresets['profiles']['performanceProfile']>
        }

        /**
         * Complete testing environment configuration
         */
        testingProfile: () => {
            validation: ReturnType<IValidationConfigPresets['custom']['getPattern']>
            input: ReturnType<IInputConfigPresets['profiles']['standardProfile']>
            notification: ReturnType<INotificationConfigPresets['profiles']['silentProfile']>
            service: ReturnType<IServiceConfigPresets['profiles']['testingProfile']>
            conventions: ReturnType<IConventionsConfigPresets['profiles']['developmentProfile']>
        }
    }

    /**
     * Utility functions for configuration management
     */
    utils: {
        /**
         * Auto-detect environment and return appropriate profile
         */
        autoDetectProfile: () => ReturnType<IConfigurationPresets['profiles']['developmentProfile']>

        /**
         * Validate that all configuration services are available
         */
        validateServices: () => boolean

        /**
         * Get configuration status report
         */ getStatusReport: () => {
            validation: boolean
            input: boolean
            notification: boolean
            service: boolean
            conventions: boolean
            allAvailable: boolean
        }
    }
}

export const SConfigurationPresets = Symbol.for('IConfigurationPresets')

/**
 * ConfigurationPresets implementation
 * Unified factory for accessing all configuration presets
 */
export const ConfigurationPresets = function (
    this: IConfigurationPresets,
    sm: IServiceManager
): IConfigurationPresets {
    if (!sm) {
        throw new Error('ServiceManager is required for ConfigurationPresets')
    } // Initialize individual preset systems
    this.validation = getValidationPresets(sm)
    this.input = getInputConfigPresets(sm)
    this.notification = getNotificationConfigPresets(sm)
    this.service = getServiceConfigPresets(sm)
    this.conventions = getConventionsConfigPresets(sm)

    // Cross-cutting profiles
    this.profiles = {
        developmentProfile: () => ({
            validation: undefined, // Validation doesn't have simple profiles, use defaults
            input: this.input.profiles.standardProfile(),
            notification: this.notification.profiles.infoProfile(),
            service: this.service.profiles.developmentProfile(),
            conventions: this.conventions.profiles.developmentProfile()
        }),

        productionProfile: () => ({
            validation: undefined,
            input: this.input.profiles.standardProfile(),
            notification: this.notification.profiles.silentProfile(),
            service: this.service.profiles.productionProfile(),
            conventions: this.conventions.profiles.productionProfile()
        }),

        accessibilityProfile: () => ({
            validation: undefined,
            input: this.input.profiles.accessibilityProfile(),
            notification: this.notification.profiles.accessibilityProfile(),
            service: this.service.profiles.debugProfile(),
            conventions: this.conventions.profiles.accessibilityProfile()
        }),

        performanceProfile: () => ({
            validation: undefined,
            input: this.input.profiles.relaxedProfile(),
            notification: this.notification.profiles.silentProfile(),
            service: this.service.profiles.performanceProfile(),
            conventions: this.conventions.profiles.performanceProfile()
        }),

        testingProfile: () => ({
            validation: undefined,
            input: this.input.profiles.standardProfile(),
            notification: this.notification.profiles.silentProfile(),
            service: this.service.profiles.testingProfile(),
            conventions: this.conventions.profiles.developmentProfile() // Use dev conventions for testing
        })
    }

    // Utility functions
    this.utils = {
        autoDetectProfile: () => {
            return this.service.environment.autoDetectProfile()
                ? this.profiles.productionProfile()
                : this.profiles.developmentProfile()
        },

        validateServices: () => {
            try {
                const status = this.utils.getStatusReport()
                return status.allAvailable
            } catch {
                return false
            }
        },
        getStatusReport: () => {
            const status = {
                validation: false,
                input: false,
                notification: false,
                service: false,
                conventions: false,
                allAvailable: false
            }

            try {
                // Test if validation service is available by accessing a property
                const testEmail = this.validation.email
                status.validation = testEmail !== undefined
            } catch {
                // Validation service not available
            }

            try {
                this.input.triggers.default()
                status.input = true
            } catch {
                // Input service not available
            }

            try {
                this.notification.duration.default()
                status.notification = true
            } catch {
                // Notification service not available
            }
            try {
                this.service.logLevel.default()
                status.service = true
            } catch {
                // Service config not available
            }

            try {
                this.conventions.eventTriggers.default()
                status.conventions = true
            } catch {
                // Conventions config not available
            }

            status.allAvailable =
                status.validation &&
                status.input &&
                status.notification &&
                status.service &&
                status.conventions

            return status
        }
    }

    return this
} as any as IConfigurationPresets

/**
 * Registers ConfigurationPresets with the IoC container
 */
export const registerConfigurationPresets = function (sm: IServiceManager): void {
    if (!sm.isRegistered(SConfigurationPresets)) {
        sm.register(
            SConfigurationPresets,
            (container: IServiceManager) => {
                return new (ConfigurationPresets as any)(container)
            },
            {
                lifetime: 'singleton'
            }
        )
    }
}

/**
 * Factory function for creating unified configuration presets
 * This is the main entry point for consumers using configuration presets
 *
 * @example
 * ```typescript
 * // Get unified configuration presets
 * const configPresets = createConfigurationPresetFactory(serviceManager)
 *
 * // Use validation presets
 * const phonePattern = configPresets.validation.phone.us
 *
 * // Use input presets
 * const realtimeConfig = configPresets.input.profiles.realTimeProfile()
 *
 * // Use notification presets
 * const errorNotification = configPresets.notification.profiles.errorProfile()
 *
 * // Use service presets
 * const devConfig = configPresets.service.profiles.developmentProfile()
 *
 * // Use cross-cutting profiles
 * const fullDevProfile = configPresets.profiles.developmentProfile()
 * ```
 */
export const createConfigurationPresetFactory = function (
    sm: IServiceManager
): IConfigurationPresets {
    if (!sm.isRegistered(SConfigurationPresets)) {
        registerConfigurationPresets(sm)
    }
    return sm.resolve<IConfigurationPresets>(SConfigurationPresets)
}
