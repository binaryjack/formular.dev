"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernameValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const usernameValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.usernameError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.usernameGuide));
    }
    // Username pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.usernamePattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.usernameError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.usernameGuide));
    // Min length for username
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(3)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.usernameError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.usernameGuide));
    // Max length for username
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(20)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.usernameError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.usernameGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.usernameValidator = usernameValidator;
