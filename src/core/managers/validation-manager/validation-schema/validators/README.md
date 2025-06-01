# Validation Validators Usage Guide

This guide demonstrates how to use the common validators that follow the same pattern as the `eMailBuilder`.

## Available Validators

### Phone Validator

```typescript
import { phoneValidator } from '@core/managers/validation-manager/validation-schema/validators'

// Required phone validation
const phoneValidation = phoneValidator('phone', true)

// Optional phone validation
const optionalPhoneValidation = phoneValidator('phone', false)
```

### Name Validators

```typescript
import {
    firstNameValidator,
    lastNameValidator,
    fullNameValidator
} from '@core/managers/validation-manager/validation-schema/validators'

// First name validation
const firstNameValidation = firstNameValidator('firstName', true)

// Last name validation
const lastNameValidation = lastNameValidator('lastName', true)

// Full name validation (requires both first and last name)
const fullNameValidation = fullNameValidator('fullName', true)
```

### Password Validators

```typescript
import {
    passwordStrongValidator,
    passwordMediumValidator
} from '@core/managers/validation-manager/validation-schema/validators'

// Strong password validation (requires uppercase, lowercase, number, special char, min 8 chars)
const strongPasswordValidation = passwordStrongValidator('password', true)

// Medium password validation (requires letters and numbers, min 6 chars)
const mediumPasswordValidation = passwordMediumValidator('password', true)
```

### URL Validator

```typescript
import { urlValidator } from '@core/managers/validation-manager/validation-schema/validators'

// URL validation
const urlValidation = urlValidator('website', true)
```

### Credit Card Validator

```typescript
import { creditCardValidator } from '@core/managers/validation-manager/validation-schema/validators'

// Credit card validation
const creditCardValidation = creditCardValidator('cardNumber', true)
```

### Postal Code Validator

```typescript
import {
    postalCodeValidator,
    PostalCodeRegion
} from '@core/managers/validation-manager/validation-schema/validators'

// US postal code validation (default)
const usPostalValidation = postalCodeValidator('zipCode', 'US', true)

// Canadian postal code validation
const canadianPostalValidation = postalCodeValidator('postalCode', 'CA', true)

// UK postal code validation
const ukPostalValidation = postalCodeValidator('postcode', 'UK', true)
```

### SSN Validator

```typescript
import { ssnValidator } from '@core/managers/validation-manager/validation-schema/validators'

// Social Security Number validation
const ssnValidation = ssnValidator('ssn', true)
```

### Currency Validator

```typescript
import { currencyValidator } from '@core/managers/validation-manager/validation-schema/validators'

// Currency validation
const currencyValidation = currencyValidator('amount', true)
```

### Age Validator

```typescript
import { ageValidator } from '@core/managers/validation-manager/validation-schema/validators'

// Age validation (1-120 years)
const ageValidation = ageValidator('age', true)
```

### Username Validator

```typescript
import { usernameValidator } from '@core/managers/validation-manager/validation-schema/validators'

// Username validation (3-20 chars, letters, numbers, underscore, hyphen)
const usernameValidation = usernameValidator('username', true)
```

### Time Validator

```typescript
import { timeValidator } from '@core/managers/validation-manager/validation-schema/validators'

// Time validation (HH:MM or HH:MM:SS format)
const timeValidation = timeValidator('time', true)
```

### Numeric Validator

```typescript
import { numericValidator } from '@core/managers/validation-manager/validation-schema/validators'

// Basic numeric validation
const numberValidation = numericValidator('quantity', true)

// Numeric validation with min/max values
const rangeValidation = numericValidator('score', true, 0, 100)
```

### Date Validator

```typescript
import { dateValidator } from '@core/managers/validation-manager/validation-schema/validators'

// Basic date validation
const dateValidation = dateValidator('birthDate', true)

// Date validation with min/max dates
const restrictedDateValidation = dateValidator(
    'eventDate',
    true,
    new Date('2024-01-01'),
    new Date('2025-12-31')
)
```

## Using with Form Fields

```typescript
import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'
import {
    phoneValidator,
    emailBuilder
} from '@core/managers/validation-manager/validation-schema/validators'

// Example form field with phone validation
const phoneField = new FieldSchemaBuilder()
    .setTypeInput('tel')
    .setValidationData(true, phoneValidator('phone', true).build())
    .build()

// Example form field with email validation
const emailField = new FieldSchemaBuilder()
    .setTypeInput('email')
    .setValidationData(true, emailBuilder('email', true).build())
    .build()
```

## Validation Error Keys

All validators use localization keys from `ValidationLocalizeKeys`. Make sure to provide translations for:

- Phone: `phoneError`, `phoneGuide`, `phonePatternError`, `phonePatternGuide`
- Names: `firstNameError`, `firstNameGuide`, `lastNameError`, `lastNameGuide`, `fullNameError`, `fullNameGuide`
- Passwords: `passwordStrongError`, `passwordStrongGuide`, `passwordMediumError`, `passwordMediumGuide`
- URLs: `urlPatternError`, `urlPatternGuide`
- Credit Cards: `creditCardError`, `creditCardGuide`
- Postal Codes: `postalCodeError`, `postalCodeGuide`
- SSN: `ssnError`, `ssnGuide`
- Currency: `currencyError`, `currencyGuide`
- Age: `ageError`, `ageGuide`
- Username: `usernameError`, `usernameGuide`

## Regex Patterns

All regex patterns are centralized in `validation.regex.patterns.ts` and can be imported for custom validators:

```typescript
import {
    phonePattern,
    firstNamePattern,
    passwordStrongPattern
} from '@core/managers/validation-manager/validation-schema/validation.regex.patterns'
```

## Country-Specific Validators

The validation system now supports country-specific patterns and multi-country validation.

### Single Country Validators

```typescript
import {
    phoneCountryValidator,
    postalCodeCountryValidator,
    ssnCountryValidator,
    CountryCode
} from '@core/managers/validation-manager/validation-schema/validators'

// Swiss phone number validation
const swissPhone = phoneCountryValidator('phone', 'CH', true)

// German postal code validation
const germanPostal = postalCodeCountryValidator('postalCode', 'DE', true)

// French SSN validation
const frenchSSN = ssnCountryValidator('ssn', 'FR', true)
```

### Switzerland-Specific Validators

```typescript
import {
    phoneSwitzerlandValidator,
    npaValidator,
    ahvValidator
} from '@core/managers/validation-manager/validation-schema/validators'

// Swiss phone number (alias for phoneCountryValidator with 'CH')
const swissPhone = phoneSwitzerlandValidator('phone', true)

// Swiss postal code (NPA - Numéro Postal d'Acheminement)
const npa = npaValidator('postalCode', true)

// Swiss AHV number (Alters- und Hinterlassenenversicherung)
const ahv = ahvValidator('ahv', true)
```

### Multi-Country Validators

```typescript
import {
    phoneMultiCountryValidator,
    postalCodeMultiCountryValidator
} from '@core/managers/validation-manager/validation-schema/validators'

// European phone numbers
const europeanPhone = phoneMultiCountryValidator('phone', ['CH', 'DE', 'AT', 'FR', 'IT'], true)

// DACH region postal codes
const dachPostal = postalCodeMultiCountryValidator('postalCode', ['CH', 'DE', 'AT'], true)
```

### Pattern Management Utilities

```typescript
import {
    PatternManager,
    getCountriesWithSupport,
    getCountryValidationInfo,
    getCountryPatternSummary
} from '@core/managers/validation-manager/validation-schema/validators'

// Get pattern for specific country
const swissPhonePattern = PatternManager.getPattern('phone', 'CH')

// Get available countries for validation type
const phoneCountries = PatternManager.getAvailableCountries('phone')

// Get countries supporting multiple validation types
const allSupported = getCountriesWithSupport(['phone', 'postal', 'ssn'])

// Get detailed country information
const countryInfo = getCountryValidationInfo()

// Get validation summary for a country
const swissSummary = getCountryPatternSummary('CH')
```

### Supported Countries

Currently supported countries with their codes:

- **CH** - Switzerland (Phone, NPA/Postal, AHV/SSN)
- **US** - United States (Phone, Postal, SSN)
- **CA** - Canada (Phone, Postal, SIN)
- **UK** - United Kingdom (Phone, Postal, NIN)
- **DE** - Germany (Phone, Postal, ID)
- **FR** - France (Phone, Postal, INSEE)
- **IT** - Italy (Phone, Postal, Codice Fiscale)
- **ES** - Spain (Phone, Postal, DNI)
- **AT** - Austria (Phone, Postal, SSN)
- **NL** - Netherlands (Phone, Postal, BSN)
- **BE** - Belgium (Phone, Postal, National Number)
- **LU** - Luxembourg (Phone, Postal, ID)

### Country-Specific Examples

#### Switzerland (CH)

```typescript
// Phone: +41 44 123 45 67 or 044 123 45 67
const swissPhone = phoneSwitzerlandValidator('phone')

// NPA: 8001 (Zurich), 1211 (Geneva), 3000 (Bern)
const npa = npaValidator('postalCode')

// AHV: 756.1234.5678.90
const ahv = ahvValidator('socialSecurity')
```

#### Germany (DE)

```typescript
// Phone: +49 30 12345678
const germanPhone = phoneCountryValidator('phone', 'DE')

// Postal: 10115
const germanPostal = postalCodeCountryValidator('postalCode', 'DE')
```

#### United Kingdom (UK)

```typescript
// Phone: +44 20 7946 0958
const ukPhone = phoneCountryValidator('phone', 'UK')

// Postal: SW1A 1AA
const ukPostal = postalCodeCountryValidator('postalCode', 'UK')
```

### Usage Patterns

#### Dynamic Country-Based Validation

```typescript
function createValidationForCountry(country: CountryCode) {
    return {
        phone: phoneCountryValidator('phone', country),
        postal: postalCodeCountryValidator('postalCode', country),
        ssn: ssnCountryValidator('ssn', country)
    }
}
```

#### Regional Validation Groups

```typescript
const dachCountries: CountryCode[] = ['CH', 'DE', 'AT']
const europeanCountries: CountryCode[] = ['CH', 'DE', 'AT', 'FR', 'IT', 'ES']

const dachValidation = {
    phone: phoneMultiCountryValidator('phone', dachCountries),
    postal: postalCodeMultiCountryValidator('postal', dachCountries)
}
```

For comprehensive examples and advanced usage patterns, see `country-validator-demo.ts`.
