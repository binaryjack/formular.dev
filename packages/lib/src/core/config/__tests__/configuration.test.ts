/**
 * FORMULAR - Configuration Service Tests
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Test examples for configuration services
 */

import { ServiceManager } from '@core/managers/service-manager/service-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { ServiceManagerMockBuilder } from '../../../__tests__/core/managers/service-manager-mock-builder'
import {
    IConfigurationService,
    IInputConfigService,
    IValidationConfigService,
    PartialLibraryConfig,
    SConfigurationService,
    setupConfigurationServices,
    SInputConfigService,
    SValidationConfigService
} from '../index'

describe('Configuration Services', () => {
    let serviceManager: IServiceManager
    let mockBuilder: ServiceManagerMockBuilder

    beforeEach(() => {
        serviceManager = new ServiceManager()
        mockBuilder = new ServiceManagerMockBuilder()
    })

    describe('ConfigurationService', () => {
        it('should provide default configuration when no user config is provided', () => {
            // Arrange
            setupConfigurationServices(serviceManager)

            // Act
            const configService =
                serviceManager.resolve<IConfigurationService>(SConfigurationService)
            const config = configService.getFullConfig()

            // Assert
            expect(config.validation.fallbackBehavior).toBe('lenient')
            expect(config.inputs.debounceMs).toBe(300)
            expect(config.services.logLevel).toBeDefined()
            expect(config.notifications.defaultDuration).toBe(5000)
        })

        it('should merge user configuration with defaults', () => {
            // Arrange
            const userConfig: PartialLibraryConfig = {
                inputs: {
                    debounceMs: 500
                },
                validation: {
                    fallbackBehavior: 'strict'
                }
            }
            setupConfigurationServices(serviceManager, userConfig)

            // Act
            const configService =
                serviceManager.resolve<IConfigurationService>(SConfigurationService)
            const config = configService.getFullConfig()

            // Assert
            expect(config.inputs.debounceMs).toBe(500) // User override
            expect(config.validation.fallbackBehavior).toBe('strict') // User override
            expect(config.notifications.defaultDuration).toBe(5000) // Default kept
        })

        it('should allow runtime configuration updates', () => {
            // Arrange
            setupConfigurationServices(serviceManager)
            const configService =
                serviceManager.resolve<IConfigurationService>(SConfigurationService)

            // Act
            configService.updateConfig({
                inputs: {
                    debounceMs: 750
                }
            })
            const updatedConfig = configService.getInputConfig()

            // Assert
            expect(updatedConfig.debounceMs).toBe(750)
        })

        it('should reset to defaults when requested', () => {
            // Arrange
            setupConfigurationServices(serviceManager, {
                inputs: { debounceMs: 999 }
            })
            const configService =
                serviceManager.resolve<IConfigurationService>(SConfigurationService)

            // Act
            configService.resetToDefaults()
            const config = configService.getInputConfig()

            // Assert
            expect(config.debounceMs).toBe(300) // Back to default
        })
    })

    describe('ValidationConfigService', () => {
        beforeEach(() => {
            const customConfig: PartialLibraryConfig = {
                validation: {
                    patterns: {
                        phone: {
                            TEST: /^TEST\d{6}$/,
                            fallback: /^\d{10}$/
                        },
                        postal: {
                            fallback: /^\d{5}$/
                        },
                        ssn: {
                            fallback: /^\d{9}$/
                        },
                        'custom-pattern': {
                            EN: /^EN[A-Z]{3}$/,
                            fallback: /^[A-Z]{5}$/
                        }
                    }
                }
            }
            setupConfigurationServices(serviceManager, customConfig)
        })

        it('should validate patterns correctly', () => {
            // Arrange
            const validationConfig =
                serviceManager.resolve<IValidationConfigService>(SValidationConfigService)

            // Act & Assert
            expect(validationConfig.validatePattern('phone', 'TEST', 'TEST123456')).toBe(true)
            expect(validationConfig.validatePattern('phone', 'TEST', 'INVALID')).toBe(false)
        })

        it('should fall back to fallback pattern when locale not found', () => {
            // Arrange
            const validationConfig =
                serviceManager.resolve<IValidationConfigService>(SValidationConfigService)

            // Act & Assert
            expect(validationConfig.validatePattern('phone', 'UNKNOWN', '1234567890')).toBe(true)
        })

        it('should return supported locales for a pattern type', () => {
            // Arrange
            const validationConfig =
                serviceManager.resolve<IValidationConfigService>(SValidationConfigService)

            // Act
            const locales = validationConfig.getSupportedLocales('phone')

            // Assert
            expect(locales).toContain('TEST')
            expect(locales).not.toContain('fallback')
        })

        it('should get pattern for specific locale', () => {
            // Arrange
            const validationConfig =
                serviceManager.resolve<IValidationConfigService>(SValidationConfigService)

            // Act
            const pattern = validationConfig.getPatternForLocale('phone', 'TEST')

            // Assert
            expect(pattern).toBeDefined()
            expect(pattern?.test('TEST123456')).toBe(true)
        })

        it('should handle custom pattern types', () => {
            // Arrange
            const validationConfig =
                serviceManager.resolve<IValidationConfigService>(SValidationConfigService)

            // Act & Assert
            expect(validationConfig.validatePattern('custom-pattern', 'EN', 'ENXYZ')).toBe(true)
            expect(validationConfig.validatePattern('custom-pattern', 'UNKNOWN', 'ABCDE')).toBe(
                true
            )
        })

        it('should throw error for unknown pattern type in strict mode', () => {
            // Arrange
            setupConfigurationServices(serviceManager, {
                validation: {
                    fallbackBehavior: 'strict'
                }
            })
            const validationConfig =
                serviceManager.resolve<IValidationConfigService>(SValidationConfigService)

            // Act & Assert
            expect(() => {
                validationConfig.validatePattern('unknown-type', 'EN', 'test')
            }).toThrow('Unknown validation pattern type: unknown-type')
        })
    })

    describe('InputConfigService', () => {
        beforeEach(() => {
            setupConfigurationServices(serviceManager, {
                inputs: {
                    debounceMs: 400,
                    defaultValidationTrigger: 'onChange',
                    autoFocus: true,
                    enableAccessibility: false
                }
            })
        })

        it('should return correct input configuration values', () => {
            // Arrange
            const inputConfig = serviceManager.resolve<IInputConfigService>(SInputConfigService)

            // Act & Assert
            expect(inputConfig.getDebounceMs()).toBe(400)
            expect(inputConfig.getDefaultTrigger()).toBe('onChange')
            expect(inputConfig.isAutoFocusEnabled()).toBe(true)
            expect(inputConfig.isAccessibilityEnabled()).toBe(false)
        })
    })

    describe('Service Integration', () => {
        it('should work with mocked dependencies in tests', () => {
            // Arrange
            const mockConfig = mockBuilder
                .withMock(SConfigurationService, {
                    getValidationConfig: () => ({
                        patterns: {
                            phone: { MOCK: /^MOCK\d{3}$/, fallback: /^\d+$/ },
                            postal: { fallback: /^\d+$/ },
                            ssn: { fallback: /^\d+$/ }
                        },
                        fallbackBehavior: 'lenient',
                        enableStrictMode: false
                    }),
                    getInputConfig: () => ({
                        defaultValidationTrigger: 'onBlur',
                        defaultErrorDisplay: 'inline',
                        debounceMs: 200,
                        autoFocus: false,
                        enableAccessibility: true
                    }),
                    getServiceConfig: () => ({
                        enableDevelopmentValidation: true,
                        enableCircularDependencyDetection: true,
                        logLevel: 'debug',
                        enablePerformanceMetrics: true
                    }),
                    getNotificationConfig: () => ({
                        defaultDuration: 3000,
                        maxConcurrent: 2,
                        position: 'top',
                        enableSound: false,
                        enableAnimation: true
                    }),
                    getFullConfig: () => ({} as any),
                    updateConfig: () => {},
                    resetToDefaults: () => {}
                })
                .build()

            setupConfigurationServices(mockConfig)

            // Act
            const validationConfig =
                mockConfig.resolve<IValidationConfigService>(SValidationConfigService)
            const inputConfig = mockConfig.resolve<IInputConfigService>(SInputConfigService)

            // Assert
            expect(validationConfig.validatePattern('phone', 'MOCK', 'MOCK123')).toBe(true)
            expect(inputConfig.getDebounceMs()).toBe(200)
        })
    })

    describe('Configuration Validation', () => {
        it('should validate configuration structure', () => {
            // Act & Assert - Should not throw for valid config
            expect(() => {
                setupConfigurationServices(serviceManager, {
                    validation: {
                        fallbackBehavior: 'strict'
                    }
                })
            }).not.toThrow()
        })

        it('should throw error for invalid configuration structure', () => {
            // Act & Assert
            expect(() => {
                setupConfigurationServices(serviceManager, {
                    invalidSection: {}
                } as any)
            }).toThrow('Unknown configuration section: invalidSection')
        })
    })
})
