import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { passwordMediumPattern } from '../validation.regex.patterns'

export const passwordMediumValidator = (name: string, required: boolean = true) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.passwordError)
                .setGuideMessage(ValidationLocalizeKeys.passwordGuide)
        )
    }

    // Medium password pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(passwordMediumPattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.passwordMediumError)
            .setGuideMessage(ValidationLocalizeKeys.passwordMediumGuide)
    )

    // Min length for password
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(6)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.passwordError)
            .setGuideMessage(ValidationLocalizeKeys.passwordGuide)
    )

    // Max length for password
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(128)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.passwordError)
            .setGuideMessage(ValidationLocalizeKeys.passwordGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
