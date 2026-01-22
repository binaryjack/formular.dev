import { ConfigurationManager } from '@core/managers/configuration-manager'
import {
    IConfiguration,
    IConfigurationManager
} from '@core/managers/configuration-manager/interfaces'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

// Mock the ServiceManager
const mockServiceManager = {} as IServiceManager

// Mock IConfiguration for testing
const createMockConfiguration = (name: string, targetEnvironment: string): IConfiguration =>
    ({
        name,
        targetEnvironment,
        cultures: {
            defaultCulture: {
                name: 'en-US',
                dateFormat: 'MM/dd/yyyy',
                timeFormat: 'HH:mm:ss',
                currencySymbol: '$',
                separator: ','
            },
            supportedCultures: [],
            lokalizeTokensReplacement: []
        },
        rendering: {
            components: [],
            commands: [],
            suffixes: []
        },
        behavior: {
            form: { submitOnEnter: true } as any,
            validations: {
                triggers: [],
                patterns: []
            },
            customValidations: [],
            events: []
        }
    } as IConfiguration)

describe('ConfigurationManager', () => {
    let configManager: IConfigurationManager

    beforeEach(() => {
        configManager = new (ConfigurationManager as any)(mockServiceManager)
    })

    describe('setConfiguration and useConfiguration', () => {
        it('should set and activate a configuration', () => {
            // Arrange
            const config = createMockConfiguration('test-config', 'development')

            // Act
            configManager.setConfiguration('test-config', config)
            const activeConfig = configManager.useConfiguration('test-config')

            // Assert
            expect(activeConfig).toBeDefined()
            expect(activeConfig?.name).toBe('test-config')
            expect(activeConfig?.targetEnvironment).toBe('development')
            expect(configManager.activeConfiguration).toBe(activeConfig)
            expect(configManager.configurations).toHaveLength(1)
        })

        it('should return undefined when trying to use non-existent configuration', () => {
            // Act
            const result = configManager.useConfiguration('non-existent')

            // Assert
            expect(result).toBeUndefined()
        })

        it('should replace existing configuration with same name', () => {
            // Arrange
            const config1 = createMockConfiguration('test-config', 'development')
            const config2 = createMockConfiguration('test-config', 'production')

            // Act
            configManager.setConfiguration('test-config', config1)
            configManager.setConfiguration('test-config', config2)

            // Assert
            expect(configManager.configurations).toHaveLength(1)
            expect(configManager.configurations[0].targetEnvironment).toBe('production')
        })
    })

    describe('getConfigByName', () => {
        beforeEach(() => {
            const config = createMockConfiguration('test-config', 'development')
            // Add some test data to the configuration
            config.behavior.validations.patterns = [
                { name: 'pattern1', rule: 'test' },
                { name: 'pattern2', rule: 'test2' }
            ] as any

            configManager.setConfiguration('test-config', config)
            configManager.useConfiguration('test-config')
        })

        it('should find configuration item in array by name', () => {
            // Act
            const result = configManager.getConfigByName(
                'behavior',
                'validations',
                'patterns',
                'pattern1'
            )

            // Assert
            expect(result).toBeDefined()
            expect((result as any).name).toBe('pattern1')
            expect((result as any).rule).toBe('test')
        })

        it('should return undefined when item not found in array', () => {
            // Act
            const result = configManager.getConfigByName(
                'behavior',
                'validations',
                'patterns',
                'non-existent'
            )

            // Assert
            expect(result).toBeUndefined()
        })

        it('should return undefined when path does not exist', () => {
            // Act
            const result = configManager.getConfigByName('nonexistent', 'path')

            // Assert
            expect(result).toBeUndefined()
        })
    })

    describe('printConfiguration', () => {
        it('should not throw when printing empty configurations', () => {
            // Act & Assert
            expect(() => configManager.printConfiguration()).not.toThrow()
        })

        it('should not throw when printing configurations with data', () => {
            // Arrange
            const config = createMockConfiguration('test-config', 'development')
            configManager.setConfiguration('test-config', config)
            configManager.useConfiguration('test-config') // Act & Assert
            expect(() => configManager.printConfiguration()).not.toThrow()
        })
    })

    describe('loadJson', () => {
        afterEach(() => {
            // Cleanup global fetch mock
            delete (global as any).fetch
        })

        it('should reject with error when file not found in Node.js', async () => {
            // Act & Assert
            await expect(configManager.loadJson('/nonexistent/path.json')).rejects.toThrow()
        })

        it('should successfully load valid configuration in browser environment', async () => {
            // Mock browser environment by temporarily removing process from globalThis
            const originalProcess = globalThis.process
            delete (globalThis as any).process

            const mockConfig = {
                name: 'browser-config',
                targetEnvironment: 'production',
                cultures: {
                    defaultCulture: {
                        name: 'en-US',
                        dateFormat: 'MM/dd/yyyy',
                        timeFormat: 'HH:mm:ss',
                        currencySymbol: '$',
                        separator: ','
                    },
                    supportedCultures: [],
                    lokalizeTokensReplacement: []
                },
                rendering: { components: [], commands: [], suffixes: [] },
                behavior: {
                    form: { submitOnEnter: true },
                    validations: { triggers: [], patterns: [] },
                    customValidations: [],
                    events: []
                }
            }

            // Mock fetch for browser environment test
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                text: () => Promise.resolve(JSON.stringify(mockConfig))
            })

            try {
                // Act
                await configManager.loadJson('/valid-config.json')

                // Assert
                expect(configManager.configurations).toHaveLength(1)
                expect(configManager.configurations[0].name).toBe('browser-config')
                expect(configManager.configurations[0].targetEnvironment).toBe('production')
            } finally {
                // Restore process
                globalThis.process = originalProcess
            }
        })
    })
})
