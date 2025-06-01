"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ageValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const ageValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ageError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ageGuide));
    }
    // Age pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.agePattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ageError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ageGuide));
    // Min value for age
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('min')
        .setConstraint(1)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ageError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ageGuide));
    // Max value for age
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('max')
        .setConstraint(120)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ageError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ageGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.ageValidator = ageValidator;
