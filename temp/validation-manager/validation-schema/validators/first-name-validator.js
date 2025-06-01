"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstNameValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const firstNameValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.firstNameError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.firstNameGuide));
    }
    // First name pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.firstNamePattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.firstNameError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.firstNameGuide));
    // Min length for first name
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(2)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.firstNameError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.firstNameGuide));
    // Max length for first name
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(50)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.firstNameError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.firstNameGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.firstNameValidator = firstNameValidator;
