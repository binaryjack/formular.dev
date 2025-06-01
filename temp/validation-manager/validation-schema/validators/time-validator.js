"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const timeValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.timeError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.timeGuide));
    }
    // Time pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.timePattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.timeError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.timeGuide));
    // Length validation for time format (HH:MM or HH:MM:SS)
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(5)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.timeError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.timeGuide));
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(8)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.timeError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.timeGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.timeValidator = timeValidator;
