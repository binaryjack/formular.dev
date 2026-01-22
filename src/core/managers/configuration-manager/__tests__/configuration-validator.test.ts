import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { ConfigurationManager, IConfiguration } from '../index'

/**
 * Basic tests for configuration validation using ConfigurationManager
 */
describe('Configuration Validator', () => {
    let configManager: any
    let mockServiceManager: IServiceManager

    beforeEach(() => {
        mockServiceManager = {} as IServiceManager
        configManager = new ConfigurationManager(mockServiceManager)
    })

    test('should provide a valid default configuration', () => {
        const defaultConfig = configManager.getDefaultConfiguration()

        expect(defaultConfig).toBeDefined()
        expect(defaultConfig.name).toBe('default-formular-configuration')
        expect(defaultConfig.targetEnvironment).toBe('development')
        expect(defaultConfig.cultures.defaultCulture.name).toBe('fr-CH')
    })

    test('should validate a complete configuration', () => {
        const config: IConfiguration = configManager.getDefaultConfiguration()
        const result = configManager.validateConfiguration(config)

        expect(result).toBeDefined()
        expect(result.name).toBe('default-formular-configuration')
        expect(result.targetEnvironment).toBe('development')
    })

    test('should handle missing required fields by providing defaults', () => {
        const incompleteConfig = {
            name: 'test-config'
            // Missing other required fields
        }

        const result = configManager.validateConfiguration(incompleteConfig)

        expect(result).toBeDefined()
        expect(result.name).toBe('test-config')
        expect(result.targetEnvironment).toBeDefined() // Should have default
        expect(result.cultures).toBeDefined() // Should have defaults
        expect(result.rendering).toBeDefined() // Should have defaults
        expect(result.behavior).toBeDefined() // Should have defaults
    })

    test('should merge partial config with defaults', () => {
        const partialConfig: Partial<IConfiguration> = {
            name: 'custom-config',
            targetEnvironment: 'production'
        }

        const result = configManager.validateConfiguration(partialConfig)

        expect(result).toBeDefined()
        expect(result.name).toBe('custom-config')
        expect(result.targetEnvironment).toBe('production')
        expect(result.cultures).toBeDefined() // Should have defaults
    })

    test('should validate culture configuration', () => {
        const configWithCustomCulture = configManager.getDefaultConfiguration()
        configWithCustomCulture.cultures.defaultCulture = {
            name: 'es-ES',
            dateFormat: 'dd/MM/yyyy' as any,
            timeFormat: 'HH:mm:ss',
            currencySymbol: '€',
            separator: ','
        }

        const result = configManager.validateConfiguration(configWithCustomCulture)

        expect(result).toBeDefined()
        expect(result.cultures.defaultCulture.name).toBe('es-ES')
        expect(result.cultures.defaultCulture.currencySymbol).toBe('€')
    })

    test('should validate rendering configuration', () => {
        const config = configManager.getDefaultConfiguration()
        // Test that rendering configuration is properly handled

        const result = configManager.validateConfiguration(config)

        expect(result).toBeDefined()
        expect(result.rendering).toBeDefined()
    })

    test('should validate behavior configuration', () => {
        const config = configManager.getDefaultConfiguration()

        const result = configManager.validateConfiguration(config)

        expect(result).toBeDefined()
        expect(result.behavior).toBeDefined()
        expect(result.behavior.form).toBeDefined()
    })
})
