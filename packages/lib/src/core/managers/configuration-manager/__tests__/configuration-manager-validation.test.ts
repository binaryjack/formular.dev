import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { ConfigurationManager } from '../configuration-manager'
import { examples } from '../examples'

describe('ConfigurationManager Validation Methods', () => {
    let configManager: any
    let mockServiceManager: IServiceManager

    beforeEach(() => {
        mockServiceManager = {} as IServiceManager
        configManager = new ConfigurationManager(mockServiceManager)
    })

    describe('getDefaultConfiguration', () => {
        it('should return the default configuration', () => {
            const defaultConfig = configManager.getDefaultConfiguration()

            expect(defaultConfig).toBeDefined()
            expect(defaultConfig.name).toBe('default-formular-configuration')
            expect(defaultConfig.targetEnvironment).toBe('development')
            expect(defaultConfig.cultures).toBeDefined()
            expect(defaultConfig.rendering).toBeDefined()
            expect(defaultConfig.behavior).toBeDefined()
        })
    })

    describe('validateConfiguration', () => {
        it('should return default configuration when config is null or undefined', () => {
            const result = configManager.validateConfiguration(null)

            expect(result).toBeDefined()
            expect(result.name).toBe('default-formular-configuration')
        })

        it('should merge partial configuration with defaults', () => {
            const partialConfig = {
                name: 'test-config',
                targetEnvironment: 'production'
            }

            const result = configManager.validateConfiguration(partialConfig)

            expect(result.name).toBe('test-config')
            expect(result.targetEnvironment).toBe('production')
            expect(result.cultures).toBeDefined() // Should have default cultures
            expect(result.rendering).toBeDefined() // Should have default rendering
            expect(result.behavior).toBeDefined() // Should have default behavior
        })
    })

    describe('mergeConfigurationWithDefaults', () => {
        it('should properly merge nested objects', () => {
            const partialConfig = {
                cultures: {
                    defaultCulture: {
                        name: 'en-GB',
                        dateFormat: 'dd-MM-yyyy' as any,
                        timeFormat: 'HH:mm',
                        currencySymbol: '£',
                        separator: '-'
                    }
                }
            }

            const result = configManager.mergeConfigurationWithDefaults(partialConfig)

            expect(result.cultures.defaultCulture.name).toBe('en-GB')
            expect(result.cultures.defaultCulture.currencySymbol).toBe('£')
            expect(result.cultures.supportedCultures).toBeDefined() // Should keep defaults
            expect(result.cultures.lokalizeTokensReplacement).toBeDefined() // Should keep defaults
        })
    })

    describe('Examples Integration', () => {
        it('should run examples without errors', () => {
            // Mock console to avoid test output pollution
            const originalConsoleLog = console.log
            const originalConsoleError = console.error
            console.log = jest.fn()
            console.error = jest.fn()

            try {
                expect(() => {
                    examples.basic()
                    examples.custom()
                    examples.getValues()
                    examples.errorHandling()
                }).not.toThrow()
            } finally {
                console.log = originalConsoleLog
                console.error = originalConsoleError
            }
        })

        it('should demonstrate configuration manager usage patterns', () => {
            const originalConsoleLog = console.log
            console.log = jest.fn()

            try {
                const configManager = examples.basic()
                expect(configManager).toBeDefined()
                expect(configManager.activeConfiguration).toBeDefined()
                expect(configManager.activeConfiguration.name).toBe('default') // Uses the key name

                const customConfigManager = examples.custom()
                expect(customConfigManager.activeConfiguration.name).toBe('production') // Uses the key name
                expect(customConfigManager.activeConfiguration.targetEnvironment).toBe('production')
            } finally {
                console.log = originalConsoleLog
            }
        })
    })
})
