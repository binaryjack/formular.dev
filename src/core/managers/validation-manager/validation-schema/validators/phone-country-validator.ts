import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { CountryCode, PatternManager, phonePattern } from '../validation.regex.patterns'

/**
 * Country-specific phone validator
 */
export const phoneCountryValidator = (
    name: string,
    countryCode: CountryCode,
    required: boolean = true
) => {
    const constraints = []
    const countryName = PatternManager.getCountryName(countryCode)
    const phonePrefix = PatternManager.getPhonePrefix(countryCode)
    const pattern = PatternManager.getPattern('phone', countryCode) || phonePattern

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.phoneCountryError)
                .setGuideMessage(ValidationLocalizeKeys.phoneCountryGuide)
        )
    }

    // Country-specific phone pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(pattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneCountryError)
            .setGuideMessage(
                `Enter a valid ${countryName} phone number (e.g., ${phonePrefix} format)`
            )
    )

    // Min length based on country
    const minLength = getMinPhoneLength(countryCode)
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(minLength)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneCountryError)
            .setGuideMessage(ValidationLocalizeKeys.phoneCountryGuide)
    )

    // Max length based on country
    const maxLength = getMaxPhoneLength(countryCode)
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(maxLength)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneCountryError)
            .setGuideMessage(ValidationLocalizeKeys.phoneCountryGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Multi-country phone validator - validates against multiple country patterns
 */
export const phoneMultiCountryValidator = (
    name: string,
    countryCodes: CountryCode[],
    required: boolean = true
) => {
    const constraints = []
    const countryNames = countryCodes.map((code) => PatternManager.getCountryName(code)).join(', ')
    const multiPattern =
        PatternManager.createMultiCountryPattern('phone', countryCodes) || phonePattern

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.phoneMultiCountryError)
                .setGuideMessage(ValidationLocalizeKeys.phoneMultiCountryGuide)
        )
    }

    // Multi-country phone pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(multiPattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneMultiCountryError)
            .setGuideMessage(`Enter a valid phone number for: ${countryNames}`)
    )

    // Use flexible length constraints for multi-country
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(7)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneMultiCountryError)
            .setGuideMessage(ValidationLocalizeKeys.phoneMultiCountryGuide)
    )

    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(25)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneMultiCountryError)
            .setGuideMessage(ValidationLocalizeKeys.phoneMultiCountryGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Switzerland-specific phone validator
 */
export const phoneSwitzerlandValidator = (name: string, required: boolean = true) => {
    return phoneCountryValidator(name, 'CH', required)
}

// Helper functions for country-specific length constraints
function getMinPhoneLength(countryCode: CountryCode): number {
    const lengthMap: Record<CountryCode, number> = {
        US: 10,
        CA: 10,
        UK: 10,
        DE: 11,
        FR: 10,
        CH: 9,
        IT: 9,
        ES: 9,
        AT: 10,
        NL: 9,
        BE: 9,
        LU: 8
    }
    return lengthMap[countryCode] || 7
}

function getMaxPhoneLength(countryCode: CountryCode): number {
    const lengthMap: Record<CountryCode, number> = {
        US: 15,
        CA: 15,
        UK: 15,
        DE: 16,
        FR: 16,
        CH: 13,
        IT: 15,
        ES: 13,
        AT: 15,
        NL: 13,
        BE: 13,
        LU: 12
    }
    return lengthMap[countryCode] || 20
}
