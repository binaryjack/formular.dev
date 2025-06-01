import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { fullNamePattern } from '../validation.regex.patterns'

export const fullNameValidator = (name: string, required: boolean = true) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.fullNameError)
                .setGuideMessage(ValidationLocalizeKeys.fullNameGuide)
        )
    }

    // Full name pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(fullNamePattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.fullNameError)
            .setGuideMessage(ValidationLocalizeKeys.fullNameGuide)
    )

    // Min length for full name
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(3)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.fullNameError)
            .setGuideMessage(ValidationLocalizeKeys.fullNameGuide)
    )

    // Max length for full name
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(100)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.fullNameError)
            .setGuideMessage(ValidationLocalizeKeys.fullNameGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
