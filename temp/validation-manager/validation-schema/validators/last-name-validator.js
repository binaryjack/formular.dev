"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastNameValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const lastNameValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.lastNameError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.lastNameGuide));
    }
    // Last name pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.lastNamePattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.lastNameError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.lastNameGuide));
    // Min length for last name
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(2)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.lastNameError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.lastNameGuide));
    // Max length for last name
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(50)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.lastNameError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.lastNameGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.lastNameValidator = lastNameValidator;
