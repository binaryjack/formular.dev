"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditCardValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const creditCardValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.creditCardError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.creditCardGuide));
    }
    // Credit card pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.creditCardPattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.creditCardError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.creditCardGuide));
    // Min length for credit card
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(13)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.creditCardError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.creditCardGuide));
    // Max length for credit card
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(19)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.creditCardError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.creditCardGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.creditCardValidator = creditCardValidator;
