/**
 * FORMULAR - Validation Patterns Setup
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Centralized setup for validation patterns using ValidationConfigService
 * This file replaces hardcoded patterns in validators with configurable patterns
 */

import { PartialLibraryConfig, setupConfigurationServices } from '@core/config'
import { IValidationConfigService } from '@core/config/interfaces/configuration-service.interfaces'
import { SValidationConfigService } from '@core/config/services/validation-config-service'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    agePattern,
    creditCardPattern,
    currencyPattern,
    dateIso8601Pattern,
    eMailPattern,
    firstNamePattern,
    fullNamePattern,
    lastNamePattern,
    numericOnly,
    passwordMediumPattern,
    passwordStrongPattern,
    phonePattern,
    phonePatterns,
    postalCodePatterns,
    ssnPatterns,
    timePattern,
    urlPattern,
    usernamePattern
} from '@core/managers/validation-manager/validation-schema/validation.regex.patterns'
import { registerValidationPresets } from '@project/validation/validation-config-presets'

/**
 * Pattern helper service that bridges validators with ValidationConfigService
 * This service provides patterns to validators while maintaining backward compatibility
 */
export interface IValidationPatternService {
    getPattern: (type: ValidatorPatternType, locale?: string) => RegExp
    validateWithPattern: (type: ValidatorPatternType, value: string, locale?: string) => boolean
    getSupportedLocales: (type: ValidatorPatternType) => string[]
}

export const SValidationPatternService = Symbol.for('IValidationPatternService')

export type ValidatorPatternType =
    | 'phone'
    | 'postal'
    | 'ssn'
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'fullName'
    | 'passwordStrong'
    | 'passwordMedium'
    | 'url'
    | 'creditCard'
    | 'currency'
    | 'age'
    | 'username'
    | 'time'
    | 'date'
    | 'numeric'

/**
 * ValidationPatternService implementation
 * Uses ValidationConfigService for dynamic patterns with fallback to hardcoded patterns
 */
export const ValidationPatternService = function (
    this: IValidationPatternService,
    sm: IServiceManager
): IValidationPatternService {
    if (!sm) {
        throw new Error('ServiceManager is required for ValidationPatternService')
    }
    const getValidationConfig = (): IValidationConfigService => {
        try {
            return sm.resolve<IValidationConfigService>(SValidationConfigService)
        } catch (error: any) {
            console.error('ValidationConfigService not found:', error.message)
            throw new Error(
                'ValidationConfigService not found. Ensure setupValidationPatterns() is called before using validators.'
            )
        }
    }

    this.getPattern = function (type: ValidatorPatternType, locale?: string): RegExp {
        const validationConfig = getValidationConfig()

        // Try to get pattern from configuration service first
        if (locale) {
            const configPattern = validationConfig.getPatternForLocale(type, locale)
            if (configPattern) {
                return configPattern
            }
        }

        // Fallback to configured patterns or hardcoded patterns
        const patterns = validationConfig.getPatterns()
        const patternMap = patterns[type]

        if (patternMap) {
            if (locale && patternMap[locale]) {
                return patternMap[locale]
            }
            if (patternMap.fallback) {
                return patternMap.fallback
            }
        }

        // Ultimate fallback to hardcoded patterns for backward compatibility
        return getHardcodedPattern(type, locale)
    }

    this.validateWithPattern = function (
        type: ValidatorPatternType,
        value: string,
        locale?: string
    ): boolean {
        try {
            const validationConfig = getValidationConfig()
            if (locale) {
                return validationConfig.validatePattern(type, locale, value)
            }
            // Use fallback when no locale specified
            const pattern = this.getPattern(type)
            return pattern.test(value)
        } catch (error: any) {
            console.warn('ValidationConfig error, falling back to pattern matching:', error.message)
            // Fallback to direct pattern matching
            const pattern = this.getPattern(type, locale)
            return pattern.test(value)
        }
    }

    this.getSupportedLocales = function (type: ValidatorPatternType): string[] {
        try {
            const validationConfig = getValidationConfig()
            return validationConfig.getSupportedLocales(type)
        } catch (error: any) {
            console.warn(
                'ValidationConfig error, falling back to hardcoded locales:',
                error.message
            )
            // Fallback to hardcoded locales
            return getHardcodedLocales(type)
        }
    }

    return this
} as any as IValidationPatternService

/**
 * Fallback to hardcoded patterns for backward compatibility
 */
function getHardcodedPattern(type: ValidatorPatternType, locale?: string): RegExp {
    switch (type) {
        case 'phone':
            return locale && phonePatterns[locale as keyof typeof phonePatterns]
                ? phonePatterns[locale as keyof typeof phonePatterns]
                : phonePattern

        case 'postal':
            return locale && postalCodePatterns[locale as keyof typeof postalCodePatterns]
                ? postalCodePatterns[locale as keyof typeof postalCodePatterns]
                : postalCodePatterns.US // Default to US format

        case 'ssn':
            return locale && ssnPatterns[locale as keyof typeof ssnPatterns]
                ? ssnPatterns[locale as keyof typeof ssnPatterns]
                : ssnPatterns.US // Default to US format

        case 'email':
            return eMailPattern

        case 'firstName':
            return firstNamePattern

        case 'lastName':
            return lastNamePattern

        case 'fullName':
            return fullNamePattern

        case 'passwordStrong':
            return passwordStrongPattern

        case 'passwordMedium':
            return passwordMediumPattern

        case 'url':
            return urlPattern

        case 'creditCard':
            return creditCardPattern

        case 'currency':
            return currencyPattern

        case 'age':
            return agePattern

        case 'username':
            return usernamePattern

        case 'time':
            return timePattern

        case 'date':
            return dateIso8601Pattern

        case 'numeric':
            return numericOnly

        default:
            throw new Error(`Unknown pattern type: ${type}`)
    }
}

/**
 * Get hardcoded supported locales for fallback
 */
function getHardcodedLocales(type: ValidatorPatternType): string[] {
    switch (type) {
        case 'phone':
            return Object.keys(phonePatterns)
        case 'postal':
            return Object.keys(postalCodePatterns)
        case 'ssn':
            return Object.keys(ssnPatterns)
        default:
            return []
    }
}

/**
 * Default validation patterns configuration
 * These patterns are loaded into the ValidationConfigService
 */
export const getDefaultValidationPatternsConfig = (): PartialLibraryConfig => {
    return {
        validation: {
            patterns: {
                phone: {
                    ...phonePatterns,
                    fallback: phonePattern
                },
                postal: {
                    ...postalCodePatterns,
                    fallback: postalCodePatterns.US
                },
                ssn: {
                    ...ssnPatterns,
                    fallback: ssnPatterns.US
                },
                email: {
                    fallback: eMailPattern
                },
                firstName: {
                    fallback: firstNamePattern
                },
                lastName: {
                    fallback: lastNamePattern
                },
                fullName: {
                    fallback: fullNamePattern
                },
                passwordStrong: {
                    fallback: passwordStrongPattern
                },
                passwordMedium: {
                    fallback: passwordMediumPattern
                },
                url: {
                    fallback: urlPattern
                },
                creditCard: {
                    fallback: creditCardPattern
                },
                currency: {
                    fallback: currencyPattern
                },
                age: {
                    fallback: agePattern
                },
                username: {
                    fallback: usernamePattern
                },
                time: {
                    fallback: timePattern
                },
                date: {
                    fallback: dateIso8601Pattern
                },
                numeric: {
                    fallback: numericOnly
                }
            },
            fallbackBehavior: 'lenient',
            enableStrictMode: false
        }
    }
}

/**
 * Setup validation patterns with ValidationConfigService
 * This should be called during application initialization, before creating any validators
 *
 * @param sm - Service Manager instance
 * @param userConfig - Optional user configuration to override defaults
 */
export const setupValidationPatterns = function (
    sm: IServiceManager,
    userConfig?: PartialLibraryConfig
): void {
    if (!sm) {
        throw new Error('ServiceManager is required for setupValidationPatterns')
    }

    // Merge default patterns with user configuration
    const defaultConfig = getDefaultValidationPatternsConfig()
    const mergedConfig: PartialLibraryConfig = userConfig
        ? mergeValidationConfig(defaultConfig, userConfig)
        : defaultConfig // Setup configuration services with patterns
    setupConfigurationServices(sm, mergedConfig)

    // Register ValidationConfigPresets for easy access to patterns
    registerValidationPresets(sm)
}

/**
 * Merge user validation configuration with defaults
 */
function mergeValidationConfig(
    defaultConfig: PartialLibraryConfig,
    userConfig: PartialLibraryConfig
): PartialLibraryConfig {
    const merged = { ...defaultConfig }

    if (userConfig.validation) {
        merged.validation = {
            ...defaultConfig.validation,
            ...userConfig.validation
        }

        // Merge patterns specifically
        if (userConfig.validation.patterns && defaultConfig.validation?.patterns) {
            merged.validation.patterns = {
                ...defaultConfig.validation.patterns,
                ...userConfig.validation.patterns
            } // Merge individual pattern maps
            Object.keys(userConfig.validation.patterns).forEach((patternType) => {
                const userPatternMap = userConfig.validation!.patterns![patternType]
                const defaultPatternMap = defaultConfig.validation!.patterns![patternType]

                if (
                    userPatternMap &&
                    defaultPatternMap &&
                    typeof userPatternMap === 'object' &&
                    typeof defaultPatternMap === 'object'
                ) {
                    merged.validation!.patterns![patternType] = {
                        ...(defaultPatternMap as Record<string, RegExp>),
                        ...(userPatternMap as Record<string, RegExp>)
                    }
                }
            })
        }
    }

    return merged
}

/**
 * Validation patterns utility for easy access
 * Use this in validators instead of hardcoded patterns
 */
export const ValidationPatterns = {
    /**
     * Get a pattern service instance from service manager
     */
    getService: (sm: IServiceManager): IValidationPatternService => {
        return sm.resolve<IValidationPatternService>(SValidationPatternService)
    },

    /**
     * Quick access methods for common patterns
     */
    phone: (sm: IServiceManager, locale?: string) =>
        ValidationPatterns.getService(sm).getPattern('phone', locale),

    postal: (sm: IServiceManager, locale?: string) =>
        ValidationPatterns.getService(sm).getPattern('postal', locale),

    ssn: (sm: IServiceManager, locale?: string) =>
        ValidationPatterns.getService(sm).getPattern('ssn', locale),

    email: (sm: IServiceManager) => ValidationPatterns.getService(sm).getPattern('email'),

    firstName: (sm: IServiceManager) => ValidationPatterns.getService(sm).getPattern('firstName'),

    lastName: (sm: IServiceManager) => ValidationPatterns.getService(sm).getPattern('lastName'),

    fullName: (sm: IServiceManager) => ValidationPatterns.getService(sm).getPattern('fullName'),

    passwordStrong: (sm: IServiceManager) =>
        ValidationPatterns.getService(sm).getPattern('passwordStrong'),

    passwordMedium: (sm: IServiceManager) =>
        ValidationPatterns.getService(sm).getPattern('passwordMedium'),

    url: (sm: IServiceManager) => ValidationPatterns.getService(sm).getPattern('url'),

    creditCard: (sm: IServiceManager) => ValidationPatterns.getService(sm).getPattern('creditCard'),

    currency: (sm: IServiceManager) => ValidationPatterns.getService(sm).getPattern('currency'),

    age: (sm: IServiceManager) => ValidationPatterns.getService(sm).getPattern('age'),

    username: (sm: IServiceManager) => ValidationPatterns.getService(sm).getPattern('username'),

    time: (sm: IServiceManager) => ValidationPatterns.getService(sm).getPattern('time'),

    date: (sm: IServiceManager) => ValidationPatterns.getService(sm).getPattern('date'),

    numeric: (sm: IServiceManager) => ValidationPatterns.getService(sm).getPattern('numeric')
}
