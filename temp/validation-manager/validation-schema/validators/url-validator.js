"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlValidator = void 0;
const validation_constraint_builder_1 = require("../../constraint-builder/validation-constraint-builder");
const generic_validation_builder_1 = require("../../generic-validation-builder/generic-validation-builder");
const validation_localize_keys_1 = require("../validation.localize.keys");
const validation_regex_patterns_1 = require("../validation.regex.patterns");
const urlValidator = (name, required = true) => {
    const constraints = [];
    if (required) {
        constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.urlError)
            .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.urlGuide));
    }
    // URL pattern validation
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('pattern')
        .setConstraint(validation_regex_patterns_1.urlPattern)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.urlPatternError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.urlPatternGuide));
    // Max length for URL
    constraints.push(new validation_constraint_builder_1.ValidationConstraintBuilder('maxLength')
        .setConstraint(2048)
        .setName(name)
        .setErrorMessage(validation_localize_keys_1.ValidationLocalizeKeys.urlError)
        .setGuideMessage(validation_localize_keys_1.ValidationLocalizeKeys.urlGuide));
    return new generic_validation_builder_1.GenericValidationBuilder().setConstraints(constraints);
};
exports.urlValidator = urlValidator;
