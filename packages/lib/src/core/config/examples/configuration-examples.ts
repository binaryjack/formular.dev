/**
 * FORMULAR - Configuration Usage Examples
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Simple examples showing how to use the configuration system
 */

import { ServiceManager } from '@core/managers/service-manager/service-manager'
import {
    IConfigurationService,
    IValidationConfigService,
    PartialLibraryConfig,
    SConfigurationService,
    setupConfigurationServices,
    SValidationConfigService
} from '../index'

// Example 1: Basic Setup
export const basicConfigurationExample = function () {
    const serviceManager = new ServiceManager()

    // Set up with custom configuration
    const userConfig: PartialLibraryConfig = {
        validation: {
            patterns: {
                phone: {
                    FR: /^(?:\+33|0)[1-9](?:\d{8})$/,
                    fallback: /^[\d\s\-+()]{7,15}$/
                }
            },
            fallbackBehavior: 'lenient'
        },
        inputs: {
            debounceMs: 500,
            defaultValidationTrigger: 'onChange'
        }
    }

    setupConfigurationServices(serviceManager, userConfig)

    return serviceManager
}

// Example 2: Using Configuration in a Service
export const useConfigurationExample = function () {
    const serviceManager = basicConfigurationExample()

    // Resolve configuration services
    const configService = serviceManager.resolve(SConfigurationService) as IConfigurationService
    const validationConfig = serviceManager.resolve(
        SValidationConfigService
    ) as IValidationConfigService

    // Use configuration
    const debounceMs = configService.getInputConfig().debounceMs
    console.log('Debounce MS:', debounceMs) // 500

    const isValidPhone = validationConfig.validatePattern('phone', 'FR', '0123456789')
    console.log('Valid French phone:', isValidPhone)

    const supportedLocales = validationConfig.getSupportedLocales('phone')
    console.log('Supported phone locales:', supportedLocales)

    return {
        debounceMs,
        isValidPhone,
        supportedLocales
    }
}

// Example 3: Runtime Configuration Updates
export const runtimeConfigurationExample = function () {
    const serviceManager = basicConfigurationExample()
    const configService = serviceManager.resolve(SConfigurationService) as IConfigurationService

    // Get initial config
    const initialDebounce = configService.getInputConfig().debounceMs
    console.log('Initial debounce:', initialDebounce) // 500

    // Update configuration
    configService.updateConfig({
        inputs: {
            debounceMs: 750
        }
    })

    const updatedDebounce = configService.getInputConfig().debounceMs
    console.log('Updated debounce:', updatedDebounce) // 750

    // Reset to defaults
    configService.resetToDefaults()
    const defaultDebounce = configService.getInputConfig().debounceMs
    console.log('Default debounce:', defaultDebounce) // 300

    return {
        initialDebounce,
        updatedDebounce,
        defaultDebounce
    }
}

// Example 4: Environment-Specific Configuration
export const environmentConfigurationExample = function () {
    const serviceManager = new ServiceManager()

    const isDevelopment = process.env.NODE_ENV === 'development'

    const envConfig: PartialLibraryConfig = {
        services: {
            enableDevelopmentValidation: isDevelopment,
            logLevel: isDevelopment ? 'debug' : 'error',
            enablePerformanceMetrics: isDevelopment
        },
        validation: {
            enableStrictMode: !isDevelopment
        }
    }

    setupConfigurationServices(serviceManager, envConfig)

    const configService = serviceManager.resolve(SConfigurationService) as IConfigurationService
    const serviceConfig = configService.getServiceConfig()

    console.log('Development validation enabled:', serviceConfig.enableDevelopmentValidation)
    console.log('Log level:', serviceConfig.logLevel)
    console.log('Strict mode enabled:', configService.getValidationConfig().enableStrictMode)

    return serviceConfig
}

// Example 5: Custom Validation Patterns
export const customValidationExample = function () {
    const serviceManager = new ServiceManager()

    const customConfig: PartialLibraryConfig = {
        validation: {
            patterns: {
                custom: {
                    'credit-card-visa': {
                        global: /^4[0-9]{12}(?:[0-9]{3})?$/,
                        fallback: /^[0-9]{13,19}$/
                    },
                    'license-plate': {
                        US: /^[A-Z]{1,3}\s?[0-9]{1,4}$/,
                        EU: /^[A-Z]{1,3}-[0-9]{1,4}$/,
                        fallback: /^[A-Z0-9\s-]{3,10}$/
                    }
                }
            }
        }
    }

    setupConfigurationServices(serviceManager, customConfig)

    const validationConfig = serviceManager.resolve(
        SValidationConfigService
    ) as IValidationConfigService

    // Test custom validations
    const isValidVisa = validationConfig.validatePattern(
        'credit-card-visa',
        'global',
        '4111111111111111'
    )
    const isValidUsPlate = validationConfig.validatePattern('license-plate', 'US', 'ABC 123')
    const isValidEuPlate = validationConfig.validatePattern('license-plate', 'EU', 'ABC-123')

    console.log('Valid Visa card:', isValidVisa)
    console.log('Valid US license plate:', isValidUsPlate)
    console.log('Valid EU license plate:', isValidEuPlate)

    return {
        isValidVisa,
        isValidUsPlate,
        isValidEuPlate
    }
}

// Usage demonstration
export const demonstrateConfigurationSystem = function () {
    console.log('=== FORMULAR Configuration System Examples ===\n')

    console.log('1. Basic Configuration:')
    useConfigurationExample()

    console.log('\n2. Runtime Updates:')
    runtimeConfigurationExample()

    console.log('\n3. Environment Configuration:')
    environmentConfigurationExample()

    console.log('\n4. Custom Validations:')
    customValidationExample()

    console.log('\n=== Configuration System Demo Complete ===')
}
