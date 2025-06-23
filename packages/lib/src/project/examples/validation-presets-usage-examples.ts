/**
 * FORMULAR - Enhanced Validator Usage Examples
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Examples showing how to use ValidationConfigPresets with ValidationConstraintBuilder
 * This demonstrates the integration pattern you requested
 */

import { IServiceManager } from '../../core/managers/service-manager/service-manager.types'
import {
    IValidationConstraintBuilder,
    ValidationConstraintBuilder
} from '../../core/managers/validation-manager/constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../core/managers/validation-manager/generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../../core/managers/validation-manager/validation-schema/validation.localize.keys'
import { getValidationPresets } from '../validation/validation-config-presets'

/**
 * Enhanced currency validator that uses ValidationConfigPresets
 * This shows the pattern you requested for consumer usage
 */
export const enhancedCurrencyValidator = (
    name: string,
    serviceManager: IServiceManager,
    required: boolean = true
) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    // Get validation presets from service manager
    const presets = getValidationPresets(serviceManager)

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.currencyError)
                .setGuideMessage(ValidationLocalizeKeys.currencyGuide)
        )
    }

    // Use preset pattern directly with ValidationConstraintBuilder
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(presets.currency) // This is what you wanted!
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.currencyError)
            .setGuideMessage(ValidationLocalizeKeys.currencyGuide)
    )

    // Max length for currency
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(20)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.currencyError)
            .setGuideMessage(ValidationLocalizeKeys.currencyGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Enhanced phone validator with country-specific presets
 * Shows how to use country-specific patterns
 */
export const enhancedPhoneValidatorWithPresets = (
    name: string,
    serviceManager: IServiceManager,
    countryCode?: string,
    required: boolean = true
) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    // Get validation presets
    const presets = getValidationPresets(serviceManager)

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.phoneError)
                .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
        )
    }

    // Select pattern based on country or use generic
    let phonePattern: RegExp
    if (countryCode) {
        phonePattern = presets.phone.forCountry(countryCode)
    } else {
        phonePattern = presets.phone.generic
    }

    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(phonePattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneError)
            .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Factory functions that return preset patterns for direct use
 * This is the pattern you described in your example
 */
export const createValidationPresetFactory = (serviceManager: IServiceManager) => {
    const presets = getValidationPresets(serviceManager)

    return {
        /**
         * Phone validators with preset patterns
         */
        phone: {
            us: () => presets.phone.us,
            ch: () => presets.phone.ch,
            de: () => presets.phone.de,
            fr: () => presets.phone.fr,
            uk: () => presets.phone.uk,
            generic: () => presets.phone.generic,
            forCountry: (countryCode: string) => presets.phone.forCountry(countryCode)
        },

        /**
         * Postal code validators with preset patterns
         */
        postal: {
            us: () => presets.postal.us,
            ch: () => presets.postal.ch,
            de: () => presets.postal.de,
            fr: () => presets.postal.fr,
            uk: () => presets.postal.uk,
            generic: () => presets.postal.generic,
            forCountry: (countryCode: string) => presets.postal.forCountry(countryCode)
        },

        /**
         * SSN validators with preset patterns
         */
        ssn: {
            us: () => presets.ssn.us,
            ch: () => presets.ssn.ch,
            de: () => presets.ssn.de,
            fr: () => presets.ssn.fr,
            uk: () => presets.ssn.uk,
            generic: () => presets.ssn.generic,
            forCountry: (countryCode: string) => presets.ssn.forCountry(countryCode)
        },

        /**
         * General validators
         */
        email: () => presets.email,
        firstName: () => presets.firstName,
        lastName: () => presets.lastName,
        fullName: () => presets.fullName,
        passwordStrong: () => presets.passwordStrong,
        passwordMedium: () => presets.passwordMedium,
        url: () => presets.url,
        creditCard: () => presets.creditCard,
        currency: () => presets.currency,
        age: () => presets.age,
        username: () => presets.username,
        time: () => presets.time,
        date: () => presets.date,
        numeric: () => presets.numeric,

        /**
         * Custom patterns
         */
        custom: (type: string, locale?: string) => {
            const pattern = presets.custom.getPattern(type, locale)
            if (!pattern) {
                throw new Error(`Custom pattern '${type}${locale ? ':' + locale : ''}' not found`)
            }
            return pattern
        }
    }
}

/**
 * USAGE EXAMPLES - This is exactly what you wanted!
 */

/**
 * Example 1: Using presets directly with ValidationConstraintBuilder
 */
export const exampleUsageDirectPattern = (serviceManager: IServiceManager) => {
    // Create the factory
    const validationPresets = createValidationPresetFactory(serviceManager)

    // Get US phone pattern
    const usPhonePattern = validationPresets.phone.us()

    // Use it directly with ValidationConstraintBuilder (your requested pattern)
    const constraints: IValidationConstraintBuilder<any>[] = []

    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(usPhonePattern) // ← This is what you wanted!
            .setName('phoneNumber')
            .setErrorMessage(ValidationLocalizeKeys.phoneError)
            .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Example 2: Building complete validators with presets
 */
export const exampleCompleteValidatorWithPresets = (serviceManager: IServiceManager) => {
    const validationPresets = createValidationPresetFactory(serviceManager)

    const buildPhoneValidator = (name: string, countryCode: string) => {
        const constraints: IValidationConstraintBuilder<any>[] = []

        // Required constraint
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.phoneError)
                .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
        )

        // Pattern constraint using preset
        const phonePattern = validationPresets.phone.forCountry(countryCode)
        constraints.push(
            new ValidationConstraintBuilder<RegExp>('pattern')
                .setConstraint(phonePattern)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.phoneError)
                .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
        )

        // Length constraints
        constraints.push(
            new ValidationConstraintBuilder<number>('minLength')
                .setConstraint(7)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.phoneError)
                .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
        )

        constraints.push(
            new ValidationConstraintBuilder<number>('maxLength')
                .setConstraint(20)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.phoneError)
                .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
        )

        return new GenericValidationBuilder().setConstraints(constraints)
    }

    return {
        usPhone: buildPhoneValidator('phone', 'US'),
        chPhone: buildPhoneValidator('phone', 'CH'),
        dePhone: buildPhoneValidator('phone', 'DE')
    }
}

/**
 * Example 3: Consumer usage pattern you described
 */
export const createPhoneValidatorWithPatterns = (serviceManager: IServiceManager) => {
    const validationPresets = createValidationPresetFactory(serviceManager)

    return {
        us: (fieldName: string) => {
            const constraints: IValidationConstraintBuilder<any>[] = []

            // Use preset directly
            const usPhonePattern = validationPresets.phone.us()

            constraints.push(
                new ValidationConstraintBuilder<RegExp>('pattern')
                    .setConstraint(usPhonePattern)
                    .setName(fieldName)
                    .setErrorMessage(ValidationLocalizeKeys.phoneError)
                    .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
            )

            return new GenericValidationBuilder().setConstraints(constraints)
        },

        ch: (fieldName: string) => {
            const constraints: IValidationConstraintBuilder<any>[] = []

            // Use preset directly
            const chPhonePattern = validationPresets.phone.ch()

            constraints.push(
                new ValidationConstraintBuilder<RegExp>('pattern')
                    .setConstraint(chPhonePattern)
                    .setName(fieldName)
                    .setErrorMessage(ValidationLocalizeKeys.phoneError)
                    .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
            )

            return new GenericValidationBuilder().setConstraints(constraints)
        },

        forCountry: (fieldName: string, countryCode: string) => {
            const constraints: IValidationConstraintBuilder<any>[] = []

            // Use preset directly
            const phonePattern = validationPresets.phone.forCountry(countryCode)

            constraints.push(
                new ValidationConstraintBuilder<RegExp>('pattern')
                    .setConstraint(phonePattern)
                    .setName(fieldName)
                    .setErrorMessage(ValidationLocalizeKeys.phoneError)
                    .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
            )

            return new GenericValidationBuilder().setConstraints(constraints)
        }
    }
}

/**
 * THE EXACT USAGE PATTERN YOU REQUESTED:
 *
 * ```typescript
 * // Setup validation patterns first
 * setupValidationPatterns(serviceManager, {
 *     validation: {
 *         patterns: {
 *             phone: {
 *                 'CUSTOM': /^CUSTOM\d{10}$/,
 *                 fallback: /^\d{10}$/
 *             }
 *         }
 *     }
 * })
 *
 * // Then use in your code exactly as you described
 * const phoneValidators = createPhoneValidatorWithPatterns(serviceManager)
 * const usPhone = phoneValidators.us('phoneNumber')
 *
 * // Or directly get patterns for ValidationConstraintBuilder
 * const validationPresets = createValidationPresetFactory(serviceManager)
 * const usPhonePattern = validationPresets.phone.us()
 *
 * constraints.push(
 *     new ValidationConstraintBuilder<RegExp>('pattern')
 *         .setConstraint(usPhonePattern) // ← Direct preset usage!
 *         .setName(name)
 *         .setErrorMessage(ValidationLocalizeKeys.phoneError)
 *         .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
 * )
 * ```
 */
