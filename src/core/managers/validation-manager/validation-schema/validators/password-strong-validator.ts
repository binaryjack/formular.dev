import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { passwordStrongPattern } from '../validation.regex.patterns'

export const passwordStrongValidator = (name: string, required: boolean = true) => {
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

    // Strong password pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(passwordStrongPattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.passwordStrongError)
            .setGuideMessage(ValidationLocalizeKeys.passwordStrongGuide)
    )

    // Min length for password
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(8)
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
