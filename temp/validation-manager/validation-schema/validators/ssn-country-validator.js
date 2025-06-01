"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssnSwitzerlandValidator = exports.ahvValidator = exports.ssnMultiCountryValidator = exports.ssnCountryValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
/**
 * Country-specific SSN/ID validator
 */
const ssnCountryValidator = (name, countryCode, required = true) => {
    const constraints = [];
    const countryName = validation_regex_patterns_1.PatternManager.getCountryName(countryCode);
    const pattern = validation_regex_patterns_1.PatternManager.getPattern('ssn', countryCode) || validation_regex_patterns_1.ssnPattern;
    const idTypeName = getIdTypeName(countryCode);
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnCountryError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnCountryGuide));
    }
    // Country-specific SSN/ID pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(pattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnCountryError)
        .setGuideMessage(`Enter a valid ${countryName} ${idTypeName} ${getIdExample(countryCode)}`));
    // Length constraints based on country
    const { minLength, maxLength } = getIdLength(countryCode);
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(minLength)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnCountryError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnCountryGuide));
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(maxLength)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnCountryError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnCountryGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.ssnCountryValidator = ssnCountryValidator;
/**
 * Multi-country SSN/ID validator
 */
const ssnMultiCountryValidator = (name, countryCodes, required = true) => {
    const constraints = [];
    const countryNames = countryCodes.map(code => validation_regex_patterns_1.PatternManager.getCountryName(code)).join(', ');
    const multiPattern = validation_regex_patterns_1.PatternManager.createMultiCountryPattern('ssn', countryCodes) || validation_regex_patterns_1.ssnPattern;
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnMultiCountryError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnMultiCountryGuide));
    }
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(multiPattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnMultiCountryError)
        .setGuideMessage(`Enter a valid ID number for: ${countryNames}`));
    // Use flexible length constraints for multi-country
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(8)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnMultiCountryError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnMultiCountryGuide));
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(25)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnMultiCountryError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnMultiCountryGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.ssnMultiCountryValidator = ssnMultiCountryValidator;
/**
 * Switzerland-specific AHV number validator
 */
const ahvValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnSwitzerlandError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnSwitzerlandGuide));
    }
    // Swiss AHV number pattern
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(/^756\.\d{4}\.\d{4}\.\d{2}$/)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnSwitzerlandError)
        .setGuideMessage('Enter a valid Swiss AHV number (e.g., 756.1234.5678.90)'));
    // AHV number length
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(16)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnSwitzerlandError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnSwitzerlandGuide));
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(16)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnSwitzerlandError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnSwitzerlandGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.ahvValidator = ahvValidator;
/**
 * Switzerland-specific SSN validator (alias for AHV)
 */
const ssnSwitzerlandValidator = (name, required = true) => {
    return (0, exports.ssnCountryValidator)(name, 'CH', required);
};
exports.ssnSwitzerlandValidator = ssnSwitzerlandValidator;
// Helper functions
function getIdTypeName(countryCode) {
    const typeNames = {
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
    };
    return typeNames[countryCode] || 'ID Number';
}
function getIdLength(countryCode) {
    const lengthMap = {
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
    };
    return lengthMap[countryCode] || { minLength: 8, maxLength: 20 };
}
function getIdExample(countryCode) {
    const examples = {
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
    };
    return examples[countryCode] || '';
}
