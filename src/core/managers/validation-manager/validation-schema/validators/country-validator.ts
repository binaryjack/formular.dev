import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import {
    CountryCode,
    countryMetadata,
    PatternManager,
    ValidationType
} from '../validation.regex.patterns'

/**
 * Country code validator - validates against supported country codes
 */
export const countryCodeValidator = (
    name: string,
    supportedTypes: ValidationType[] = ['phone', 'postal', 'ssn'],
    required: boolean = true
) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.requiredError)
                .setGuideMessage('Please select a country')
        )
    }

    // Get available countries that support all requested types
    const availableCountries = getCountriesWithSupport(supportedTypes)
    const countryPattern = new RegExp(`^(${availableCountries.join('|')})$`)

    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(countryPattern)
            .setName(name)
            .setErrorMessage('Invalid country selection')
            .setGuideMessage(
                `Select from: ${availableCountries.map((c) => PatternManager.getCountryName(c as CountryCode)).join(', ')}`
            )
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Multi-country selector validator
 */
export const multiCountryValidator = (
    name: string,
    supportedTypes: ValidationType[] = ['phone', 'postal', 'ssn'],
    required: boolean = true,
    minCountries: number = 1,
    maxCountries: number = 5
) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.requiredError)
                .setGuideMessage('Please select at least one country')
        )
    }

    // Min countries constraint
    constraints.push(
        new ValidationConstraintBuilder<number>('min')
            .setConstraint(minCountries)
            .setName(name)
            .setErrorMessage(
                `Select at least ${minCountries} ${minCountries === 1 ? 'country' : 'countries'}`
            )
            .setGuideMessage(
                `Minimum ${minCountries} ${minCountries === 1 ? 'country' : 'countries'} required`
            )
    )

    // Max countries constraint
    constraints.push(
        new ValidationConstraintBuilder<number>('max')
            .setConstraint(maxCountries)
            .setName(name)
            .setErrorMessage(`Select at most ${maxCountries} countries`)
            .setGuideMessage(`Maximum ${maxCountries} countries allowed`)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Switzerland validator - ensures Switzerland is included in country selection
 */
export const switzerlandIncludedValidator = (name: string, required: boolean = true) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.requiredError)
                .setGuideMessage('Country selection is required')
        )
    }

    // Custom validation to ensure Switzerland is included
    constraints.push(
        new ValidationConstraintBuilder<(value: string | string[]) => boolean>('custom')
            .setConstraint((value: string | string[]) => {
                if (typeof value === 'string') {
                    return value === 'CH'
                }
                return Array.isArray(value) && value.includes('CH')
            })
            .setName(name)
            .setErrorMessage('Switzerland must be included in the selection')
            .setGuideMessage('Please include Switzerland (CH) in your country selection')
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

// Utility functions for country support

/**
 * Get countries that support specific validation types
 */
export function getCountriesWithSupport(types: ValidationType[]): string[] {
    const allCountries = Object.keys(countryMetadata)

    return allCountries.filter((country) => {
        return types.every((type) => {
            const availableCountries = PatternManager.getAvailableCountries(type)
            return availableCountries.includes(country as CountryCode)
        })
    })
}

/**
 * Get country metadata with validation support information
 */
export function getCountryValidationInfo(): Array<{
    code: CountryCode
    name: string
    phonePrefix: string
    supports: {
        phone: boolean
        postal: boolean
        ssn: boolean
    }
}> {
    return Object.keys(countryMetadata).map((code) => {
        const countryCode = code as CountryCode
        return {
            code: countryCode,
            name: PatternManager.getCountryName(countryCode),
            phonePrefix: PatternManager.getPhonePrefix(countryCode),
            supports: {
                phone: PatternManager.getAvailableCountries('phone').includes(countryCode),
                postal: PatternManager.getAvailableCountries('postal').includes(countryCode),
                ssn: PatternManager.getAvailableCountries('ssn').includes(countryCode)
            }
        }
    })
}

/**
 * Get validation pattern summary for a country
 */
export function getCountryPatternSummary(countryCode: CountryCode): {
    country: string
    patterns: {
        phone?: RegExp
        postal?: RegExp
        ssn?: RegExp
    }
    examples: {
        phone?: string
        postal?: string
        ssn?: string
    }
} {
    return {
        country: PatternManager.getCountryName(countryCode),
        patterns: {
            phone: PatternManager.getPattern('phone', countryCode),
            postal: PatternManager.getPattern('postal', countryCode),
            ssn: PatternManager.getPattern('ssn', countryCode)
        },
        examples: getCountryExamples(countryCode)
    }
}

function getCountryExamples(countryCode: CountryCode): {
    phone?: string
    postal?: string
    ssn?: string
} {
    const examples: Record<CountryCode, { phone?: string; postal?: string; ssn?: string }> = {
        US: { phone: '+1 (555) 123-4567', postal: '12345-6789', ssn: '123-45-6789' },
        CA: { phone: '+1 (416) 555-0123', postal: 'K1A 0A6', ssn: '123 456 789' },
        UK: { phone: '+44 20 7946 0958', postal: 'SW1A 1AA', ssn: 'AB123456C' },
        DE: { phone: '+49 30 12345678', postal: '10115', ssn: '12 345678 A 123' },
        FR: { phone: '+33 1 23 45 67 89', postal: '75001', ssn: '1234567890123' },
        CH: { phone: '+41 44 123 45 67', postal: '8001', ssn: '756.1234.5678.90' },
        IT: { phone: '+39 06 1234 5678', postal: '00118', ssn: 'RSSMRA85T10A562S' },
        ES: { phone: '+34 91 123 4567', postal: '28001', ssn: '12345678Z' },
        AT: { phone: '+43 1 1234567', postal: '1010', ssn: '1234 567890' },
        NL: { phone: '+31 20 123 4567', postal: '1012 JS', ssn: '123456789' },
        BE: { phone: '+32 2 123 45 67', postal: '1000', ssn: '12.34.56-789.01' },
        LU: { phone: '+352 123 456 789', postal: 'L-1111', ssn: '1234567890123' }
    }
    return examples[countryCode] || {}
}
