"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postalCodeValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const postalCodeValidator = (name, region = 'US', required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeGuide));
    }
    // Select pattern based on region
    let pattern;
    switch (region) {
        case 'CA':
            pattern = validation_regex_patterns_1.postalCodeCanadaPattern;
            break;
        case 'UK':
            pattern = validation_regex_patterns_1.postalCodeUKPattern;
            break;
        default:
            pattern = validation_regex_patterns_1.postalCodeUSPattern;
            break;
    }
    // Postal code pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(pattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.postalCodeGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.postalCodeValidator = postalCodeValidator;
