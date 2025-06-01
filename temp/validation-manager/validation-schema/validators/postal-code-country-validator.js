"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.npaValidator = exports.postalCodeSwitzerlandValidator = exports.postalCodeMultiCountryValidator = exports.postalCodeCountryValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
/**
 * Country-specific postal code validator
 */
const postalCodeCountryValidator = (name, countryCode, required = true) => {
    const constraints = [];
    const countryName = validation_regex_patterns_1.PatternManager.getCountryName(countryCode);
    const pattern = validation_regex_patterns_1.PatternManager.getPattern('postal', countryCode) || validation_regex_patterns_1.postalCodeUSPattern;
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeCountryError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeCountryGuide));
    }
    // Country-specific postal code pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(pattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeCountryError)
        .setGuideMessage(`Enter a valid ${countryName} postal code ${getPostalCodeExample(countryCode)}`));
    // Length constraints based on country
    const { minLength, maxLength } = getPostalCodeLength(countryCode);
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(minLength)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeCountryError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeCountryGuide));
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(maxLength)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeCountryError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeCountryGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.postalCodeCountryValidator = postalCodeCountryValidator;
/**
 * Multi-country postal code validator
 */
const postalCodeMultiCountryValidator = (name, countryCodes, required = true) => {
    const constraints = [];
    const countryNames = countryCodes.map(code => validation_regex_patterns_1.PatternManager.getCountryName(code)).join(', ');
    const multiPattern = validation_regex_patterns_1.PatternManager.createMultiCountryPattern('postal', countryCodes) || validation_regex_patterns_1.postalCodeUSPattern;
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeMultiCountryError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeMultiCountryGuide));
    }
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(multiPattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeMultiCountryError)
        .setGuideMessage(`Enter a valid postal code for: ${countryNames}`));
    // Use flexible length constraints for multi-country
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(3)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeMultiCountryError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeMultiCountryGuide));
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(10)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeMultiCountryError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeMultiCountryGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.postalCodeMultiCountryValidator = postalCodeMultiCountryValidator;
/**
 * Switzerland-specific postal code validator (NPA - Numéro Postal d'Acheminement)
 */
const postalCodeSwitzerlandValidator = (name, required = true) => {
    return (0, exports.postalCodeCountryValidator)(name, 'CH', required);
};
exports.postalCodeSwitzerlandValidator = postalCodeSwitzerlandValidator;
/**
 * Switzerland NPA (postal code) validator with enhanced validation
 */
const npaValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeSwitzerlandError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeSwitzerlandGuide));
    }
    // Swiss postal code pattern (4 digits)
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(/^\d{4}$/)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeSwitzerlandError)
        .setGuideMessage('Enter a valid Swiss NPA (4-digit postal code, e.g., 8001 for Zurich)'));
    // Exact length for Swiss postal codes
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(4)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeSwitzerlandError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeSwitzerlandGuide));
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(4)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeSwitzerlandError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeSwitzerlandGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.npaValidator = npaValidator;
// Helper functions
function getPostalCodeLength(countryCode) {
    const lengthMap = {
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
    };
    return lengthMap[countryCode] || { minLength: 3, maxLength: 10 };
}
function getPostalCodeExample(countryCode) {
    const examples = {
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
    };
    return examples[countryCode] || '';
}
