"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const phoneValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneGuide));
    }
    // Phone pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.phonePattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.phonePatternError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.phonePatternGuide));
    // Min length for phone
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(7)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneGuide));
    // Max length for phone
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(20)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.phoneGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.phoneValidator = phoneValidator;
