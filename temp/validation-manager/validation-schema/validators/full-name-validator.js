"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullNameValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const fullNameValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.fullNameError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.fullNameGuide));
    }
    // Full name pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.fullNamePattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.fullNameError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.fullNameGuide));
    // Min length for full name
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(3)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.fullNameError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.fullNameGuide));
    // Max length for full name
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(100)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.fullNameError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.fullNameGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.fullNameValidator = fullNameValidator;
