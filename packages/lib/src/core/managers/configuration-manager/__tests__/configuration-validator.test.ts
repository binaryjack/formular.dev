import { ConfigurationValidator, IConfiguration } from '../index'

/**
 * Basic tests for configuration validation
 */
describe('Configuration Validator', () => {
    let validator: any

    beforeEach(() => {
        validator = new (ConfigurationValidator as any)()
    })

    test('should provide a valid default configuration', () => {
        const defaultConfig = validator.getDefaultConfiguration()

        expect(defaultConfig).toBeDefined()
        expect(defaultConfig.name).toBe('default-formular-configuration')
        expect(defaultConfig.targetEnvironment).toBe('development')
        expect(defaultConfig.cultures.defaultCulture.name).toBe('en-US')
    })

    test('should validate a complete configuration', () => {
        const config: IConfiguration = validator.getDefaultConfiguration()
        const result = validator.validate(config)

        expect(result.isValid).toBe(true)
        expect(result.errors).toHaveLength(0)
    })

    test('should detect missing required fields', () => {
        const incompleteConfig = {
            name: 'test-config'
            // Missing other required fields
        }

        const result = validator.validate(incompleteConfig)

        expect(result.isValid).toBe(false)
        expect(result.errors.length).toBeGreaterThan(0)
        expect(result.errors.some((error: string) => error.includes('Target environment'))).toBe(
            true
        )
    })

    test('should merge partial config with defaults', () => {
        const partialConfig: Partial<IConfiguration> = {
            name: 'custom-config',
            targetEnvironment: 'production'
        }

        const result = validator.validateWithDefaults(partialConfig)

        expect(result.isValid).toBe(true)
        expect(result.config.name).toBe('custom-config')
        expect(result.config.targetEnvironment).toBe('production')
        expect(result.config.cultures.defaultCulture.name).toBe('en-US') // From defaults
    })

    test('should validate culture configuration', () => {
        const configWithCustomCulture = validator.getDefaultConfiguration()
        configWithCustomCulture.cultures.defaultCulture = {
            name: 'es-ES',
            dateFormat: 'dd/MM/yyyy',
            timeFormat: 'HH:mm:ss',
            currencySymbol: '€',
            separator: ','
        }

        const result = validator.validate(configWithCustomCulture)

        expect(result.isValid).toBe(true)
    })

    test('should validate rendering configuration', () => {
        const config = validator.getDefaultConfiguration()
        config.rendering.components.push({
            name: 'custom-input',
            height: '50px',
            width: '300px'
        })

        const result = validator.validate(config)

        expect(result.isValid).toBe(true)
    })

    test('should validate behavior configuration', () => {
        const config = validator.getDefaultConfiguration()
        config.behavior.form.validationTriggers = ['onChange', 'onSubmit']

        const result = validator.validate(config)

        expect(result.isValid).toBe(true)
    })
})
