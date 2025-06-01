"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numericValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const numericValidator = (name, required = true, minValue, maxValue) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.numberError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.numberGuide));
    }
    // Numeric pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.numericOnly)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.numberError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.numberGuide));
    // Min value validation
    if (minValue !== undefined) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('min')
            .setConstraint(minValue)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.minError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.minGuide));
    }
    // Max value validation
    if (maxValue !== undefined) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('max')
            .setConstraint(maxValue)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.maxError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.maxGuide));
    }
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.numericValidator = numericValidator;
