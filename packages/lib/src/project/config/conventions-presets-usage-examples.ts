/**
 * FORMULAR - Conventions Configuration Presets Usage Examples
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Examples showing how to use ConventionsConfigPresets following the ValidationConfigPresets pattern
 */

import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    createConfigurationPresetFactory,
    IConfigurationPresets
} from './configuration-presets-factory'

/**
 * Component size options type
 */
type ComponentSize = 'small' | 'medium' | 'large'

/**
 * Trigger speed options type
 */
type TriggerSpeed = 'immediate' | 'fast' | 'normal' | 'slow'

/**
 * Enhanced form field factory using conventions presets
 * Replaces hardcoded trigger delays and component dimensions
 */
export const createFormFieldWithConventions = (serviceManager: IServiceManager) => {
    const configPresets = createConfigurationPresetFactory(serviceManager)

    return {
        /**
         * Standard form field with default conventions
         */
        standard: (fieldName: string) => {
            const conventions = configPresets.conventions

            return {
                fieldId: fieldName,
                labelId: fieldName + conventions.uiConventions.suffixes.labelId,
                describedById: fieldName + conventions.uiConventions.suffixes.describedById,
                errorId: fieldName + conventions.uiConventions.suffixes.errorId,

                // Use preset trigger delays instead of hardcoded values
                validationTriggerDelay: conventions.eventTriggers.default(), // 500ms
                uiUpdateDelay: conventions.uiTriggers.default(), // 200ms
                observableDelay: conventions.observableTriggers.default(), // 200ms

                // Component dimensions from presets
                drawerConfig: conventions.components.drawer.default(),
                buttonConfig: conventions.components.button.default(),

                // Form creation conventions
                enforceConfigurationCheck:
                    conventions.formular.creation.default().enforceConfigurationCheck
            }
        },

        /**
         * Development-optimized field with debugging-friendly settings
         */
        development: (fieldName: string) => {
            const devConventions = configPresets.conventions.profiles.developmentProfile()

            return {
                fieldId: fieldName,
                labelId: fieldName + configPresets.conventions.uiConventions.suffixes.labelId,
                describedById:
                    fieldName + configPresets.conventions.uiConventions.suffixes.describedById,

                // Slower triggers for debugging
                validationTriggerDelay: devConventions.eventTriggers, // 1000ms
                uiUpdateDelay: devConventions.uiTriggers, // 200ms
                observableDelay: devConventions.observableTriggers, // 200ms

                // Larger components for easier debugging
                drawerConfig: devConventions.components.drawer, // Large: 500px x 400px
                buttonConfig: devConventions.components.button, // Large: 2.5em x 2.5em

                // Strict configuration checks in development
                enforceConfigurationCheck: devConventions.formularCreation.enforceConfigurationCheck // true
            }
        },

        /**
         * Production-optimized field with performance settings
         */
        production: (fieldName: string) => {
            const prodConventions = configPresets.conventions.profiles.productionProfile()

            return {
                fieldId: fieldName,
                labelId: fieldName + configPresets.conventions.uiConventions.suffixes.labelId,
                describedById:
                    fieldName + configPresets.conventions.uiConventions.suffixes.describedById,

                // Faster triggers for performance
                validationTriggerDelay: prodConventions.eventTriggers, // 200ms
                uiUpdateDelay: prodConventions.uiTriggers, // 100ms
                observableDelay: prodConventions.observableTriggers, // 100ms

                // Standard components for production
                drawerConfig: prodConventions.components.drawer, // Medium: 350px x 250px
                buttonConfig: prodConventions.components.button, // Medium: 1.8em x 1.8em

                // Lenient configuration checks in production
                enforceConfigurationCheck:
                    prodConventions.formularCreation.enforceConfigurationCheck // false
            }
        },

        /**
         * Accessibility-enhanced field with inclusive design
         */
        accessibility: (fieldName: string) => {
            const a11yConventions = configPresets.conventions.profiles.accessibilityProfile()

            return {
                fieldId: fieldName,
                labelId: fieldName + configPresets.conventions.uiConventions.suffixes.labelId,
                describedById:
                    fieldName + configPresets.conventions.uiConventions.suffixes.describedById,
                helpId: fieldName + configPresets.conventions.uiConventions.suffixes.helpId,

                // Longer delays for accessibility
                validationTriggerDelay: a11yConventions.eventTriggers, // 1000ms
                uiUpdateDelay: a11yConventions.uiTriggers, // 500ms
                observableDelay: a11yConventions.observableTriggers, // 500ms

                // Larger components for accessibility
                drawerConfig: a11yConventions.components.drawer, // Large: 500px x 400px
                buttonConfig: a11yConventions.components.button, // Large: 2.5em x 2.5em

                // Strict configuration checks for accessibility
                enforceConfigurationCheck:
                    a11yConventions.formularCreation.enforceConfigurationCheck // true
            }
        }
        /**
         * Custom field with specific requirements
         */,
        custom: (
            fieldName: string,
            options: {
                triggerSpeed?: TriggerSpeed
                componentSize?: ComponentSize
                strictConfig?: boolean
            }
        ) => {
            const conventions = configPresets.conventions
            const customProfile = conventions.custom.createProfile({
                eventTriggers: options.triggerSpeed
                    ? conventions.eventTriggers[options.triggerSpeed]
                    : undefined,
                drawerSize: options.componentSize,
                buttonSize: options.componentSize,
                enforceConfigurationCheck: options.strictConfig
            })

            return {
                fieldId: fieldName,
                labelId: fieldName + conventions.uiConventions.suffixes.labelId,
                describedById: fieldName + conventions.uiConventions.suffixes.describedById,

                // Custom configuration from profile
                validationTriggerDelay: customProfile.eventTriggers,
                uiUpdateDelay: customProfile.uiTriggers,
                observableDelay: customProfile.observableTriggers,
                drawerConfig: customProfile.components.drawer,
                buttonConfig: customProfile.components.button,
                enforceConfigurationCheck: customProfile.formularCreation.enforceConfigurationCheck
            }
        }
    }
}

/**
 * Enhanced date input factory with locale-aware conventions
 */
export const createDateInputWithConventions = (serviceManager: IServiceManager) => {
    const configPresets = createConfigurationPresetFactory(serviceManager)

    return {
        /**
         * US-style date input (MM/DD/YYYY)
         */
        us: (fieldName: string) => {
            const conventions = configPresets.conventions

            return {
                fieldId: fieldName,
                format: conventions.dataTypes.date.formats.forLocale('us'), // MM/DD/YYYY
                separator: conventions.dataTypes.date.separators.slash, // '/'
                displayFormat: conventions.dataTypes.date.formats.us,
                valueFormat: conventions.dataTypes.date.formats.value(), // YYYY-MM-DD

                // Validation tokens
                validationToken: conventions.uiConventions.tokens.validation.primary, // '|data|'
                placeholderToken: conventions.uiConventions.tokens.custom('date-us'), // '|date-us|'

                // Event delays
                validationDelay: conventions.eventTriggers.default()
            }
        },

        /**
         * European-style date input (DD/MM/YYYY)
         */
        european: (fieldName: string) => {
            const conventions = configPresets.conventions

            return {
                fieldId: fieldName,
                format: conventions.dataTypes.date.formats.forLocale('eu'), // DD/MM/YYYY
                separator: conventions.dataTypes.date.separators.slash, // '/'
                displayFormat: conventions.dataTypes.date.formats.eu,
                valueFormat: conventions.dataTypes.date.formats.value(), // YYYY-MM-DD

                // Validation tokens
                validationToken: conventions.uiConventions.tokens.validation.primary, // '|data|'
                placeholderToken: conventions.uiConventions.tokens.custom('date-eu'), // '|date-eu|'

                // Event delays
                validationDelay: conventions.eventTriggers.default()
            }
        },

        /**
         * ISO-style date input (YYYY-MM-DD)
         */
        iso: (fieldName: string) => {
            const conventions = configPresets.conventions

            return {
                fieldId: fieldName,
                format: conventions.dataTypes.date.formats.forLocale('iso'), // YYYY-MM-DD
                separator: conventions.dataTypes.date.separators.dash, // '-'
                displayFormat: conventions.dataTypes.date.formats.iso,
                valueFormat: conventions.dataTypes.date.formats.value(), // YYYY-MM-DD

                // Validation tokens
                validationToken: conventions.uiConventions.tokens.validation.primary, // '|data|'
                placeholderToken: conventions.uiConventions.tokens.custom('date-iso'), // '|date-iso|'

                // Event delays
                validationDelay: conventions.eventTriggers.default()
            }
        },

        /**
         * System-aware date input (uses system locale)
         */
        system: (fieldName: string) => {
            const conventions = configPresets.conventions

            return {
                fieldId: fieldName,
                format: conventions.dataTypes.date.formats.display(), // System default
                separator: conventions.dataTypes.date.separators.system(), // System separator
                displayFormat: conventions.dataTypes.date.formats.display(),
                valueFormat: conventions.dataTypes.date.formats.value(), // YYYY-MM-DD

                // Validation tokens
                validationToken: conventions.uiConventions.tokens.validation.primary, // '|data|'
                placeholderToken: conventions.uiConventions.tokens.custom('date-system'), // '|date-system|'

                // Event delays
                validationDelay: conventions.eventTriggers.default()
            }
        }
    }
}

/**
 * Component manager factory with environment-aware conventions
 */
export const createComponentManagerWithConventions = (serviceManager: IServiceManager) => {
    const configPresets = createConfigurationPresetFactory(serviceManager)

    return {
        /**
         * Get environment-appropriate component configurations
         */
        getEnvironmentConfig: () => {
            const isDevelopment = process.env.NODE_ENV === 'development'
            const isProduction = process.env.NODE_ENV === 'production'

            if (isDevelopment) {
                return configPresets.conventions.profiles.developmentProfile()
            } else if (isProduction) {
                return configPresets.conventions.profiles.productionProfile()
            } else {
                // Test/staging environment
                return configPresets.conventions.profiles.developmentProfile()
            }
        }
        /**
         * Create drawer component with environment-specific settings
         */,
        createDrawer: (options?: { size?: ComponentSize }) => {
            const conventions = configPresets.conventions
            const manager = createComponentManagerWithConventions(serviceManager)
            const envConfig = manager.getEnvironmentConfig()

            const drawerSize = options?.size
                ? conventions.components.drawer[options.size]
                : envConfig.components.drawer

            return {
                dimensions: drawerSize,
                uiUpdateDelay: envConfig.uiTriggers,
                animationDuration: envConfig.uiTriggers * 2, // Double the UI delay for animations

                // UI conventions
                classPrefix: 'formular-drawer',
                ariaLabelSuffix: conventions.uiConventions.suffixes.describedById
            }
        }
        /**
         * Create button component with environment-specific settings
         */,
        createButton: (type: 'basic' | 'submit', options?: { size?: ComponentSize }) => {
            const conventions = configPresets.conventions
            const manager = createComponentManagerWithConventions(serviceManager)
            const envConfig = manager.getEnvironmentConfig()

            const buttonSize = options?.size
                ? conventions.components.button[options.size]
                : envConfig.components.button

            return {
                dimensions: buttonSize,
                clickDelay: envConfig.eventTriggers,

                // Type-specific settings
                config:
                    type === 'submit'
                        ? { rounded: true, size: 'lg', className: 'ml-0' }
                        : { rounded: true, size: 'sm', className: 'ml-0' },

                // UI conventions
                ariaLabelSuffix: conventions.uiConventions.suffixes.describedById
            }
        },

        /**
         * Status and validation utilities
         */
        validateConfiguration: () => {
            return configPresets.utils.validateServices()
        },

        getConfigurationStatus: () => {
            return configPresets.utils.getStatusReport()
        },

        /**
         * Get all available convention presets for debugging
         */
        getAllConventionPresets: () => {
            const conventions = configPresets.conventions
            return {
                eventTriggers: {
                    immediate: conventions.eventTriggers.immediate,
                    fast: conventions.eventTriggers.fast,
                    normal: conventions.eventTriggers.normal,
                    slow: conventions.eventTriggers.slow,
                    default: conventions.eventTriggers.default()
                },
                components: {
                    drawer: {
                        small: conventions.components.drawer.small,
                        medium: conventions.components.drawer.medium,
                        large: conventions.components.drawer.large,
                        default: conventions.components.drawer.default()
                    },
                    button: {
                        small: conventions.components.button.small,
                        medium: conventions.components.button.medium,
                        large: conventions.components.button.large,
                        default: conventions.components.button.default()
                    }
                },
                profiles: {
                    development: conventions.profiles.developmentProfile(),
                    production: conventions.profiles.productionProfile(),
                    accessibility: conventions.profiles.accessibilityProfile(),
                    performance: conventions.profiles.performanceProfile()
                }
            }
        }
    }
}

/**
 * Factory function for all conventions presets - Main Entry Point
 * This follows the exact same pattern as createValidationPresetFactory
 */
export const createAllConventionsPresets = (
    serviceManager: IServiceManager
): IConfigurationPresets['conventions'] => {
    return createConfigurationPresetFactory(serviceManager).conventions
}
