import {
    IValidationConstraintBuilder,
    ValidationConstraintBuilder
} from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { CountryCode, PatternManager, postalCodeUSPattern } from '../validation.regex.patterns'

/**
 * Country-specific postal code validator
 */
export const postalCodeCountryValidator = (
    name: string,
    countryCode: CountryCode,
    required: boolean = true
) => {
    const constraints: IValidationConstraintBuilder<any>[] = []
    const countryName = PatternManager.getCountryName(countryCode)
    const pattern = PatternManager.getPattern('postal', countryCode) || postalCodeUSPattern

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.postalCodeCountryError)
                .setGuideMessage(ValidationLocalizeKeys.postalCodeCountryGuide)
        )
    }

    // Country-specific postal code pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(pattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.postalCodeCountryError)
            .setGuideMessage(
                `Enter a valid ${countryName} postal code ${getPostalCodeExample(countryCode)}`
            )
    )

    // Length constraints based on country
    const { minLength, maxLength } = getPostalCodeLength(countryCode)

    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(minLength)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.postalCodeCountryError)
            .setGuideMessage(ValidationLocalizeKeys.postalCodeCountryGuide)
    )

    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(maxLength)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.postalCodeCountryError)
            .setGuideMessage(ValidationLocalizeKeys.postalCodeCountryGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Multi-country postal code validator
 */
export const postalCodeMultiCountryValidator = (
    name: string,
    countryCodes: CountryCode[],
    required: boolean = true
) => {
    const constraints: IValidationConstraintBuilder<any>[] = []
    const countryNames = countryCodes.map((code) => PatternManager.getCountryName(code)).join(', ')
    const multiPattern =
        PatternManager.createMultiCountryPattern('postal', countryCodes) || postalCodeUSPattern

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.postalCodeMultiCountryError)
                .setGuideMessage(ValidationLocalizeKeys.postalCodeMultiCountryGuide)
        )
    }

    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(multiPattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.postalCodeMultiCountryError)
            .setGuideMessage(`Enter a valid postal code for: ${countryNames}`)
    )

    // Use flexible length constraints for multi-country
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(3)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.postalCodeMultiCountryError)
            .setGuideMessage(ValidationLocalizeKeys.postalCodeMultiCountryGuide)
    )

    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(10)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.postalCodeMultiCountryError)
            .setGuideMessage(ValidationLocalizeKeys.postalCodeMultiCountryGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Switzerland-specific postal code validator (NPA - Numéro Postal d'Acheminement)
 */
export const postalCodeSwitzerlandValidator = (name: string, required: boolean = true) => {
    return postalCodeCountryValidator(name, 'CH', required)
}

/**
 * Switzerland NPA (postal code) validator with enhanced validation
 */
export const npaValidator = (name: string, required: boolean = true) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.postalCodeSwitzerlandError)
                .setGuideMessage(ValidationLocalizeKeys.postalCodeSwitzerlandGuide)
        )
    }

    // Swiss postal code pattern (4 digits)
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(/^\d{4}$/)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.postalCodeSwitzerlandError)
            .setGuideMessage('Enter a valid Swiss NPA (4-digit postal code, e.g., 8001 for Zurich)')
    )

    // Exact length for Swiss postal codes
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(4)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.postalCodeSwitzerlandError)
            .setGuideMessage(ValidationLocalizeKeys.postalCodeSwitzerlandGuide)
    )

    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(4)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.postalCodeSwitzerlandError)
            .setGuideMessage(ValidationLocalizeKeys.postalCodeSwitzerlandGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

// Helper functions
function getPostalCodeLength(countryCode: CountryCode): { minLength: number; maxLength: number } {
    const lengthMap: Record<CountryCode, { minLength: number; maxLength: number }> = {
        US: { minLength: 5, maxLength: 10 },
        CA: { minLength: 6, maxLength: 7 },
        UK: { minLength: 6, maxLength: 8 },
        DE: { minLength: 5, maxLength: 5 },
        FR: { minLength: 5, maxLength: 5 },
        CH: { minLength: 4, maxLength: 4 },
        IT: { minLength: 5, maxLength: 5 },
        ES: { minLength: 5, maxLength: 5 },
        AT: { minLength: 4, maxLength: 4 },
        NL: { minLength: 6, maxLength: 7 },
        BE: { minLength: 4, maxLength: 4 },
        LU: { minLength: 4, maxLength: 6 }
    }
    return lengthMap[countryCode] || { minLength: 3, maxLength: 10 }
}

function getPostalCodeExample(countryCode: CountryCode): string {
    const examples: Record<CountryCode, string> = {
        US: '(e.g., 12345 or 12345-6789)',
        CA: '(e.g., K1A 0A6)',
        UK: '(e.g., SW1A 1AA)',
        DE: '(e.g., 10115)',
        FR: '(e.g., 75001)',
        CH: '(e.g., 8001)',
        IT: '(e.g., 00118)',
        ES: '(e.g., 28001)',
        AT: '(e.g., 1010)',
        NL: '(e.g., 1012 JS)',
        BE: '(e.g., 1000)',
        LU: '(e.g., L-1111)'
    }
    return examples[countryCode] || ''
}
