import { ConfigurationValidator, IConfiguration } from './index'

/**
 * Example usage of configuration schemas and validator
 */

// Create a new validator instance
const validator = new (ConfigurationValidator as any)()

// Get the default configuration
const defaultConfig: IConfiguration = validator.getDefaultConfiguration()
console.log('Default configuration:', defaultConfig)

// Validate a custom configuration
const customConfig: Partial<IConfiguration> = {
    name: 'my-custom-config',
    targetEnvironment: 'production',
    cultures: {
        defaultCulture: {
            name: 'fr-FR',
            dateFormat: 'dd/MM/yyyy',
            timeFormat: 'HH:mm:ss',
            currencySymbol: '€',
            separator: ','
        },
        supportedCultures: [],
        lokalizeTokensReplacement: []
    }
}

// Validate with defaults merged
const result = validator.validateWithDefaults(customConfig)

if (result.isValid) {
    console.log('Configuration is valid:', result.config)
} else {
    console.error('Configuration validation failed:', result.errors)
}

// Example of validation errors
const invalidConfig = {
    name: null // Invalid: should be string
    // Missing required fields
}

const validationResult = validator.validate(invalidConfig)
if (!validationResult.isValid) {
    console.error('Validation errors:', validationResult.errors)
}

export { validator as exampleValidator }
