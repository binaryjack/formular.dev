import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'

export const eMailBuilder = (name: string, required: boolean = true) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.emailError)
                .setGuideMessage(ValidationLocalizeKeys.emailGuide)
        )
    }

    // Email pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.emailError)
            .setGuideMessage(ValidationLocalizeKeys.emailGuide)
    )

    // Max length for email
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(150)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.emailError)
            .setGuideMessage(ValidationLocalizeKeys.emailGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
