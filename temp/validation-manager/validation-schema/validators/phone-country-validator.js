"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneSwitzerlandValidator = exports.phoneMultiCountryValidator = exports.phoneCountryValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
/**
 * Country-specific phone validator
 */
const phoneCountryValidator = (name, countryCode, required = true) => {
    const constraints = [];
    const countryName = validation_regex_patterns_1.PatternManager.getCountryName(countryCode);
    const phonePrefix = validation_regex_patterns_1.PatternManager.getPhonePrefix(countryCode);
    const pattern = validation_regex_patterns_1.PatternManager.getPattern('phone', countryCode) || validation_regex_patterns_1.phonePattern;
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneCountryError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneCountryGuide));
    }
    // Country-specific phone pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(pattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneCountryError)
        .setGuideMessage(`Enter a valid ${countryName} phone number (e.g., ${phonePrefix} format)`));
    // Min length based on country
    const minLength = getMinPhoneLength(countryCode);
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(minLength)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneCountryError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneCountryGuide));
    // Max length based on country
    const maxLength = getMaxPhoneLength(countryCode);
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(maxLength)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneCountryError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneCountryGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.phoneCountryValidator = phoneCountryValidator;
/**
 * Multi-country phone validator - validates against multiple country patterns
 */
const phoneMultiCountryValidator = (name, countryCodes, required = true) => {
    const constraints = [];
    const countryNames = countryCodes.map((code) => validation_regex_patterns_1.PatternManager.getCountryName(code)).join(', ');
    const multiPattern = validation_regex_patterns_1.PatternManager.createMultiCountryPattern('phone', countryCodes) || validation_regex_patterns_1.phonePattern;
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneMultiCountryError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneMultiCountryGuide));
    }
    // Multi-country phone pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(multiPattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneMultiCountryError)
        .setGuideMessage(`Enter a valid phone number for: ${countryNames}`));
    // Use flexible length constraints for multi-country
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(7)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneMultiCountryError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneMultiCountryGuide));
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(25)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneMultiCountryError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneMultiCountryGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.phoneMultiCountryValidator = phoneMultiCountryValidator;
/**
 * Switzerland-specific phone validator
 */
const phoneSwitzerlandValidator = (name, required = true) => {
    return (0, exports.phoneCountryValidator)(name, 'CH', required);
};
exports.phoneSwitzerlandValidator = phoneSwitzerlandValidator;
// Helper functions for country-specific length constraints
function getMinPhoneLength(countryCode) {
    const lengthMap = {
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
    };
    return lengthMap[countryCode] || 7;
}
function getMaxPhoneLength(countryCode) {
    const lengthMap = {
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
    };
    return lengthMap[countryCode] || 20;
}
