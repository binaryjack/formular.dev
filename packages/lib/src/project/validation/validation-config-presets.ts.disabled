/**
 * FORMULAR - Validation Configuration Presets
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Centralized validation presets accessible through ValidationConfigService
 * This provides preconfigured patterns and constraints for use with ValidationConstraintBuilder
 */

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

/**
 * Validation configuration presets interface
 * Provides easy access to preconfigured patterns for ValidationConstraintBuilder
 */
export interface IValidationConfigPresets {
    /**
     * Phone number patterns
     */
    phone: {
        generic: RegExp
        us: RegExp
        ca: RegExp
        uk: RegExp
        de: RegExp
        fr: RegExp
        ch: RegExp
        it: RegExp
        es: RegExp
        at: RegExp
        nl: RegExp
        be: RegExp
        lu: RegExp
        forCountry: (countryCode: string) => RegExp
    }

    /**
     * Postal code patterns
     */
    postal: {
        generic: RegExp
        us: RegExp
        ca: RegExp
        uk: RegExp
        de: RegExp
        fr: RegExp
        ch: RegExp
        it: RegExp
        es: RegExp
        at: RegExp
        nl: RegExp
        be: RegExp
        lu: RegExp
        forCountry: (countryCode: string) => RegExp
    }

    /**
     * SSN/ID patterns
     */
    ssn: {
        generic: RegExp
        us: RegExp
        ca: RegExp
        uk: RegExp
        de: RegExp
        fr: RegExp
        ch: RegExp
        it: RegExp
        es: RegExp
        at: RegExp
        nl: RegExp
        be: RegExp
        lu: RegExp
        forCountry: (countryCode: string) => RegExp
    }

    /**
     * General patterns
     */
    email: RegExp
    firstName: RegExp
    lastName: RegExp
    fullName: RegExp
    passwordStrong: RegExp
    passwordMedium: RegExp
    url: RegExp
    creditCard: RegExp
    currency: RegExp
    age: RegExp
    username: RegExp
    time: RegExp
    date: RegExp
    numeric: RegExp

    /**
     * Custom patterns (user-defined)
     */
    custom: {
        getPattern: (type: string, locale?: string) => RegExp | undefined
        hasPattern: (type: string, locale?: string) => boolean
    }
}

export const SValidationConfigPresets = Symbol.for('IValidationConfigPresets')

/**
 * ValidationConfigPresets implementation
 * Provides easy access to validation patterns through ValidationConfigService
 */
export const ValidationConfigPresets = function (
    this: IValidationConfigPresets,
    sm: IServiceManager
): IValidationConfigPresets {
    if (!sm) {
        throw new Error('ServiceManager is required for ValidationConfigPresets')
    }

    const getValidationConfig = (): IValidationConfigService => {
        try {
            return sm.resolve<IValidationConfigService>(SValidationConfigService)
        } catch (error: any) {
            console.warn(
                'ValidationConfigService not available, using fallback patterns:',
                error.message
            )
            throw new Error(
                'ValidationConfigService not found. Ensure setupValidationConfig() is called first.'
            )
        }
    }

    const getPatternWithFallback = (type: string, locale?: string, fallback?: RegExp): RegExp => {
        try {
            const validationConfig = getValidationConfig()
            if (locale) {
                const pattern = validationConfig.getPatternForLocale(type, locale)
                if (pattern) return pattern
            }

            const patterns = validationConfig.getPatterns()
            const patternMap = patterns[type]
            if (patternMap?.fallback) {
                return patternMap.fallback
            }
        } catch (error: any) {
            console.warn(`Failed to get pattern ${type}:${locale}, using fallback:`, error.message)
        }

        return fallback || /.*/ // Ultimate fallback
    }

    // Phone patterns
    this.phone = {
        generic: getPatternWithFallback('phone', undefined, phonePattern),
        us: getPatternWithFallback('phone', 'US', phonePatterns.US),
        ca: getPatternWithFallback('phone', 'CA', phonePatterns.CA),
        uk: getPatternWithFallback('phone', 'UK', phonePatterns.UK),
        de: getPatternWithFallback('phone', 'DE', phonePatterns.DE),
        fr: getPatternWithFallback('phone', 'FR', phonePatterns.FR),
        ch: getPatternWithFallback('phone', 'CH', phonePatterns.CH),
        it: getPatternWithFallback('phone', 'IT', phonePatterns.IT),
        es: getPatternWithFallback('phone', 'ES', phonePatterns.ES),
        at: getPatternWithFallback('phone', 'AT', phonePatterns.AT),
        nl: getPatternWithFallback('phone', 'NL', phonePatterns.NL),
        be: getPatternWithFallback('phone', 'BE', phonePatterns.BE),
        lu: getPatternWithFallback('phone', 'LU', phonePatterns.LU),
        forCountry: (countryCode: string) =>
            getPatternWithFallback('phone', countryCode, phonePattern)
    }

    // Postal code patterns
    this.postal = {
        generic: getPatternWithFallback('postal', undefined, postalCodePatterns.US),
        us: getPatternWithFallback('postal', 'US', postalCodePatterns.US),
        ca: getPatternWithFallback('postal', 'CA', postalCodePatterns.CA),
        uk: getPatternWithFallback('postal', 'UK', postalCodePatterns.UK),
        de: getPatternWithFallback('postal', 'DE', postalCodePatterns.DE),
        fr: getPatternWithFallback('postal', 'FR', postalCodePatterns.FR),
        ch: getPatternWithFallback('postal', 'CH', postalCodePatterns.CH),
        it: getPatternWithFallback('postal', 'IT', postalCodePatterns.IT),
        es: getPatternWithFallback('postal', 'ES', postalCodePatterns.ES),
        at: getPatternWithFallback('postal', 'AT', postalCodePatterns.AT),
        nl: getPatternWithFallback('postal', 'NL', postalCodePatterns.NL),
        be: getPatternWithFallback('postal', 'BE', postalCodePatterns.BE),
        lu: getPatternWithFallback('postal', 'LU', postalCodePatterns.LU),
        forCountry: (countryCode: string) =>
            getPatternWithFallback('postal', countryCode, postalCodePatterns.US)
    }

    // SSN patterns
    this.ssn = {
        generic: getPatternWithFallback('ssn', undefined, ssnPatterns.US),
        us: getPatternWithFallback('ssn', 'US', ssnPatterns.US),
        ca: getPatternWithFallback('ssn', 'CA', ssnPatterns.CA),
        uk: getPatternWithFallback('ssn', 'UK', ssnPatterns.UK),
        de: getPatternWithFallback('ssn', 'DE', ssnPatterns.DE),
        fr: getPatternWithFallback('ssn', 'FR', ssnPatterns.FR),
        ch: getPatternWithFallback('ssn', 'CH', ssnPatterns.CH),
        it: getPatternWithFallback('ssn', 'IT', ssnPatterns.IT),
        es: getPatternWithFallback('ssn', 'ES', ssnPatterns.ES),
        at: getPatternWithFallback('ssn', 'AT', ssnPatterns.AT),
        nl: getPatternWithFallback('ssn', 'NL', ssnPatterns.NL),
        be: getPatternWithFallback('ssn', 'BE', ssnPatterns.BE),
        lu: getPatternWithFallback('ssn', 'LU', ssnPatterns.LU),
        forCountry: (countryCode: string) =>
            getPatternWithFallback('ssn', countryCode, ssnPatterns.US)
    }

    // General patterns
    this.email = getPatternWithFallback('email', undefined, eMailPattern)
    this.firstName = getPatternWithFallback('firstName', undefined, firstNamePattern)
    this.lastName = getPatternWithFallback('lastName', undefined, lastNamePattern)
    this.fullName = getPatternWithFallback('fullName', undefined, fullNamePattern)
    this.passwordStrong = getPatternWithFallback('passwordStrong', undefined, passwordStrongPattern)
    this.passwordMedium = getPatternWithFallback('passwordMedium', undefined, passwordMediumPattern)
    this.url = getPatternWithFallback('url', undefined, urlPattern)
    this.creditCard = getPatternWithFallback('creditCard', undefined, creditCardPattern)
    this.currency = getPatternWithFallback('currency', undefined, currencyPattern)
    this.age = getPatternWithFallback('age', undefined, agePattern)
    this.username = getPatternWithFallback('username', undefined, usernamePattern)
    this.time = getPatternWithFallback('time', undefined, timePattern)
    this.date = getPatternWithFallback('date', undefined, dateIso8601Pattern)
    this.numeric = getPatternWithFallback('numeric', undefined, numericOnly)

    // Custom patterns
    this.custom = {
        getPattern: (type: string, locale?: string): RegExp | undefined => {
            try {
                const validationConfig = getValidationConfig()
                if (locale) {
                    return validationConfig.getPatternForLocale(type, locale)
                }
                const patterns = validationConfig.getPatterns()
                const patternMap = patterns[type]
                return patternMap?.fallback
            } catch (error: any) {
                console.warn(`Failed to get custom pattern ${type}:${locale}:`, error.message)
                return undefined
            }
        },

        hasPattern: (type: string, locale?: string): boolean => {
            try {
                const validationConfig = getValidationConfig()
                const patterns = validationConfig.getPatterns()
                const patternMap = patterns[type]
                if (!patternMap) return false

                if (locale) {
                    return !!patternMap[locale]
                }
                return !!patternMap.fallback
            } catch (error: any) {
                console.warn(`Failed to check pattern ${type}:${locale}:`, error.message)
                return false
            }
        }
    }

    return this
} as any as IValidationConfigPresets

/**
 * Helper function to get validation presets from service manager
 * Use this in your validators or components
 */
export const getValidationPresets = (sm: IServiceManager): IValidationConfigPresets => {
    try {
        return sm.resolve<IValidationConfigPresets>(SValidationConfigPresets)
    } catch (error: any) {
        console.warn('ValidationConfigPresets not found, creating new instance:', error.message)
        return new (ValidationConfigPresets as any)(sm)
    }
}

/**
 * Register validation presets in service manager
 * This should be called during setup
 */
export const registerValidationPresets = (sm: IServiceManager): void => {
    if (!sm.isRegistered(SValidationConfigPresets)) {
        sm.register(
            SValidationConfigPresets,
            (container: IServiceManager) => new (ValidationConfigPresets as any)(container),
            {
                lifetime: 'singleton'
            }
        )
    }
}
