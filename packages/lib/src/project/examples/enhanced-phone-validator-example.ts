/**
 * FORMULAR - Enhanced Phone Validator
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Enhanced phone validator that uses ValidationPatternService
 * This serves as an example of how to update validators to use the new pattern system
 */

import { IServiceManager } from '../../core/managers/service-manager/service-manager.types'
import {
    IValidationConstraintBuilder,
    ValidationConstraintBuilder
} from '../../core/managers/validation-manager/constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../core/managers/validation-manager/generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../../core/managers/validation-manager/validation-schema/validation.localize.keys'
import {
    IValidationPatternService,
    SValidationPatternService
} from '../setup/setup-validation-patterns'

/**
 * Enhanced phone validator that uses ValidationPatternService for patterns
 * This validator demonstrates the new pattern integration approach
 *
 * @param name - Field name for validation
 * @param required - Whether the field is required
 * @param locale - Optional locale for country-specific patterns (e.g., 'US', 'CH', 'DE')
 * @param serviceManager - Service manager instance to resolve pattern service
 */
export const enhancedPhoneValidator = (
    name: string,
    required: boolean = true,
    locale?: string,
    serviceManager?: IServiceManager
) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.phoneError)
                .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
        )
    }

    // Get pattern from ValidationPatternService or fallback to hardcoded
    let phonePattern: RegExp

    if (serviceManager) {
        try {
            const patternService =
                serviceManager.resolve<IValidationPatternService>(SValidationPatternService)
            phonePattern = patternService.getPattern('phone', locale)
        } catch (error: any) {
            console.warn(
                'ValidationPatternService not available, using fallback pattern:',
                error.message
            )
            // Fallback to hardcoded pattern - import from existing patterns
            phonePattern =
                /^(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
        }
    } else {
        // Fallback when no service manager provided
        phonePattern =
            /^(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    }

    // Phone pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(phonePattern)
            .setName(name)
            .setErrorMessage(
                locale
                    ? ValidationLocalizeKeys.phoneCountryError
                    : ValidationLocalizeKeys.phonePatternError
            )
            .setGuideMessage(
                locale
                    ? ValidationLocalizeKeys.phoneCountryGuide
                    : ValidationLocalizeKeys.phonePatternGuide
            )
    )

    // Min length for phone
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(7)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneError)
            .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
    )

    // Max length for phone
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(20)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneError)
            .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Factory function for creating phone validators with service manager integration
 * This is the recommended approach for new validator implementations
 */
export const createPhoneValidatorWithPatterns = (serviceManager: IServiceManager) => {
    return {
        /**
         * Create a phone validator for any locale
         */
        forLocale: (name: string, locale: string, required: boolean = true) =>
            enhancedPhoneValidator(name, required, locale, serviceManager),

        /**
         * Create a generic phone validator (uses fallback pattern)
         */
        generic: (name: string, required: boolean = true) =>
            enhancedPhoneValidator(name, required, undefined, serviceManager),

        /**
         * Create validators for common locales
         */
        us: (name: string, required: boolean = true) =>
            enhancedPhoneValidator(name, required, 'US', serviceManager),

        ch: (name: string, required: boolean = true) =>
            enhancedPhoneValidator(name, required, 'CH', serviceManager),

        de: (name: string, required: boolean = true) =>
            enhancedPhoneValidator(name, required, 'DE', serviceManager),

        fr: (name: string, required: boolean = true) =>
            enhancedPhoneValidator(name, required, 'FR', serviceManager),

        uk: (name: string, required: boolean = true) =>
            enhancedPhoneValidator(name, required, 'UK', serviceManager),

        /**
         * Get supported locales for phone validation
         */
        getSupportedLocales: (): string[] => {
            try {
                const patternService =
                    serviceManager.resolve<IValidationPatternService>(SValidationPatternService)
                return patternService.getSupportedLocales('phone')
            } catch (error: any) {
                console.warn(
                    'ValidationPatternService not available for locales lookup:',
                    error.message
                )
                return ['US', 'CA', 'UK', 'DE', 'FR', 'CH', 'IT', 'ES', 'AT', 'NL', 'BE', 'LU']
            }
        },

        /**
         * Validate a phone number with pattern service
         */
        validate: (value: string, locale?: string): boolean => {
            try {
                const patternService =
                    serviceManager.resolve<IValidationPatternService>(SValidationPatternService)
                return patternService.validateWithPattern('phone', value, locale)
            } catch (error: any) {
                console.warn(
                    'ValidationPatternService not available for validation:',
                    error.message
                )
                return false
            }
        }
    }
}

/**
 * Usage examples:
 *
 * ```typescript
 * // In your setup or initialization code
 * setupValidationPatterns(serviceManager, {
 *   validation: {
 *     patterns: {
 *       phone: {
 *         'CUSTOM': /^CUSTOM\d{10}$/,
 *         fallback: /^\d{10}$/
 *       }
 *     }
 *   }
 * })
 *
 * // Using the factory
 * const phoneValidators = createPhoneValidatorWithPatterns(serviceManager)
 *
 * // Create validators
 * const usPhoneValidator = phoneValidators.us('phoneNumber')
 * const swissPhoneValidator = phoneValidators.ch('phoneNumber')
 * const genericPhoneValidator = phoneValidators.generic('phoneNumber')
 * const customPhoneValidator = phoneValidators.forLocale('phoneNumber', 'CUSTOM')
 *
 * // Get supported locales
 * const locales = phoneValidators.getSupportedLocales()
 *
 * // Validate directly
 * const isValid = phoneValidators.validate('+41 44 123 45 67', 'CH')
 * ```
 */
