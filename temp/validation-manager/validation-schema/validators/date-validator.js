"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const dateValidator = (name, required = true, minDate, maxDate) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.dateError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.dateGuide));
    }
    // Date pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.dateIso8601Pattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.dateError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.dateGuide));
    // Min date validation
    if (minDate) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('min')
            .setConstraint(minDate.getTime())
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.dateError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.dateGuide));
    }
    // Max date validation
    if (maxDate) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('max')
            .setConstraint(maxDate.getTime())
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.dateError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.dateGuide));
    }
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.dateValidator = dateValidator;
