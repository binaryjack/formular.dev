"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switzerlandIncludedValidator = exports.multiCountryValidator = exports.countryCodeValidator = void 0;
exports.getCountriesWithSupport = getCountriesWithSupport;
exports.getCountryValidationInfo = getCountryValidationInfo;
exports.getCountryPatternSummary = getCountryPatternSummary;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
/**
 * Country code validator - validates against supported country codes
 */
const countryCodeValidator = (name, supportedTypes = ['phone', 'postal', 'ssn'], required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.requiredError)
            .setGuideMessage('Please select a country'));
    }
    // Get available countries that support all requested types
    const availableCountries = getCountriesWithSupport(supportedTypes);
    const countryPattern = new RegExp(`^(${availableCountries.join('|')})$`);
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(countryPattern)
        .setName(name)
        .setErrorMessage('Invalid country selection')
        .setGuideMessage(`Select from: ${availableCountries.map(c => validation_regex_patterns_1.PatternManager.getCountryName(c)).join(', ')}`));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.countryCodeValidator = countryCodeValidator;
/**
 * Multi-country selector validator
 */
const multiCountryValidator = (name, supportedTypes = ['phone', 'postal', 'ssn'], required = true, minCountries = 1, maxCountries = 5) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.requiredError)
            .setGuideMessage('Please select at least one country'));
    }
    // Min countries constraint
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('min')
        .setConstraint(minCountries)
        .setName(name)
        .setErrorMessage(`Select at least ${minCountries} ${minCountries === 1 ? 'country' : 'countries'}`)
        .setGuideMessage(`Minimum ${minCountries} ${minCountries === 1 ? 'country' : 'countries'} required`));
    // Max countries constraint
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('max')
        .setConstraint(maxCountries)
        .setName(name)
        .setErrorMessage(`Select at most ${maxCountries} countries`)
        .setGuideMessage(`Maximum ${maxCountries} countries allowed`));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.multiCountryValidator = multiCountryValidator;
/**
 * Switzerland validator - ensures Switzerland is included in country selection
 */
const switzerlandIncludedValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.requiredError)
            .setGuideMessage('Country selection is required'));
    }
    // Custom validation to ensure Switzerland is included
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('custom')
        .setConstraint((value) => {
        if (typeof value === 'string') {
            return value === 'CH';
        }
        return Array.isArray(value) && value.includes('CH');
    })
        .setName(name)
        .setErrorMessage('Switzerland must be included in the selection')
        .setGuideMessage('Please include Switzerland (CH) in your country selection'));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.switzerlandIncludedValidator = switzerlandIncludedValidator;
// Utility functions for country support
/**
 * Get countries that support specific validation types
 */
function getCountriesWithSupport(types) {
    const allCountries = Object.keys(validation_regex_patterns_1.countryMetadata);
    return allCountries.filter(country => {
        return types.every(type => {
            const availableCountries = validation_regex_patterns_1.PatternManager.getAvailableCountries(type);
            return availableCountries.includes(country);
        });
    });
}
/**
 * Get country metadata with validation support information
 */
function getCountryValidationInfo() {
    return Object.keys(validation_regex_patterns_1.countryMetadata).map(code => {
        const countryCode = code;
        return {
            code: countryCode,
            name: validation_regex_patterns_1.PatternManager.getCountryName(countryCode),
            phonePrefix: validation_regex_patterns_1.PatternManager.getPhonePrefix(countryCode),
            supports: {
                phone: validation_regex_patterns_1.PatternManager.getAvailableCountries('phone').includes(countryCode),
                postal: validation_regex_patterns_1.PatternManager.getAvailableCountries('postal').includes(countryCode),
                ssn: validation_regex_patterns_1.PatternManager.getAvailableCountries('ssn').includes(countryCode)
            }
        };
    });
}
/**
 * Get validation pattern summary for a country
 */
function getCountryPatternSummary(countryCode) {
    return {
        country: validation_regex_patterns_1.PatternManager.getCountryName(countryCode),
        patterns: {
            phone: validation_regex_patterns_1.PatternManager.getPattern('phone', countryCode),
            postal: validation_regex_patterns_1.PatternManager.getPattern('postal', countryCode),
            ssn: validation_regex_patterns_1.PatternManager.getPattern('ssn', countryCode)
        },
        examples: getCountryExamples(countryCode)
    };
}
function getCountryExamples(countryCode) {
    const examples = {
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
    };
    return examples[countryCode] || {};
}
