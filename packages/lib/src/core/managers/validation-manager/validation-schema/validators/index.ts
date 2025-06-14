// Export all validators
export { ageValidator } from './age-validator'
export { creditCardValidator } from './credit-card-validator'
export { currencyValidator } from './currency-validator'
export { dateValidator } from './date-validator'
export { firstNameValidator } from './first-name-validator'
export { fullNameValidator } from './full-name-validator'
export { lastNameValidator } from './last-name-validator'
export { numericValidator } from './numeric-validator'
export { passwordMediumValidator } from './password-medium-validator'
export { passwordStrongValidator } from './password-strong-validator'
export { phoneValidator } from './phone-validator'
export { postalCodeValidator, type PostalCodeRegion } from './postal-code-validator'
export { ssnValidator } from './ssn-validator'
export { timeValidator } from './time-validator'
export { urlValidator } from './url-validator'
export { usernameValidator } from './username-validator'

// Country-specific validators
export {
    countryCodeValidator,
    getCountriesWithSupport,
    getCountryPatternSummary,
    getCountryValidationInfo,
    multiCountryValidator,
    switzerlandIncludedValidator
} from './country-validator'
export {
    phoneCountryValidator,
    phoneMultiCountryValidator,
    phoneSwitzerlandValidator
} from './phone-country-validator'
export {
    npaValidator,
    postalCodeCountryValidator,
    postalCodeMultiCountryValidator,
    postalCodeSwitzerlandValidator
} from './postal-code-country-validator'
export {
    ahvValidator,
    ssnCountryValidator,
    ssnMultiCountryValidator,
    ssnSwitzerlandValidator
} from './ssn-country-validator'

// Re-export pattern management utilities
export { countryMetadata, PatternManager } from '../validation.regex.patterns'
export type { CountryCode, ValidationType } from '../validation.regex.patterns'

// Import all validators for the object export
import { ageValidator } from './age-validator'
import { creditCardValidator } from './credit-card-validator'
import { currencyValidator } from './currency-validator'
import { dateValidator } from './date-validator'
import { firstNameValidator } from './first-name-validator'
import { fullNameValidator } from './full-name-validator'
import { lastNameValidator } from './last-name-validator'
import { numericValidator } from './numeric-validator'
import { passwordMediumValidator } from './password-medium-validator'
import { passwordStrongValidator } from './password-strong-validator'
import { phoneValidator } from './phone-validator'
import { postalCodeValidator } from './postal-code-validator'
import { ssnValidator } from './ssn-validator'
import { timeValidator } from './time-validator'
import { urlValidator } from './url-validator'
import { usernameValidator } from './username-validator'

// Import country-specific validators
import { eMailValidator } from '../presets/e-mail-builder'
import {
    countryCodeValidator,
    multiCountryValidator,
    switzerlandIncludedValidator
} from './country-validator'
import {
    phoneCountryValidator,
    phoneMultiCountryValidator,
    phoneSwitzerlandValidator
} from './phone-country-validator'
import {
    npaValidator,
    postalCodeCountryValidator,
    postalCodeMultiCountryValidator,
    postalCodeSwitzerlandValidator
} from './postal-code-country-validator'
import {
    ahvValidator,
    ssnCountryValidator,
    ssnMultiCountryValidator,
    ssnSwitzerlandValidator
} from './ssn-country-validator'

export const Validators = {
    phone: phoneValidator,
    firstName: firstNameValidator,
    lastName: lastNameValidator,
    fullName: fullNameValidator,
    passwordStrong: passwordStrongValidator,
    passwordMedium: passwordMediumValidator,
    url: urlValidator,
    creditCard: creditCardValidator,
    postalCode: postalCodeValidator,
    ssn: ssnValidator,
    currency: currencyValidator,
    age: ageValidator,
    username: usernameValidator,
    time: timeValidator,
    numeric: numericValidator,
    date: dateValidator,
    email: eMailValidator,
    // Country-specific validators
    phoneCountry: phoneCountryValidator,
    phoneMultiCountry: phoneMultiCountryValidator,
    phoneSwitzerland: phoneSwitzerlandValidator,
    postalCodeCountry: postalCodeCountryValidator,
    postalCodeMultiCountry: postalCodeMultiCountryValidator,
    postalCodeSwitzerland: postalCodeSwitzerlandValidator,
    npa: npaValidator,
    ssnCountry: ssnCountryValidator,
    ssnMultiCountry: ssnMultiCountryValidator,
    ahv: ahvValidator,
    ssnSwitzerland: ssnSwitzerlandValidator,
    countryCode: countryCodeValidator,
    multiCountry: multiCountryValidator,
    switzerlandIncluded: switzerlandIncludedValidator
}
