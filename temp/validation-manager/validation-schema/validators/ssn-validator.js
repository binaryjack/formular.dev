"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssnValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const ssnValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnGuide));
    }
    // SSN pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.ssnPattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnGuide));
    // Length validation for SSN
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('minLength')
        .setConstraint(9)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnGuide));
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(11)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.ssnGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.ssnValidator = ssnValidator;
