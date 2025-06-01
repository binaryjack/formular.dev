"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordStrongValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const passwordStrongValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.passwordError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.passwordGuide));
    }
    // Strong password pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.passwordStrongPattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.passwordStrongError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.passwordStrongGuide));
    // Min length for password
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(8)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.passwordError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.passwordGuide));
    // Max length for password
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(128)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.passwordError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.passwordGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.passwordStrongValidator = passwordStrongValidator;
