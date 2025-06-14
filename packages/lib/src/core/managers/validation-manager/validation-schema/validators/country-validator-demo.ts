/**
 * Comprehensive demo of country-specific validators
 *
 * This file demonstrates how to use the enhanced validation system
 * with country-specific patterns and multi-country support.
 */

import {
    ahvValidator,
    CountryCode,
    getCountriesWithSupport,
    getCountryPatternSummary,
    getCountryValidationInfo,
    npaValidator,
    // Country utilities
    PatternManager,
    // Country-specific validators
    phoneCountryValidator,
    phoneMultiCountryValidator,
    phoneSwitzerlandValidator,
    // Basic validators
    phoneValidator,
    postalCodeCountryValidator,
    postalCodeMultiCountryValidator,
    postalCodeValidator,
    ssnCountryValidator,
    ssnValidator
} from './index'

// ===========================================
// BASIC COUNTRY-SPECIFIC VALIDATION EXAMPLES
// ===========================================

console.log('=== Basic Country-Specific Validators ===')

// Switzerland phone number validation
const swissPhoneValidator = phoneSwitzerlandValidator('swissPhone')
console.log('Swiss phone validator created for numbers like: +41 44 123 45 67')

// Switzerland postal code (NPA) validation
const npaValidatorInstance = npaValidator('npa')
console.log('Swiss NPA validator created for 4-digit postal codes like: 8001')

// Switzerland AHV number validation
const ahvValidatorInstance = ahvValidator('ahv')
console.log('Swiss AHV validator created for numbers like: 756.1234.5678.90')

// ===========================================
// ADVANCED COUNTRY-SPECIFIC EXAMPLES
// ===========================================

console.log('\n=== Advanced Country-Specific Examples ===')

// Validate phone numbers for specific countries
const germanPhoneValidator = phoneCountryValidator('germanPhone', 'DE')
const frenchPhoneValidator = phoneCountryValidator('frenchPhone', 'FR')
console.log('German phone validator: supports +49 format')
console.log('French phone validator: supports +33 format')

// Validate postal codes for specific countries
const germanPostalValidator = postalCodeCountryValidator('germanPostal', 'DE')
const ukPostalValidator = postalCodeCountryValidator('ukPostal', 'UK')
console.log('German postal validator: 5-digit format (e.g., 10115)')
console.log('UK postal validator: alphanumeric format (e.g., SW1A 1AA)')

// ===========================================
// MULTI-COUNTRY VALIDATION EXAMPLES
// ===========================================

console.log('\n=== Multi-Country Validation Examples ===')

// European phone numbers (DACH region + neighbors)
const europeanPhoneValidator = phoneMultiCountryValidator('europeanPhone', [
    'CH',
    'DE',
    'AT',
    'FR',
    'IT'
])
console.log('European phone validator: supports CH, DE, AT, FR, IT formats')

// DACH postal codes
const dachPostalValidator = postalCodeMultiCountryValidator('dachPostal', ['CH', 'DE', 'AT'])
console.log('DACH postal validator: supports Swiss, German, Austrian formats')

// Multi-country SSN validation
const europeanSsnValidator = ssnCountryValidator('europeanSsn', 'CH')
console.log('Swiss SSN validator: AHV format')

// ===========================================
// PATTERN MANAGEMENT UTILITIES
// ===========================================

console.log('\n=== Pattern Management Utilities ===')

// Get available countries for each validation type
const phoneCountries = PatternManager.getAvailableCountries('phone')
const postalCountries = PatternManager.getAvailableCountries('postal')
const ssnCountries = PatternManager.getAvailableCountries('ssn')

console.log('Available countries for phone validation:', phoneCountries)
console.log('Available countries for postal validation:', postalCountries)
console.log('Available countries for SSN validation:', ssnCountries)

// Get countries that support all validation types
const allSupportedCountries = getCountriesWithSupport(['phone', 'postal', 'ssn'])
console.log('Countries supporting all validation types:', allSupportedCountries)

// Get detailed country validation information
const countryInfo = getCountryValidationInfo()
console.log('Detailed country validation info:', countryInfo.slice(0, 3)) // Show first 3

// ===========================================
// SWITZERLAND-SPECIFIC EXAMPLES
// ===========================================

console.log('\n=== Switzerland-Specific Examples ===')

// Get Switzerland pattern summary
const swissPatterns = getCountryPatternSummary('CH')
console.log('Swiss validation patterns:', swissPatterns)

// Swiss phone examples
console.log('Swiss phone examples:')
console.log('- Valid: +41 44 123 45 67')
console.log('- Valid: 044 123 45 67')
console.log('- Valid: 0791234567')

// Swiss NPA examples
console.log('Swiss NPA (postal code) examples:')
console.log('- Valid: 8001 (Zurich)')
console.log('- Valid: 1211 (Geneva)')
console.log('- Valid: 3000 (Bern)')

// Swiss AHV examples
console.log('Swiss AHV number examples:')
console.log('- Valid: 756.1234.5678.90')
console.log('- Valid: 756.9876.5432.10')

// ===========================================
// USAGE PATTERNS AND BEST PRACTICES
// ===========================================

console.log('\n=== Usage Patterns and Best Practices ===')

// Pattern 1: Single country validation
function createSwissFormValidation() {
    return {
        phone: phoneSwitzerlandValidator('phone'),
        postalCode: npaValidator('postalCode'),
        ssn: ahvValidator('ahv')
    }
}

// Pattern 2: Multi-country European form
function createEuropeanFormValidation() {
    const europeanCountries: CountryCode[] = ['CH', 'DE', 'AT', 'FR', 'IT', 'ES']
    return {
        phone: phoneMultiCountryValidator('phone', europeanCountries),
        postalCode: postalCodeMultiCountryValidator('postalCode', europeanCountries),
        // Note: SSN patterns vary significantly, so country-specific validation recommended
        country: phoneCountryValidator('selectedCountry', 'CH') // Default to Switzerland
    }
}

// Pattern 3: Dynamic country-based validation
function createDynamicCountryValidation(selectedCountry: CountryCode) {
    return {
        phone: phoneCountryValidator('phone', selectedCountry),
        postalCode: postalCodeCountryValidator('postalCode', selectedCountry),
        ssn: ssnCountryValidator('ssn', selectedCountry)
    }
}

// Pattern 4: Regional validation groups
const regionalValidationGroups = {
    dach: ['CH', 'DE', 'AT'] as CountryCode[],
    benelux: ['BE', 'NL', 'LU'] as CountryCode[],
    mediterranean: ['IT', 'ES', 'FR'] as CountryCode[],
    anglophone: ['US', 'CA', 'UK'] as CountryCode[]
}

function createRegionalValidation(region: keyof typeof regionalValidationGroups) {
    const countries = regionalValidationGroups[region]
    return {
        phone: phoneMultiCountryValidator('phone', countries),
        postalCode: postalCodeMultiCountryValidator('postalCode', countries)
    }
}

// ===========================================
// ERROR HANDLING AND FALLBACKS
// ===========================================

console.log('\n=== Error Handling and Fallbacks ===')

// Safe pattern retrieval with fallback
function getSafePattern(type: 'phone' | 'postal' | 'ssn', countryCode: CountryCode) {
    try {
        const pattern = PatternManager.getPattern(type, countryCode)
        if (!pattern) {
            console.warn(`No ${type} pattern found for ${countryCode}, using default`)
            // Return appropriate default pattern
            switch (type) {
                case 'phone':
                    return phoneValidator('fallback')
                case 'postal':
                    return postalCodeValidator('fallback')
                case 'ssn':
                    return ssnValidator('fallback')
            }
        }
        return pattern
    } catch (error) {
        console.error(`Error getting ${type} pattern for ${countryCode}:`, error)
        // Return basic validator as fallback
        return phoneValidator('errorFallback')
    }
}

// ===========================================
// INTEGRATION EXAMPLES
// ===========================================

console.log('\n=== Integration Examples ===')

// Example: Form with country selector
interface CountryFormData {
    selectedCountry: CountryCode
    phone: string
    postalCode: string
    ssn: string
}

function validateCountryForm(data: CountryFormData) {
    const validators = {
        phone: phoneCountryValidator('phone', data.selectedCountry),
        postalCode: postalCodeCountryValidator('postalCode', data.selectedCountry),
        ssn: ssnCountryValidator('ssn', data.selectedCountry)
    }

    // Validation logic would go here
    console.log(`Validating form for ${data.selectedCountry}`)
    return validators
}

// Example: Swiss-specific business form
interface SwissBusinessForm {
    companyPhone: string
    headquartersNPA: string
    employeeAHV: string
}

function validateSwissBusinessForm(data: SwissBusinessForm) {
    return {
        companyPhone: phoneSwitzerlandValidator('companyPhone'),
        headquartersNPA: npaValidator('headquartersNPA'),
        employeeAHV: ahvValidator('employeeAHV')
    }
}

console.log('Country-specific validator demo completed!')
console.log('Key features demonstrated:')
console.log('✓ Single country validation (Switzerland focus)')
console.log('✓ Multi-country validation')
console.log('✓ Pattern management utilities')
console.log('✓ Error handling and fallbacks')
console.log('✓ Integration patterns')
console.log('✓ Regional validation groups')

export {
    createDynamicCountryValidation,
    createEuropeanFormValidation,
    createRegionalValidation,
    createSwissFormValidation,
    getSafePattern,
    regionalValidationGroups,
    validateCountryForm,
    validateSwissBusinessForm
}
