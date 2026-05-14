import {
    IValidationConstraintBuilder,
    ValidationConstraintBuilder
} from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { CountryCode, PatternManager, ssnPattern } from '../validation.regex.patterns'

/**
 * Country-specific SSN/ID validator
 */
export const ssnCountryValidator = (
    name: string,
    countryCode: CountryCode,
    required: boolean = true
) => {
    const constraints: IValidationConstraintBuilder<any>[] = []
    const countryName = PatternManager.getCountryName(countryCode)
    const pattern = PatternManager.getPattern('ssn', countryCode) || ssnPattern
    const idTypeName = getIdTypeName(countryCode)

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.ssnCountryError)
                .setGuideMessage(ValidationLocalizeKeys.ssnCountryGuide)
        )
    }

    // Country-specific SSN/ID pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(pattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ssnCountryError)
            .setGuideMessage(
                `Enter a valid ${countryName} ${idTypeName} ${getIdExample(countryCode)}`
            )
    )

    // Length constraints based on country
    const { minLength, maxLength } = getIdLength(countryCode)

    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(minLength)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ssnCountryError)
            .setGuideMessage(ValidationLocalizeKeys.ssnCountryGuide)
    )

    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(maxLength)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ssnCountryError)
            .setGuideMessage(ValidationLocalizeKeys.ssnCountryGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Multi-country SSN/ID validator
 */
export const ssnMultiCountryValidator = (
    name: string,
    countryCodes: CountryCode[],
    required: boolean = true
) => {
    const constraints: IValidationConstraintBuilder<any>[] = []
    const countryNames = countryCodes.map((code) => PatternManager.getCountryName(code)).join(', ')
    const multiPattern = PatternManager.createMultiCountryPattern('ssn', countryCodes) || ssnPattern

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.ssnMultiCountryError)
                .setGuideMessage(ValidationLocalizeKeys.ssnMultiCountryGuide)
        )
    }

    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(multiPattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ssnMultiCountryError)
            .setGuideMessage(`Enter a valid ID number for: ${countryNames}`)
    )

    // Use flexible length constraints for multi-country
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(8)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ssnMultiCountryError)
            .setGuideMessage(ValidationLocalizeKeys.ssnMultiCountryGuide)
    )

    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(25)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ssnMultiCountryError)
            .setGuideMessage(ValidationLocalizeKeys.ssnMultiCountryGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Switzerland-specific AHV number validator
 */
export const ahvValidator = (name: string, required: boolean = true) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.ssnSwitzerlandError)
                .setGuideMessage(ValidationLocalizeKeys.ssnSwitzerlandGuide)
        )
    }

    // Swiss AHV number pattern
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(/^756\.\d{4}\.\d{4}\.\d{2}$/)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ssnSwitzerlandError)
            .setGuideMessage('Enter a valid Swiss AHV number (e.g., 756.1234.5678.90)')
    )

    // AHV number length
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(16)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ssnSwitzerlandError)
            .setGuideMessage(ValidationLocalizeKeys.ssnSwitzerlandGuide)
    )

    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(16)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ssnSwitzerlandError)
            .setGuideMessage(ValidationLocalizeKeys.ssnSwitzerlandGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Switzerland-specific SSN validator (alias for AHV)
 */
export const ssnSwitzerlandValidator = (name: string, required: boolean = true) => {
    return ssnCountryValidator(name, 'CH', required)
}

// Helper functions
function getIdTypeName(countryCode: CountryCode): string {
    const typeNames: Record<CountryCode, string> = {
        US: 'Social Security Number',
        CA: 'Social Insurance Number',
        UK: 'National Insurance Number',
        DE: 'Identity Number',
        FR: 'INSEE Number',
        CH: 'AHV Number',
        IT: 'Codice Fiscale',
        ES: 'DNI',
        AT: 'Social Security Number',
        NL: 'BSN',
        BE: 'National Number',
        LU: 'Identity Number'
    }
    return typeNames[countryCode] || 'ID Number'
}

function getIdLength(countryCode: CountryCode): { minLength: number; maxLength: number } {
    const lengthMap: Record<CountryCode, { minLength: number; maxLength: number }> = {
        US: { minLength: 9, maxLength: 11 },
        CA: { minLength: 9, maxLength: 11 },
        UK: { minLength: 9, maxLength: 9 },
        DE: { minLength: 12, maxLength: 15 },
        FR: { minLength: 13, maxLength: 15 },
        CH: { minLength: 16, maxLength: 16 },
        IT: { minLength: 16, maxLength: 16 },
        ES: { minLength: 9, maxLength: 9 },
        AT: { minLength: 10, maxLength: 12 },
        NL: { minLength: 9, maxLength: 9 },
        BE: { minLength: 15, maxLength: 17 },
        LU: { minLength: 13, maxLength: 13 }
    }
    return lengthMap[countryCode] || { minLength: 8, maxLength: 20 }
}

function getIdExample(countryCode: CountryCode): string {
    const examples: Record<CountryCode, string> = {
        US: '(e.g., 123-45-6789)',
        CA: '(e.g., 123 456 789)',
        UK: '(e.g., AB123456C)',
        DE: '(e.g., 12 345678 A 123)',
        FR: '(e.g., 1234567890123)',
        CH: '(e.g., 756.1234.5678.90)',
        IT: '(e.g., RSSMRA85T10A562S)',
        ES: '(e.g., 12345678Z)',
        AT: '(e.g., 1234 567890)',
        NL: '(e.g., 123456789)',
        BE: '(e.g., 12.34.56-789.01)',
        LU: '(e.g., 1234567890123)'
    }
    return examples[countryCode] || ''
}
