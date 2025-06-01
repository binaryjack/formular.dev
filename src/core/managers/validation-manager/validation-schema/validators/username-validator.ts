import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { usernamePattern } from '../validation.regex.patterns'

export const usernameValidator = (name: string, required: boolean = true) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.usernameError)
                .setGuideMessage(ValidationLocalizeKeys.usernameGuide)
        )
    }

    // Username pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(usernamePattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.usernameError)
            .setGuideMessage(ValidationLocalizeKeys.usernameGuide)
    )

    // Min length for username
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(3)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.usernameError)
            .setGuideMessage(ValidationLocalizeKeys.usernameGuide)
    )

    // Max length for username
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(20)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.usernameError)
            .setGuideMessage(ValidationLocalizeKeys.usernameGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
