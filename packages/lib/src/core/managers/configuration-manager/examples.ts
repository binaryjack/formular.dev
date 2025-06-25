import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { ConfigurationManager, IConfiguration, IConfigurationManager } from './index'

/**
 * Configuration Manager Usage Examples
 *
 * This file demonstrates various ways to use the ConfigurationManager
 * in different scenarios including basic setup, custom configurations,
 * and advanced usage patterns.
 */

// Mock service manager for examples
const mockServiceManager: IServiceManager = {} as IServiceManager

/**
 * Example 1: Basic Setup and Default Configuration
 */
export function basicUsageExample() {
    console.log('=== Basic Usage Example ===')

    // Create configuration manager instance
    const configManager: IConfigurationManager = new ConfigurationManager(mockServiceManager)

    // Get default configuration
    const defaultConfig = configManager.getDefaultConfiguration()
    console.log('Default configuration name:', defaultConfig.name)

    // Set and use the default configuration
    configManager.setConfiguration('default', defaultConfig)
    configManager.useConfiguration('default')

    // Print all configurations
    configManager.printConfiguration()

    return configManager
}

/**
 * Example 2: Creating and Using Custom Configuration
 */
export function customConfigurationExample() {
    console.log('=== Custom Configuration Example ===')

    const configManager: IConfigurationManager = new ConfigurationManager(mockServiceManager)

    // Create a custom configuration for production environment
    const productionConfig: Partial<IConfiguration> = {
        name: 'production-config',
        targetEnvironment: 'production',
        cultures: {
            defaultCulture: {
                name: 'en-US',
                dateFormat: 'MM/dd/yyyy' as any,
                timeFormat: 'hh:mm:ss tt',
                currencySymbol: '$',
                separator: '/'
            },
            supportedCultures: [],
            lokalizeTokensReplacement: []
        },
        behavior: {
            form: {
                name: 'production-form-behavior',
                enforceConfigurationCheck: true,
                validationTriggers: ['onBlur', 'onSubmit', 'onChange']
            },
            validations: {
                triggers: [],
                patterns: []
            },
            customValidations: [],
            events: []
        }
    }

    // Validate and merge with defaults
    const validatedConfig = configManager.validateConfiguration(productionConfig)

    // Set the configuration
    configManager.setConfiguration('production', validatedConfig)

    // Use the production configuration
    const activeConfig = configManager.useConfiguration('production')
    console.log('Active configuration:', activeConfig?.name)

    return configManager
}

/**
 * Example 3: Loading Configuration from JSON
 */
export async function loadJsonConfigurationExample() {
    console.log('=== Load JSON Configuration Example ===')

    const configManager: IConfigurationManager = new ConfigurationManager(mockServiceManager)

    try {
        // Load configuration from JSON file
        // This would typically be a path to your configuration file
        const configPath = './default/default-configuration.json'
        await configManager.loadJson(configPath)

        // Use the loaded configuration
        configManager.useConfiguration('default-formular-configuration')

        console.log('Configuration loaded successfully from JSON')
        configManager.printConfiguration()
    } catch (error) {
        console.error('Failed to load configuration:', error)
    }

    return configManager
}

/**
 * Example 4: Retrieving Specific Configuration Values
 */
export function getConfigurationValuesExample() {
    console.log('=== Get Configuration Values Example ===')

    const configManager: IConfigurationManager = new ConfigurationManager(mockServiceManager)

    // Set up a configuration
    const defaultConfig = configManager.getDefaultConfiguration()
    configManager.setConfiguration('default', defaultConfig)
    configManager.useConfiguration('default')

    // Get specific configuration values using dotted notation
    // Example: Getting a validation pattern
    const emailPattern = configManager.getConfigByName<any>(
        'behavior',
        'validations',
        'patterns',
        'email-pattern'
    )
    console.log('Email pattern:', emailPattern)

    // Example: Getting a rendering component
    const drawerComponent = configManager.getConfigByName<any>('rendering', 'components', 'drawer')
    console.log('Drawer component config:', drawerComponent)

    // Example: Getting a command configuration
    const primaryCommand = configManager.getConfigByName<any>('rendering', 'commands', 'primary')
    console.log('Primary command config:', primaryCommand)

    // Example: Getting form behavior
    const formBehavior = configManager.getConfigByName<any>('behavior', 'form')
    console.log('Form behavior:', formBehavior)

    return configManager
}

/**
 * Example 5: Multi-Environment Configuration Setup
 */
export function multiEnvironmentExample() {
    console.log('=== Multi-Environment Configuration Example ===')

    const configManager: IConfigurationManager = new ConfigurationManager(mockServiceManager)

    // Development configuration
    const devConfig: Partial<IConfiguration> = {
        name: 'development-config',
        targetEnvironment: 'development',
        behavior: {
            form: {
                name: 'dev-form-behavior',
                enforceConfigurationCheck: true,
                validationTriggers: ['onChange', 'onBlur'] // More relaxed validation
            },
            validations: { triggers: [], patterns: [] },
            customValidations: [],
            events: []
        }
    }

    // Staging configuration
    const stagingConfig: Partial<IConfiguration> = {
        name: 'staging-config',
        targetEnvironment: 'staging',
        behavior: {
            form: {
                name: 'staging-form-behavior',
                enforceConfigurationCheck: true,
                validationTriggers: ['onBlur', 'onSubmit']
            },
            validations: { triggers: [], patterns: [] },
            customValidations: [],
            events: []
        }
    }

    // Production configuration
    const prodConfig: Partial<IConfiguration> = {
        name: 'production-config',
        targetEnvironment: 'production',
        behavior: {
            form: {
                name: 'prod-form-behavior',
                enforceConfigurationCheck: true,
                validationTriggers: ['onSubmit'] // Strict validation only on submit
            },
            validations: { triggers: [], patterns: [] },
            customValidations: [],
            events: []
        }
    }

    // Validate and set all configurations
    const validatedDev = configManager.validateConfiguration(devConfig)
    const validatedStaging = configManager.validateConfiguration(stagingConfig)
    const validatedProd = configManager.validateConfiguration(prodConfig)

    configManager.setConfiguration('development', validatedDev)
    configManager.setConfiguration('staging', validatedStaging)
    configManager.setConfiguration('production', validatedProd)

    // Switch between environments
    console.log('Setting up development environment...')
    configManager.useConfiguration('development')
    console.log('Active config:', configManager.activeConfiguration.name)

    console.log('Switching to production environment...')
    configManager.useConfiguration('production')
    console.log('Active config:', configManager.activeConfiguration.name)

    // Print all configurations
    configManager.printConfiguration()

    return configManager
}

/**
 * Example 6: Working with Cultures and Localization
 */
export function localizationExample() {
    console.log('=== Localization Configuration Example ===')

    const configManager: IConfigurationManager = new ConfigurationManager(mockServiceManager)

    // Create configuration with multiple cultures
    const multiCultureConfig: Partial<IConfiguration> = {
        name: 'multi-culture-config',
        targetEnvironment: 'production',
        cultures: {
            defaultCulture: {
                name: 'en-US',
                dateFormat: 'MM/dd/yyyy' as any,
                timeFormat: 'hh:mm:ss tt',
                currencySymbol: '$',
                separator: '/'
            },
            supportedCultures: [
                {
                    name: 'fr-FR',
                    dateFormat: 'dd/MM/yyyy' as any,
                    timeFormat: 'HH:mm:ss',
                    currencySymbol: '€',
                    separator: '/'
                },
                {
                    name: 'de-DE',
                    dateFormat: 'dd/MM/yyyy' as any,
                    timeFormat: 'HH:mm:ss',
                    currencySymbol: '€',
                    separator: '.'
                }
            ],
            lokalizeTokensReplacement: [
                {
                    name: 'errorMessage',
                    token: '{{error}}'
                },
                {
                    name: 'fieldName',
                    token: '{{field}}'
                }
            ]
        }
    }

    const validatedConfig = configManager.validateConfiguration(multiCultureConfig)
    configManager.setConfiguration('multi-culture', validatedConfig)
    configManager.useConfiguration('multi-culture')

    // Access culture-specific configurations
    const defaultCulture = configManager.getConfigByName<any>('cultures', 'defaultCulture')
    console.log('Default culture:', defaultCulture)

    const tokenReplacements = configManager.getConfigByName<any>(
        'cultures',
        'lokalizeTokensReplacement'
    )
    console.log('Token replacements:', tokenReplacements)

    return configManager
}

/**
 * Example 7: Advanced Validation Patterns Configuration
 */
export function validationPatternsExample() {
    console.log('=== Validation Patterns Configuration Example ===')

    const configManager: IConfigurationManager = new ConfigurationManager(mockServiceManager)

    // Configuration with custom validation patterns
    const validationConfig: Partial<IConfiguration> = {
        name: 'validation-config',
        targetEnvironment: 'development',
        behavior: {
            form: {
                name: 'validation-form-behavior',
                enforceConfigurationCheck: true,
                validationTriggers: ['onChange', 'onBlur', 'onSubmit']
            },
            validations: {
                triggers: [
                    {
                        name: 'onValidate',
                        triggerDelay: 300
                    }
                ],
                patterns: [
                    {
                        name: 'strong-password',
                        cultureName: 'en-US',
                        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                    },
                    {
                        name: 'credit-card',
                        cultureName: 'en-US',
                        regex: /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/
                    }
                ]
            },
            customValidations: [],
            events: []
        }
    }

    const validatedConfig = configManager.validateConfiguration(validationConfig)
    configManager.setConfiguration('validation', validatedConfig)
    configManager.useConfiguration('validation')

    // Access validation patterns
    const passwordPattern = configManager.getConfigByName<any>(
        'behavior',
        'validations',
        'patterns',
        'strong-password'
    )
    console.log('Strong password pattern:', passwordPattern)

    const creditCardPattern = configManager.getConfigByName<any>(
        'behavior',
        'validations',
        'patterns',
        'credit-card'
    )
    console.log('Credit card pattern:', creditCardPattern)

    return configManager
}

/**
 * Example 8: Runtime Configuration Updates
 */
export function runtimeConfigurationExample() {
    console.log('=== Runtime Configuration Updates Example ===')

    const configManager: IConfigurationManager = new ConfigurationManager(mockServiceManager)

    // Start with default configuration
    const defaultConfig = configManager.getDefaultConfiguration()
    configManager.setConfiguration('runtime', defaultConfig)
    configManager.useConfiguration('runtime')

    console.log('Initial configuration:', configManager.activeConfiguration.name)

    // Create updated configuration
    const updatedConfig: IConfiguration = {
        ...configManager.activeConfiguration,
        targetEnvironment: 'production',
        behavior: {
            ...configManager.activeConfiguration.behavior,
            form: {
                ...configManager.activeConfiguration.behavior.form,
                validationTriggers: ['onSubmit'] // Changed from default
            }
        }
    }

    // Update the configuration
    configManager.setConfiguration('runtime', updatedConfig)

    // Reactivate the configuration to reflect changes
    configManager.useConfiguration('runtime')

    console.log(
        'Updated configuration environment:',
        configManager.activeConfiguration.targetEnvironment
    )
    console.log(
        'Updated validation triggers:',
        configManager.activeConfiguration.behavior.form.validationTriggers
    )

    return configManager
}

/**
 * Example 9: Error Handling and Validation
 */
export function errorHandlingExample() {
    console.log('=== Error Handling Example ===')

    const configManager: IConfigurationManager = new ConfigurationManager(mockServiceManager)

    // Test with invalid configuration
    const invalidConfig = {
        name: 123, // Invalid type
        targetEnvironment: null, // Invalid value
        cultures: 'not-an-object' // Invalid type
    }

    try {
        // This should handle validation gracefully
        const validatedConfig = configManager.validateConfiguration(invalidConfig as any)
        console.log('Validation completed, using defaults where necessary')
        console.log('Final config name:', validatedConfig.name)
    } catch (error) {
        console.error('Validation error:', error)
    }

    // Test with null/undefined configuration
    const nullConfig = configManager.validateConfiguration(null as any)
    console.log('Null config handled, using default:', nullConfig.name)

    return configManager
}

/**
 * Run all examples
 */
export function runAllExamples() {
    console.log('🚀 Running Configuration Manager Examples\n')

    try {
        basicUsageExample()
        console.log('\n' + '='.repeat(50) + '\n')

        customConfigurationExample()
        console.log('\n' + '='.repeat(50) + '\n')

        getConfigurationValuesExample()
        console.log('\n' + '='.repeat(50) + '\n')

        multiEnvironmentExample()
        console.log('\n' + '='.repeat(50) + '\n')

        localizationExample()
        console.log('\n' + '='.repeat(50) + '\n')

        validationPatternsExample()
        console.log('\n' + '='.repeat(50) + '\n')

        runtimeConfigurationExample()
        console.log('\n' + '='.repeat(50) + '\n')

        errorHandlingExample()
        console.log('\n' + '='.repeat(50) + '\n')

        console.log('✅ All examples completed successfully!')
    } catch (error) {
        console.error('❌ Error running examples:', error)
    }
}

// Export individual examples for selective usage
export const examples = {
    basic: basicUsageExample,
    custom: customConfigurationExample,
    loadJson: loadJsonConfigurationExample,
    getValues: getConfigurationValuesExample,
    multiEnvironment: multiEnvironmentExample,
    localization: localizationExample,
    validationPatterns: validationPatternsExample,
    runtime: runtimeConfigurationExample,
    errorHandling: errorHandlingExample,
    runAll: runAllExamples
}
